'use server'

import { CartItem } from "@/app/(store)/store";
import { imageUrl } from "@/lib/ImageUrl";
import stripe from "@/lib/stripe";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedCartItem = {
  product: CartItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedCartItem[],
  metadata: Metadata
) {
  try {
    console.log("Incoming metadata:", metadata);
    console.log("Cart items:", items);

    // 🔥 FIX: Always ensure a Stripe customer exists
    let customerId: string;

    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log("Reusing existing Stripe customer:", customerId);
    } else {
      const newCustomer = await stripe.customers.create({
        email: metadata.customerEmail,
        name: metadata.customerName,
        metadata: {
          clerkUserId: metadata.clerkUserId,
        },
      });
      customerId = newCustomer.id;
      console.log("Created new Stripe customer:", customerId);
    }

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}`;

    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
    const cancelUrl = `${baseUrl}/cart`;

   const session = await stripe.checkout.sessions.create({
  customer: customerId,

  // ✅ FIX – always send metadata manually & flat
  metadata: {
    orderNumber: metadata.orderNumber,
    customerName: metadata.customerName,
    customerEmail: metadata.customerEmail,
    clerkUserId: metadata.clerkUserId,
  },

  mode: "payment",
  allow_promotion_codes: true,
  success_url: successUrl,
  cancel_url: cancelUrl,

  line_items: items.map((item) => ({
    price_data: {
      currency: "usd",
      unit_amount: Math.round(item.product.price! * 100),
      product_data: {
        name: item.product.name ?? "Product",
        metadata: { id: item.product._id },
        description: `Product ID: ${item.product._id}`,
        images: item.product.image
          ? [imageUrl(item.product.image).url()]
          : undefined,
      },
    },
    quantity: item.quantity,
  })),
});


    return session.url;
  } catch (error) {
    console.log("Error creating checkout session:", error);
    throw error;
  }
}

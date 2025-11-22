"use server";

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_WRITE_TOKEN!,
  apiVersion: "2023-10-01",
  useCdn: false,
});

export async function submitNewsletter(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");

  if (!name || !email) {
    return { success: false, error: "Missing fields" };
  }

  try {
    await client.create({
      _type: "newsletter",
      name,
      email,
      subscribedAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (err) {
    console.error("Newsletter error:", err);
    return { success: false, error: "Failed to subscribe" };
  }
}

import { defineField, defineType } from "sanity";

export default defineType({
  name: "review",
  title: "Reviews",
  type: "document",
  fields: [
    defineField({
      name: "product",
      type: "reference",
      to: [{ type: "product" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "userName",
      title: "User Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "comment",
      title: "Comment",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "rating",
      title: "Rating (1–5)",
      type: "number",
      validation: (Rule) =>
        Rule.required().min(1).max(5).error("Rating must be between 1–5"),
    }),

    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      userName: "userName",
      rating: "rating",
      productName: "product.name",
    },
    prepare({ userName, rating, productName }) {
      return {
        title: `${"★".repeat(rating || 0)}${"☆".repeat(5 - (rating || 0))}`,
        subtitle: `${userName} — ${productName}`,
      };
    },
  },
});

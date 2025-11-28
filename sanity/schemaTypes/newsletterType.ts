import { defineField, defineType } from "sanity";
import { Mail } from "lucide-react";


export default defineType({
  name: "newsletter",
  title: "Newsletter Subscriptions",
  type: "document",
  icon: Mail,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "subscribedDesc",
      by: [{ field: "subscribedAt", direction: "desc" }],
    },
  ],
});

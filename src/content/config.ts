import { defineCollection, reference, z } from "astro:content";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/config/locales";

const localeEnum = z.enum(SUPPORTED_LOCALES);

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1, "Title is required."),
      description: z.string().optional(),
      publishedAt: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      category: z.string().min(1, "Category is required."),
      hero: image().optional(),
      lang: localeEnum.default(DEFAULT_LOCALE),
      slug: z.string().optional(),
      translatedFrom: reference("blog").optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };

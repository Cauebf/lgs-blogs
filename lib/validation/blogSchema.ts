import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(100, "Title must not exceed 100 characters."),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(300, "Description must not exceed 300 characters."),
  image: z.string().url("Image must be a valid URL."),
  content: z.string().min(1, "Content is required."),
  categoryIds: z
    .array(z.number().int("Category ID must be an integer."))
    .nonempty("At least one category is required."),
});

export type BlogData = z.infer<typeof blogSchema>;

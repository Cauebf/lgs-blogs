"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function getBlogs() {
  return await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export async function createBlog({
  title,
  description,
  image,
  content,
  categoryIds,
}: {
  title: string;
  description: string;
  image: string;
  content: string;
  categoryIds: number[];
}) {
  if (
    !title ||
    !description ||
    !image ||
    !content ||
    categoryIds.length === 0
  ) {
    throw new Error("All fields are required.");
  }

  try {
    await prisma.blog.create({
      data: {
        title,
        description,
        image,
        content,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
        creator_id: 1, // Replace with the actual user ID
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error("Failed to create blog.");
  }
}

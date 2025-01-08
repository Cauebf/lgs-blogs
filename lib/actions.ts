"use server";

import { auth } from "@/auth";
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

export async function getUser(email: string) {
  return await prisma.user.findFirst({ where: { email } });
}

export async function createUser(email: string, name: string, image: string) {
  return await prisma.user.create({
    data: {
      email,
      name,
      image,
    },
  });
}

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

  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to create a blog.");
  }
  const email = session?.user?.email!;
  const user = await getUser(email);

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
        creator_id: user!.id,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Error creating blog:", error);
    throw new Error("Failed to create blog.");
  }
}

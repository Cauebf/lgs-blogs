"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { blogSchema } from "./validation/blogSchema";

export async function getUser(email: string) {
  try {
    return await prisma.user.findFirst({ where: { email } });
  } catch (error) {
    throw new Error("Database Error: Failed to Get User.", { cause: error });
  }
}

export async function createUser(email: string, name: string, image: string) {
  try {
    return await prisma.user.create({
      data: {
        email,
        name,
        image,
      },
    });
  } catch (error) {
    throw new Error("Database Error: Failed to Create User.", { cause: error });
  }
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

export async function createBlog(formData: FormData, content: string) {
  const validation = blogSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image"),
    categoryIds: formData
      .getAll("category")
      .map((categoryId) => parseInt(categoryId as string))
      .filter((id) => !isNaN(id)),
    content,
  });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: "Failed to Create Invoice.",
    };
  }

  const session = await auth();
  if (!session) {
    return {
      errors: {},
      message: "Please sign in to create a blog.",
    };
  }
  const email = session?.user?.email as string;
  const user = await getUser(email);

  const { title, description, image, categoryIds } = validation.data;

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
    return { message: "Blog created successfully!", error: null };
  } catch (error) {
    throw new Error("Failed to create blog.", { cause: error });
  }
}

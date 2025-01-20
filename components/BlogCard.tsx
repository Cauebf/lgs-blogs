import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { Blog } from "@prisma/client";
import { convertDate } from "@/lib/utils";
import prisma from "@/lib/db";

const BlogCard = async ({
  blog: { title, description, image, creator_id, createdAt },
}: {
  blog: Blog;
}) => {
  const date = convertDate(createdAt);
  const creator = await prisma.user.findUnique({ where: { id: creator_id } });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
  <Image
    src={image}
    alt={title}
    width={200}
    height={40}
    className="w-full h-40 object-cover"
  />
  <div className="p-4 flex flex-col justify-between flex-grow">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600 mb-2">{description}</p>
    <div className="flex flex-col mt-auto">
      <p className="text-gray-600 mb-1">posted by {creator?.name}</p>
      <p className="text-gray-600 mb-1">{date}</p>

      <Link href={`/blog/${title}`}>
        <Button className="bg-blue-500 hover:bg-blue-400 mt-2">Read More</Button>
      </Link>
    </div>
  </div>
</div>

  );
};

export default BlogCard;

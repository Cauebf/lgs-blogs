import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { Blog } from "@/types/types";

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={blog.image}
        alt={blog.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
        <p className="text-gray-600 mb-2">{blog.description}</p>
        <p className="text-gray-600 mb-0">posted by {blog.creator}</p>
        <p className="text-gray-600 mb-1">{blog.date}</p>

        <Link href={`/blog/${blog.title}`}>
          <Button className="bg-blue-500 hover:bg-blue-400">Read More</Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;

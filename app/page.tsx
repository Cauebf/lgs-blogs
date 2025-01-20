import BlogCard from "@/components/BlogCard";
import Search from "@/components/Search";
import { getBlogs } from "@/lib/actions";
import { Suspense } from "react";

export const revalidate = 60;

export default async function Home() {
  const blogs = await getBlogs();

  // const blogs = [
  //   {
  //     id: 1,
  //     title: "Blog 1",
  //     description: "Description 1",
  //     image: "https://picsum.photos/200",
  //     content: "Content 1",
  //     createdAt: new Date(),
  //     creator_id: 1,
  //   },
  //   {
  //     id: 2,
  //     title: "Blog 2",
  //     description: "Description 2",
  //     image: "https://picsum.photos/200",
  //     content: "Content 2",
  //     createdAt: new Date(),
  //     creator_id: 1,
  //   },
  //   {
  //     id: 3,
  //     title: "Blog 3",
  //     description: "Description 3",
  //     image: "https://picsum.photos/200",
  //     content: "Content 3",
  //     createdAt: new Date(),
  //     creator_id: 1,
  //   },
  // ]

  // if (blogs.length === 0) {
  //   return (

  //   );
  // }

  // const blogs: string[] = [];

  return (
    <div className="flex flex-col justify-between py-7 px-12 grow">
      <Search />

      <Suspense
        fallback={
          <div className="flex justify-center items-center w-full h-full grow">
            <p className="text-2xl font-semiboldbg-slate-600 text-center -mt-16">
              Loading...
            </p>
          </div>
        }
      >
        {blogs.length === 0 ? (
          <div className="flex justify-center items-center w-full h-full grow">
            <p className="text-2xl font-semiboldbg-slate-600 -mt-16">
              No Blogs Found 🧐
            </p>
          </div>
        ) : (
          <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <li key={blog.id}>
                <BlogCard blog={blog} />
              </li>
            ))}
          </ul>
        )}
      </Suspense>
    </div>
  );
}

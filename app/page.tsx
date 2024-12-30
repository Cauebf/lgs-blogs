import BlogCard from "@/components/BlogCard";
import Header from "@/components/Header";
import Search from "@/components/Search";
import prisma from "@/lib/db";

export default async function Home() {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: 'desc', 
    },
  })
  
  return (
    <>
      <Header />
      <main className="flex flex-col justify-between py-7 px-12">
        <Search />

        <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <li key={blog.id}>
              <BlogCard blog={blog} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

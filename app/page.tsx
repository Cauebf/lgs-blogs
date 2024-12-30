import BlogCard from "@/components/BlogCard";
import Header from "@/components/Header";
import Search from "@/components/Search";

const blogs = [
  {
    title: "Blog 1",
    description: "Description 1",
    image: "https://picsum.photos/200/300",
    date: "3/10/2024",
    creator: "John Doe",
  },
  {
    title: "Blog 2",
    description: "Description 2",
    image: "https://picsum.photos/200/300",
    date: "3/10/2024",
    creator: "John Doe",
  },
  {
    title: "Blog 3",
    description: "Description 3",
    image: "https://picsum.photos/200/300",
    date: "3/10/2024",
    creator: "John Doe",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-between py-7 px-12">
        <Search />

        <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <li key={blog.title}>
              <BlogCard blog={blog} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

import BlogForm from "@/components/BlogForm";
import { getCategories } from "@/lib/actions";

const CreateBlogPage = async () => {
  const categories = await getCategories();

  return (
    <div
      className="flex flex-col items-center justify-center flex-grow p-5"
    >
      <h1 className="text-3xl text-center mb-4">Create a New Blog</h1>
      <BlogForm categories={categories} />
    </div>
  );
};

export default CreateBlogPage;

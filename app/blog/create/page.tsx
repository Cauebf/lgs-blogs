import BlogForm from "@/components/BlogForm";
import { getCategories } from "@/lib/actions";

const CreateBlogPage = async () => {
  const categories = await getCategories();
  
  return (
    <div className="flex items-center justify-center flex-grow mx-5 my-6">
      <BlogForm categories={categories} />
    </div>
  );
};

export default CreateBlogPage;

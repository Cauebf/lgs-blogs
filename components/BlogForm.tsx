"use client";

import { Category } from "@prisma/client";
import { useActionState, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { createBlog, State } from "@/lib/actions";

const animatedComponents = makeAnimated();

const BlogForm = ({ categories }: { categories: Category[] }) => {
  const [content, setContent] = useState("");

  const options = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
  
  const handleSubmit = (prevState: State, formData: FormData) => {
    const formValues = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      categoryIds: formData
        .getAll("category")
        .map((id) => parseInt(id as string)),
      content,
    };

    createBlog(formValues);
    setContent("");

    return {
      ...prevState,
      message: "Blog created successfully!",
    };
  };

  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    handleSubmit,
    initialState
  );

  return (
    <form
      action={formAction}
      className="flex flex-col space-y-4 max-w-2xl bg-slate-300 rounded-lg p-8"
    >
      <h1 className="text-2xl font-bold text-center">Create a New Blog</h1>
      <div className="flex flex-col space-y-2">
        <label htmlFor="title" className="font-bold">
          TITLE
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          required
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="description" className="font-bold">
          DESCRIPTION
        </label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Blog Description"
          required
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="image" className="font-bold">
          IMAGE URL
        </label>
        <input
          type="link"
          name="image"
          id="image"
          placeholder="Paste a link to your blog image"
          required
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="category-select" className="font-bold">
          CATEGORY
        </label>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          name="category"
          isMulti
          options={options}
          inputId="category-select"
          placeholder="Select categories"
        />
      </div>

      <div data-color-mode="light">
        <label htmlFor="content" className="font-bold">
          BLOG CONTENT
        </label>
        <MDEditor
          value={content}
          onChange={(val) => setContent(val || "")}
          id="content"
          preview="edit"
          style={{ borderRadius: "8px", overflow: "hidden", marginTop: "8px" }}
          textareaProps={{
            placeholder: "Write your blog content here",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
      </div>
      <button
        type="submit"
        className={`p-2 bg-blue-500 text-white rounded hover:bg-blue-400 ${
          isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isPending ? "Submitting..." : "Create Blog"}
      </button>
    </form>
  );
};

export default BlogForm;

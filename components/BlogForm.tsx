"use client";

import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

const BlogForm = () => {
  const [value, setValue] = useState("**Hello world!!!**");

  const loading = false;

  return (
    <form className="flex flex-col space-y-4 max-w-lg mx-auto my-auto">
      <h1 className="text-2xl font-bold">Create a New Blog</h1>
      <div className="flex flex-col space-y-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="description">DESCRIPTION</label>
        <input
          type="text"
          name="description"
          placeholder="Blog Description"
          required
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div data-color-mode="light">
        <label htmlFor="blog">Blog</label>
        <MDEditor
          value={value}
          onChange={(value) => setValue(value as string)}
          id="blog"
          preview="edit"
          style={{ borderRadius: "10px", overflow: "hidden", marginTop: "8px" }}
          textareaProps={{
            placeholder: "Blog Content",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
      </div>
      <button
        type="submit"
        className={`p-2 bg-blue-500 text-white rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Submitting..." : "Create Blog"}
      </button>
    </form>
  );
};

export default BlogForm;

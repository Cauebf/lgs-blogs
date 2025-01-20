"use client";

import { Category } from "@prisma/client";
import { useActionState, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { State } from "@/types/types";
import { createBlog } from "@/lib/actions";
import {
  ToastContainer,
  ToastOptions,
  ToastPosition,
  toast,
} from "react-toastify";

const animatedComponents = makeAnimated();

const BlogForm = ({ categories }: { categories: Category[] }) => {
  const [content, setContent] = useState("");

  const options = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleSubmit = async (prevState: State, formData: FormData) => {
    const { message, errors } = await createBlog(formData, content);
    setContent("");

    const toastConfig: ToastOptions<unknown> = {
      position: "bottom-right" as ToastPosition,
      autoClose: 3000,
      pauseOnHover: false,
      draggable: true,
    };
    if (errors) {
      toast.error(message, toastConfig);
    } else {
      toast.success(message, toastConfig);
    }

    return {
      ...prevState,
      message,
      errors,
    };
  };

  const initialState: State = { message: null, errors: null };
  const [state, formAction, isPending] = useActionState(
    handleSubmit,
    initialState
  );

  return (
    <>
      <form
        action={formAction}
        className="flex flex-col space-y-4 max-w-2xl bg-white rounded-lg shadow-lg p-8"
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="title" className="font-bold">
            TITLE
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            aria-describedby="title-error"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-0 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="description" className="font-bold">
            DESCRIPTION
          </label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Blog Description"
            aria-describedby="description-error"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-0 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="image" className="font-bold">
            IMAGE URL
          </label>
          <input
            type="link"
            name="image"
            id="image"
            placeholder="Paste a link to your blog image"
            aria-describedby="image-error"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <div id="image-error" aria-live="polite" aria-atomic="true">
            {state.errors?.image &&
              state.errors.image.map((error: string) => (
                <p className="mt-0 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col space-y-1">
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
            aria-describedby="categoryIds-error"
            placeholder="Select categories"
            styles={{
              control: (base, state) => ({
                ...base,
                paddingTop: "2px",
                paddingBottom: "2px",
                border: state.isFocused
                  ? "2px solid black"
                  : "1px solid #D1D5DB",
                borderRadius: "0.5rem",
                boxShadow: "none",
                transition: "none",
                "&:hover": {
                  border: state.isFocused
                    ? "2px solid black"
                    : "1px solid #D1D5DB",
                  boxShadow: "none",
                },
              }),
              placeholder: (base) => ({
                ...base,
                color: "#9CA3AF",
                transition: "none",
              }),
              singleValue: (base) => ({
                ...base,
                transition: "none",
              }),
            }}
          />
          <div id="categoryIds-error" aria-live="polite" aria-atomic="true">
            {state.errors?.categoryIds &&
              state.errors.categoryIds.map((error: string) => (
                <p className="mt-0 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
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
            style={{
              borderRadius: "8px",
              overflow: "hidden",
              marginTop: "8px",
            }}
            textareaProps={{
              placeholder: "Write your blog content here",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
          <div id="content-error" aria-live="polite" aria-atomic="true">
            {state.errors?.content &&
              state.errors.content.map((error: string) => (
                <p className="mt-3 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
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
      <ToastContainer />
    </>
  );
};

export default BlogForm;

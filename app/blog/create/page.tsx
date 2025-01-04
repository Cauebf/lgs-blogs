import BlogForm from "@/components/BlogForm";

const CreateBlogPage = () => {
  //   const [formData, setFormData] = useState({
  //     title: "",
  //     description: "",
  //     image: "",
  //     content: "",
  //   });
  //   const [loading, setLoading] = useState(false);
  //   const router = useRouter();

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setLoading(true);

  //     try {
  //       const res = await fetch("/api/blogs", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(formData),
  //       });

  //       if (res.ok) {
  //         router.push("/"); // Redireciona após sucesso
  //       } else {
  //         console.error("Failed to create blog.");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return <BlogForm />;
};

export default CreateBlogPage;

import { useEffect, useState } from "react";

export default function UpdateArticleForm() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    journalistId: "",
    categoryId: "",
  });

  const { id } = userParams();
  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const fetchArticle = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/articles/${id}`);
      setForm(response.data);
      console.log("Fetched article:", response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    try {
      await axios.put(`http://localhost:3000/articles/${id}`, form);
      alert("Article updated successfully!");
    } catch (error) {
      console.error("Error", error);
      alert("Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <br />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        required
      />
      <br />
      <input
        name="journalistId"
        value={form.journalistId}
        onChange={handleChange}
        placeholder="Journalist ID"
        required
      />
      <br />
      <input
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        placeholder="Category ID"
        required
      />
      <br />
      <button type="submit">Update</button>
    </form>
  );
}

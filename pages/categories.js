import Layout from "@/components/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CategoriesPage = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("0");
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    try {
      const categoryData = {
        name,
        parentCategory: parentCategory === "0" ? null : parentCategory, // Convert "0" to null
      };

      if (editingCategory) {
        await axios.put("/api/categories", {
          _id: editingCategory._id,
          ...categoryData,
        });
        setEditingCategory(null);
      } else {
        await axios.post("/api/categories", categoryData);
      }

      setName("");
      setParentCategory("0");
      fetchCategories();
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

  function editCategory(category) {
    setEditingCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id || "0");
  }

  async function deleteCategory(categoryId) {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }
    try {
      await axios.delete(`/api/categories?id=${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <form onSubmit={saveCategory} className="mb-4">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            className="border p-2 rounded"
            required
          />
          <select
            className="border p-2 rounded"
            value={parentCategory}
            onChange={(ev) => setParentCategory(ev.target.value)}
          >
            <option value="0">No Parent Category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
          <button
            type="submit"
            className="bg-blue-900 text-white py-2 px-4 rounded-lg"
          >
            {editingCategory ? "Update" : "Save"}
          </button>
        </div>
      </form>

      <table className="border w-full mt-4">
        <thead className="bg-gray-100">
          <tr className="border">
            <th className="border p-2">Category Name</th>
            <th className="border p-2">Parent Category</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td className="border p-2">{category.name}</td>
                <td className="border p-2">
                  {category.parent?.name || "No Parent"}
                </td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => editCategory(category)}
                    className="bg-yellow-500 text-white py-1 px-3 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default CategoriesPage;

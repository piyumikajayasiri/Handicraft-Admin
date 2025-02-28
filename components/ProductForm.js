import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  color: existingColor,
  quantity: existingQuantity,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [category, setCategory] = useState("" || existingCategory);
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || "");
  const [categories, setCategories] = useState([]);
  const [color, setColor] = useState(existingColor || "");
  const [quantity, setQuantity] = useState(existingQuantity || "");
  const router = useRouter();
  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  useEffect(() => {
    setTitle(existingTitle || "");
    setDescription(existingDescription || "");
    setPrice(existingPrice || "");
    setImages(existingImages || "");
    setCategory(existingCategory || "");
    setColor(existingColor || "");
    setQuantity(existingQuantity || "");
  }, [
    existingTitle,
    existingDescription,
    existingPrice,
    existingImages,
    existingCategory,
    existingColor,
    existingQuantity,
  ]);

  async function createProduct(ev) {
    ev.preventDefault();

    const data = {
      title,
      description,
      price: Number(price),
      images: images,
      category,
      color,
      quantity,
    };

    try {
      if (_id) {
        // Update existing product
        await axios.put(`/api/products`, { ...data, _id });
      } else {
        // Create new product
        await axios.post("/api/products", data);
      }
      router.push("/products");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  }

  return (
    <form onSubmit={createProduct} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          placeholder="Product Name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          className="mt-1 p-2 w-full border border-gray-300 rounded"
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        >
          <option value="0">Uncategorized</option>
          {categories.length > 0 &&
            categories.map((c) => {
              return (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              );
            })}
        </select>
      </div>
      {/* color */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(ev) => setColor(ev.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />
      </div>
      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="text"
          placeholder="Quantity"
          value={quantity}
          onChange={(ev) => setQuantity(ev.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />
      </div>
      {/* Image URL input */}
      <div className="">
        <label className="block text-sm font-medium text-gray-700">
          Product Image URL
        </label>
        <input
          type="text"
          placeholder="Image URL"
          value={images}
          onChange={(ev) => setImages(ev.target.value)} // Update the image URL state
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          placeholder="Description"
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
          type="number"
          placeholder="Price"
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-900 text-white py-2 px-4 rounded-md"
      >
        Save
      </button>
    </form>
  );
}

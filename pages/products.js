import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Layout from "@/components/layout";
import { Edit, Trash2 } from "lucide-react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  async function handleDelete(productId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        await axios.delete(`/api/products?id=${productId}`);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  }
  return (
    <Layout>
      <table className="w-full m-1 mb-10">
        <thead className="bg-blue-300">
          <tr>
            <th className=" p-2">Product</th>
            <th className=" p-2"></th>
          </tr>
        </thead>
        <tbody className="bg-gray-300">
          {products.map((product) => (
            <tr key={product._id}>
              <td className=" p-2">{product.title}</td>
              <td className=" p-2 flex gap-3">
                <Link
                  className="px-4 py-1 rounded-lg text-black font-semibold bg-[#D0A7A7] inline-flex gap-2"
                  href={`/products/edit/${product._id}`}
                >
                  <Edit /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-4 py-1 rounded-lg text-black font-semibold bg-[#D0A7A7] inline-flex gap-2"
                >
                  <Trash2 /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link
        href={"/products/new"}
        className="bg-[#AB4949] text-white rounded-md py-1 px-2"
      >
        Add New Product
      </Link>
    </Layout>
  );
}

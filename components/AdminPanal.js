import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [email, setEmail] = useState("");
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  async function fetchAdmins() {
    try {
      const { data } = await axios.get("/api/admins"); // Fetch admins from API
      setAdmins(data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  }

  async function addAdmin(e) {
    e.preventDefault();
    try {
      await axios.post("/api/admins", { email }); // Add admin to MongoDB
      fetchAdmins(); // Refresh list
      setEmail(""); // Clear input field
    } catch (error) {
      console.error(
        "Error adding admin:",
        error.response?.data || error.message
      );
    }
  }

  async function deleteAdmin(adminEmail) {
    try {
      await axios.delete("/api/admins", { data: { email: adminEmail } }); // Delete admin
      fetchAdmins(); // Refresh list
    } catch (error) {
      console.error(
        "Error deleting admin:",
        error.response?.data || error.message
      );
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Admins</h2>

      {/* Add Admin Form */}
      <h3 className="mt-4 font-semibold">Add New Admin</h3>
      <form onSubmit={addAdmin} className="flex flex-row gap-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter admin email"
          className="mt-1 p-2 w-full border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-[#AC2828] px-6 py-2 rounded-lg text-white font-semibold"
        >
          Add New Admin
        </button>
      </form>

      {/* Admin List */}
      <h3 className="mt-4 font-semibold">Current Admins</h3>
      <table className="w-full mt-2 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border flex items-start">Admin Google Email</th>
            <th className="p-2 border"></th>
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {admins.length > 0 ? (
            admins.map((admin) => (
              <tr key={admin._id} className="">
                <td className="p-2 ">{admin.email}</td>
                <td className="p-2 flex items-end justify-end ">
                  <button
                    onClick={() => deleteAdmin(admin.email)}
                    className="bg-[#D0A7A7] text-black font-semibold px-6 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center p-2">
                No admins found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

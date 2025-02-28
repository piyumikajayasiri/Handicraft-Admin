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
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Admin Management</h2>

      {/* Add Admin Form */}
      <form onSubmit={addAdmin} className="mt-4 flex space-x-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter admin email"
          required
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Add Admin
        </button>
      </form>

      {/* Admin List */}
      <h3 className="mt-4 font-semibold">Current Admins</h3>
      <table className="w-full mt-2 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Admin Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.length > 0 ? (
            admins.map((admin) => (
              <tr key={admin._id} className="border">
                <td className="p-2 border">{admin.email}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => deleteAdmin(admin.email)}
                    className="bg-red-500 text-white p-1 rounded"
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

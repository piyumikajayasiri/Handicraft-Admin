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
      const { data } = await axios.get("/api/admins");
      setAdmins(data);
    } catch (error) {
      console.error("Error fetching admins", error);
    }
  }

  async function addAdmin(e) {
    e.preventDefault();
    try {
      await axios.post("/api/admins", { email });
      fetchAdmins();
      setEmail("");
    } catch (error) {
      console.error(
        "Error adding admin",
        error.response?.data || error.message
      );
    }
  }

  async function deleteAdmin(adminEmail) {
    try {
      await axios.delete("/api/admins", { data: { email: adminEmail } });
      fetchAdmins();
    } catch (error) {
      console.error(
        "Error deleting admin",
        error.response?.data || error.message
      );
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Admins</h2>

      {/* Add Admin Form */}
      <form onSubmit={addAdmin} className="mt-4 flex items-center space-x-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter admin email"
          required
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="bg-red-600 text-white p-2 rounded">
          Add New Admin
        </button>
      </form>

      {/* Admin List */}
      <h3 className="mt-4 font-semibold">Admin List</h3>
      <table className="w-full mt-2 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Admin Google Email</th>
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
                    className="bg-red-400 text-white p-1 rounded"
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

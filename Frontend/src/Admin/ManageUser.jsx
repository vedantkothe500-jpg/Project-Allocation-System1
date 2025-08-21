import React, { useEffect, useState } from "react";
import axiosInstance from "../Security/AxiosIntant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/getAllUsers");
      setUsers(res.data || []);
      setErrorMsg("");
    } catch (error) {
      console.error("Error fetching users:", error);
      setErrorMsg("Failed to fetch users. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosInstance.delete(`/admin/delete/${id}`);
      toast.success("✅ User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("❌ Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const requiredFields = ["name", "rollno", "phno", "email", "branch"];
    const missingField = requiredFields.find((f) => !editingUser?.[f]);
    if (missingField) {
      toast.error(`❌ ${missingField} is required`);
      setUpdating(false);
      return;
    }

    try {
      await axiosInstance.put(`/admin/update/${editingUser.stdid}`, editingUser);
      toast.success("✅ User updated successfully");
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("❌ Failed to update user");
    } finally {
      setUpdating(false);
      document.body.style.overflow = "auto";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setEditingUser(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="p-4 sm:p-8">
      <ToastContainer />
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-blue-700">Manage Users</h2>

      {loading ? (
        <div className="text-center text-gray-600">Loading users...</div>
      ) : errorMsg ? (
        <div className="text-center text-red-600">{errorMsg}</div>
      ) : users.length === 0 ? (
        <div className="text-center text-gray-500">No users found.</div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white text-sm text-left border border-gray-200">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Roll No</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Branch</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Domain</th>
                <th className="px-4 py-2 border">Selected Project</th>
                <th className="px-4 py-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.stdid} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{u.stdid}</td>
                  <td className="px-4 py-2 border">{u.name}</td>
                  <td className="px-4 py-2 border">{u.rollno}</td>
                  <td className="px-4 py-2 border">{u.phno}</td>
                  <td className="px-4 py-2 border">{u.email}</td>
                  <td className="px-4 py-2 border">{u.branch}</td>
                  <td className="px-4 py-2 border">{u.address}</td>
                  <td className="px-4 py-2 border">{u.domain || "Not Defined"}</td>
                  <td className="px-4 py-2 border">{u.selectedProject || "Not Defined"}</td>
                  <td className="px-4 py-2 border text-center space-x-2">
                    <button onClick={() => handleEdit(u)} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDelete(u.stdid)} className="text-red-600 hover:text-red-800 cursor-pointer">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-2xl relative">
            <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">Edit User</h3>
            <form onSubmit={handleUpdateSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="name" value={editingUser.name} onChange={handleChange} className="border p-2 rounded" placeholder="Name" />
              <input name="rollno" value={editingUser.rollno} onChange={handleChange} className="border p-2 rounded" placeholder="Roll No" />
              <input name="phno" value={editingUser.phno} onChange={handleChange} className="border p-2 rounded" placeholder="Phone" />
              <input name="email" value={editingUser.email} onChange={handleChange} className="border p-2 rounded" placeholder="Email" />
              <input name="branch" value={editingUser.branch} onChange={handleChange} className="border p-2 rounded" placeholder="Branch" />
              <input name="address" value={editingUser.address} onChange={handleChange} className="border p-2 rounded" placeholder="Address" />
              <input name="domain" value={editingUser.domain || ""} onChange={handleChange} className="border p-2 rounded" placeholder="Domain" />
              <input name="selectedProject" value={editingUser.selectedProject || ""} onChange={handleChange} className="border p-2 rounded col-span-1 sm:col-span-2" placeholder="Selected Project" />

              <div className="col-span-1 sm:col-span-2 flex justify-end space-x-4 mt-4">
                <button type="submit" disabled={updating} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  {updating ? "Saving..." : "Save"}
                </button>
                <button onClick={closeModal} type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;

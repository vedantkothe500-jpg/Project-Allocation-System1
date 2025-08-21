import React, { useState, useEffect } from "react";
import axiosInstance from "../Security/AxiosIntant";
import { CheckCircle, AlertCircle } from "lucide-react";

const AddAdmin = () => {
  const [adminData, setAdminData] = useState({ name: "", email: "", password: "" });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/admin/register", adminData);
      setResponse({ success: true, message: res.data.message || "Admin added successfully!" });
      setAdminData({ name: "", email: "", password: "" });
    } catch (err) {
      setResponse({
        success: false,
        message: err.response?.data?.message || "Failed to add admin. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (response) {
      const timer = setTimeout(() => {
        setResponse(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [response]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Register New Admin</h2>

        {response && (
          <div
            role="alert"
            className={`flex items-center gap-2 mb-4 p-4 rounded-lg border transition-all duration-300 ${
              response.success
                ? "bg-green-50 text-green-800 border-green-300"
                : "bg-red-50 text-red-800 border-red-300"
            }`}
          >
            {response.success ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{response.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              value={adminData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="admin@example.com"
              value={adminData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={adminData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-semibold py-2 rounded-lg transition duration-200 ${
              loading ? "bg-blue-300" : "bg-blue-600 cursor-pointer hover:bg-blue-700"
            }`}
          >
            {loading ? "Adding Admin..." : "Add Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;

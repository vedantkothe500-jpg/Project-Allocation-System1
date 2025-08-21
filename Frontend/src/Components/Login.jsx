import React, { useState } from "react";
import axiosInstance from "../Security/AxiosIntant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setResponse(null); // Clear response on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await axiosInstance.post("/auth/login", formData);
      const { status, role, user, token, message } = res.data;

      if (status === true) {
        const cleanRole = role.replace("ROLE_", "");
        localStorage.setItem("token", token);
        localStorage.setItem("role", cleanRole);
        localStorage.setItem("email", user.email);

        if (cleanRole === "USER") {
          localStorage.setItem("studentId", user.stdid);
          localStorage.setItem("studentName", user.name);
          setTimeout(() => navigate("/domains"), 400);
        } else if (cleanRole === "ADMIN") {
          localStorage.setItem("adminId", user.adminid);
          localStorage.setItem("adminName", user.name);
          setTimeout(() => navigate("/admin"), 400);
        }

        setResponse({ status: true, message: "Login successful!" });
      } else {
        setResponse({ status: false, message: message || "Invalid credentials" });
      }
      
    } catch (error) {
      console.error(error);
      setResponse({
        status: false,
        message: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome Back</h2>

        {response && (
          <div
            className={`text-sm font-medium p-3 mb-4 rounded-md text-center ${
              response.status
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {response.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              loading ? "bg-blue-600" : "bg-blue-600 cursor-pointer hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

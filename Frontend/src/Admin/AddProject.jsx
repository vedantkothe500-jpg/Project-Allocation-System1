import React, { useState } from "react";
import axiosInstance from "../Security/AxiosIntant";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirement: "",
    projectLink: "",
    domain: "",
    difficultylevel: "",
    minScoreRequired: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await axiosInstance.post("/admin/addProject", [formData]);
      setMessage({ text: "✅ Project added successfully!", type: "success" });
      setFormData({
        title: "",
        description: "",
        requirement: "",
        projectLink: "",
        domain: "",
        difficultylevel: "",
        minScoreRequired: "",
      });
    } catch (error) {
      console.error("Error adding project:", error);
      const errMsg =
        error.response?.data?.message || "❌ Failed to add project.";
      setMessage({ text: errMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          🚀 Add New Project
        </h2>

        {message.text && (
          <div
            className={`mb-4 px-4 py-3 rounded text-center font-semibold ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="requirement"
            placeholder="Project Requirements"
            value={formData.requirement}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="projectLink"
            placeholder="GitHub Project Link"
            value={formData.projectLink}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="domain"
            placeholder="Domain (e.g., Web Development)"
            value={formData.domain}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="difficultylevel"
            value={formData.difficultylevel}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Difficulty Level</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <input
            type="number"
            name="minScoreRequired"
            placeholder="Minimum Score Required"
            value={formData.minScoreRequired}
            onChange={handleChange}
            required
            min={0}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition duration-300 ${
              loading && "opacity-60 cursor-not-allowed"
            }`}
          >
            {loading ? "Adding..." : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;

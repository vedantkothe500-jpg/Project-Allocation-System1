import React, { useEffect, useState } from "react";
import axiosInstance from "../Security/AxiosIntant";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const GetAllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [message, setMessage] = useState(""); // ✅ success message

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get("/admin/getAllProjects");
      setProjects(response.data);
    
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 3000); // 3 sec baad message hat jayega
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axiosInstance.delete(`/admin/deleteProject/${id}`);
        showMessage("Project deleted successfully!");
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project", error);
        showMessage("Failed to delete project.");
      }
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/admin/updateProject/${editingProject.id}`, editingProject);
      setEditingProject(null);
      showMessage("Project updated successfully!");
      fetchProjects();
    } catch (error) {
      console.error("Error updating project", error);
      showMessage("Failed to update project.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">All Projects</h2>

      {/* ✅ SUCCESS MESSAGE */}
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-400 rounded">
          {message}
        </div>
      )}

      {/* EDIT FORM */}
      {editingProject && (
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Update Project ID: {editingProject.id}</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="title" value={editingProject.title} onChange={handleChange} className="border p-2 rounded" placeholder="Title" />
            <input type="text" name="domain" value={editingProject.domain} onChange={handleChange} className="border p-2 rounded" placeholder="Domain" />
            <input type="text" name="difficultyLevel" value={editingProject.difficultylevel} onChange={handleChange} className="border p-2 rounded" placeholder="Difficulty Level" />
            <input type="number" name="minScoreRequired" value={editingProject.minScoreRequired} onChange={handleChange} className="border p-2 rounded" placeholder="Minimum Score Required" />
            <input type="text" name="projectLink" value={editingProject.projectLink} onChange={handleChange} className="border p-2 rounded" placeholder="Project Link" />
            <textarea name="description" value={editingProject.description} onChange={handleChange} className="border p-2 rounded col-span-2" placeholder="Description" />
            <textarea name="requirement" value={editingProject.requirement} onChange={handleChange} className="border p-2 rounded col-span-2" placeholder="Requirement" />
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              <FaSave className="inline mr-2" /> Save
            </button>
            <button onClick={handleCancelEdit} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
              <FaTimes className="inline mr-2" /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* PROJECT TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Domain</th>
              <th className="py-2 px-4 border">Difficulty</th>
              <th className="py-2 px-4 border">Score</th>
              <th className="py-2 px-4 border">Link</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj) => (
              <tr key={proj.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{proj.id}</td>
                <td className="py-2 px-4 border">{proj.title}</td>
                <td className="py-2 px-4 border">{proj.domain}</td>
                <td className="py-2 px-4 border">{proj.difficultylevel}</td>
                <td className="py-2 px-4 border">{proj.minScoreRequired}</td>
                <td className="py-2 px-4 border">
                  <a href={proj.projectLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    View
                  </a>
                </td>
                <td className="py-2 px-4 border flex gap-2">
                  <button onClick={() => handleEdit(proj)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(proj.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllProjects;

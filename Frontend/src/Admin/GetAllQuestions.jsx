import React, { useEffect, useState } from "react";
import axiosInstance from "../Security/AxiosIntant";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const GetAllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/AllQuestion");
      setQuestions(res.data);
    } catch (err) {
      console.error("❌ Error fetching questions:", err);
      setErrorMessage("Failed to load questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg, type = "success") => {
    if (type === "success") setSuccessMessage(msg);
    else setErrorMessage(msg);
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const deleteQuestion = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this question?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/admin/deleteQuestion/${id}`);
      showMessage("✅ Question deleted successfully", "success");
      fetchQuestions();
    } catch (err) {
      console.error("❌ Error deleting question:", err);
      showMessage("❌ Failed to delete the question", "error");
    }
  };

  const updateQuestion = async () => {
    try {
      await axiosInstance.put(`/admin/updateQuestion/${editing.id}`, editing);
      showMessage("✅ Question updated successfully", "success");
      setEditing(null);
      fetchQuestions();
    } catch (err) {
      console.error("❌ Error updating question:", err);
      showMessage("❌ Failed to update the question", "error");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditing((prev) => ({ ...prev, [name]: value }));
  };

  const renderInput = (field) => (
    <td key={field} className="p-2 border">
      <input
        type="text"
        name={field}
        value={editing[field] || ""}
        onChange={handleEditChange}
        className="w-full px-2 py-1 border rounded focus:outline-none focus:ring"
      />
    </td>
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">📋 All Questions</h2>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-center">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
          {errorMessage}
        </div>
      )}

      {loading ? (
        <div className="text-center text-blue-600">Loading questions...</div>
      ) : questions.length === 0 ? (
        <div className="text-center text-gray-600">No questions available.</div>
      ) : (
        <div className="overflow-auto max-h-[70vh] rounded-lg border border-gray-300 shadow-sm">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600 sticky top-0">
              <tr>
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Difficulty</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Option 1</th>
                <th className="p-3 border">Option 2</th>
                <th className="p-3 border">Option 3</th>
                <th className="p-3 border">Option 4</th>
                <th className="p-3 border">Right Answer</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => {
                const isEditing = editing?.id === q.id;

                return (
                  <tr key={q.id} className="hover:bg-gray-50 border-t">
                    <td className="p-2 border">{q.id}</td>

                    {isEditing ? (
                      <>
                        {["category", "difficultylevel", "questionTitle", "option1", "option2", "option3", "option4", "rightanswer"].map(renderInput)}
                        <td className="p-2 border text-center flex gap-2 justify-center">
                          <button
                            onClick={updateQuestion}
                            className="text-green-600 hover:text-green-800"
                            title="Save"
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => setEditing(null)}
                            className="text-red-600 hover:text-red-800"
                            title="Cancel"
                          >
                            <FaTimes />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-2 border">{q.category}</td>
                        <td className="p-2 border">{q.difficultylevel}</td>
                        <td className="p-2 border">{q.questionTitle}</td>
                        <td className="p-2 border">{q.option1}</td>
                        <td className="p-2 border">{q.option2}</td>
                        <td className="p-2 border">{q.option3}</td>
                        <td className="p-2 border">{q.option4}</td>
                        <td className="p-2 border">{q.rightanswer}</td>
                        <td className="p-2 border text-center flex gap-2 justify-center">
                          <button
                            onClick={() => setEditing(q)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteQuestion(q.id)}
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetAllQuestions;

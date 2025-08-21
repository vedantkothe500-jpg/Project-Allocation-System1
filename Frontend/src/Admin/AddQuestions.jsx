import React, { useState } from "react";
import axiosInstance from "../Security/AxiosIntant";

const AddQuestions = () => {
  const initialQuestion = {
    questionTitle: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    rightanswer: "",
    difficultylevel: "",
    category: "",
  };

  const [questions, setQuestions] = useState([initialQuestion]);
  const [error, setError] = useState("");

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    setQuestions(newQuestions);
  };

  const handleAddMore = () => {
    setQuestions([...questions, initialQuestion]);
  };

  const handleRemove = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const validateQuestions = () => {
    for (let q of questions) {
      for (let key in q) {
        if (!q[key].trim()) {
          setError("⚠️ All fields are required!");
          return false;
        }
      }
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateQuestions()) return;

    try {
      await axiosInstance.post("/admin/addAll", questions);
      alert("✅ All questions added successfully!");
      setQuestions([initialQuestion]);
    } catch (error) {
      console.error("❌ Error adding questions:", error);
      alert("❌ Failed to add questions. Please try again.");
    }
  };

  const handleClearAll = () => {
    setQuestions([initialQuestion]);
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Add Multiple Questions</h2>

      {error && <div className="text-red-600 font-semibold mb-4 text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        {questions.map((q, index) => (
          <div key={index} className="border rounded-lg p-6 relative bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Question {index + 1}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="questionTitle" type="text" placeholder="Question Title" value={q.questionTitle} onChange={(e) => handleChange(index, e)} className="border p-2 rounded" required />
              <input name="rightanswer" type="text" placeholder="Correct Answer" value={q.rightanswer} onChange={(e) => handleChange(index, e)} className="border p-2 rounded" required />

              <input name="option1" type="text" placeholder="Option 1" value={q.option1} onChange={(e) => handleChange(index, e)} className="border p-2 rounded" required />
              <input name="option2" type="text" placeholder="Option 2" value={q.option2} onChange={(e) => handleChange(index, e)} className="border p-2 rounded" required />
              <input name="option3" type="text" placeholder="Option 3" value={q.option3} onChange={(e) => handleChange(index, e)} className="border p-2 rounded" required />
              <input name="option4" type="text" placeholder="Option 4" value={q.option4} onChange={(e) => handleChange(index, e)} className="border p-2 rounded" required />

              <select name="difficultylevel" value={q.difficultylevel} onChange={(e) => handleChange(index, e)} className="border p-2 rounded" required>
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <select name="category" value={q.category} onChange={(e) => handleChange(index, e)} className="border p-2 rounded" required>
                <option value="">Select Category</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Java">Java</option>
                <option value="React">React</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {questions.length > 1 && (
              <button type="button" onClick={() => handleRemove(index)} className="absolute top-3 right-3 text-red-500 font-semibold hover:underline">
                ❌ Remove
              </button>
            )}
          </div>
        ))}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <button type="button" onClick={handleAddMore} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            ➕ Add More Question
          </button>
          <button type="button" onClick={handleClearAll} className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600">
            🔄 Clear All
          </button>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            🚀 Submit All
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestions;

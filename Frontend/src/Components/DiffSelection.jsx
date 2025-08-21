import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../Security/AxiosIntant";

const DifficultySelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const domain = location.state?.domain || "Unknown";
  const studentId = localStorage.getItem("studentId");

  const [loadingLevel, setLoadingLevel] = useState(null);
  const [error, setError] = useState(null);

  const handleDifficultyClick = async (level) => {
    setLoadingLevel(level);
    setError(null);
   localStorage.setItem("level", level);
 
    try {
      const response = await axiosInstance.post("/user/create", null, {
        params: {
          category: domain,
          numq: 20,
          difficulty: level,
          title: `${domain}Quiz`,
        },
      });

      const quizId = response.data.quizId;

      if (quizId) {
        navigate(`/quiz/${quizId}`);
      } else {
        setError("Failed to retrieve quiz ID.");
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoadingLevel(null);
    }
  };

  const difficulties = ["Easy", "Medium", "Hard"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transition-all">
        <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
          Select Quiz Difficulty
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Domain: <span className="font-medium text-blue-800">{domain}</span>
        </p>

        <div className="grid grid-cols-1 gap-4">
          {difficulties.map((level) => (
            <button
              key={level}
              onClick={() => handleDifficultyClick(level)}
              className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition-all duration-300 cursor-pointer
                ${
                  loadingLevel === level
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }
              `}
              disabled={loadingLevel === level}
            >
              {loadingLevel === level ? `Loading...` : level}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-6 bg-red-100 text-red-700 p-3 rounded-lg text-center text-sm font-medium">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default DifficultySelection;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProjectConfirmation = () => {
  const navigate = useNavigate();
  

  
        
    const Title = localStorage.getItem("title");
    const Description = localStorage.getItem("description");
    const Requirement = localStorage.getItem("requirement");
    const Link = localStorage.getItem("projectLink");
    

  // If no project found in localStorage
  if (!Title||!Description||!Requirement||!Link) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
        <div className="bg-white shadow-lg p-8 rounded-xl max-w-xl w-full text-center space-y-6">
          <h2 className="text-3xl font-bold text-red-600">⚠️ Project Not Found</h2>
          <p className="text-gray-700 text-lg">
            Sorry, we couldn't confirm your project. Please try selecting a project again.
          </p>
          <button
            onClick={() => navigate("/domains")}
            className="bg-red-600 hover:bg-red-700 transition text-white font-semibold py-3 px-6 rounded-lg"
          >
            🔙 Go Back to Domains
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-3xl p-8 sm:p-10 rounded-2xl shadow-2xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-700">🎯 Project Confirmed!</h1>
          <p className="text-lg text-gray-600">
            You have successfully chosen your project. Here are the details:
          </p>
        </div>

        <div className="bg-green-100 p-6 rounded-lg border border-green-300 shadow-inner">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-700 break-words">
            📌 {Title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-700"><strong>Description:</strong> {Description}</p>
          <p className="mt-1 text-sm sm:text-base text-gray-700"><strong>Requirement:</strong> {Requirement}</p>
          <p className="mt-1 text-sm sm:text-base text-gray-700">
            <strong>Project Link:</strong>{" "}
            <a
              href={Link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {Link}
            </a>
          </p>
        </div>

        <div className="text-center text-gray-700 text-md sm:text-lg space-y-4">
          🌟 <strong>Congratulations!</strong> You’ve taken the first step toward greatness.
          <br />
          Keep learning, keep building. The future is yours! 🚀💻
          <div className="bg-green-100 border border-green-300 p-4 rounded-xl shadow-inner mt-4 text-green-800 font-medium leading-relaxed">
            ✨ <strong>Remember:</strong> Every expert was once a beginner.
            <br />
            💡 What matters most is your passion to learn and your courage to create.
            <br />
            🔧 Embrace challenges, 💭 stay curious, and 💪 never stop exploring.
            <br />
            🌈 Your journey has just begun — now build something amazing!
          </div>
        </div>

        <div className="text-center">
          <a
            href="/domains"
            className="inline-block bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 py-3 rounded-lg"
          >
            🔙 Back to Domains
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectConfirmation;

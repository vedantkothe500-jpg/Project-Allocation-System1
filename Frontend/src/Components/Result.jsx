import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../Security/AxiosIntant";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.result || 0;
  const domain =   localStorage.getItem("domain");
  const difficulty = localStorage.getItem("level");

  console.log(difficulty,domain);

  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
 const [selectedProjectId, setSelectedProjectId] = useState(null); // ✅ new state
const [loadingProjects, setLoadingProjects] = useState(true);

  // Fetch recommended projects
  useEffect(() => {
    if (typeof score === "number") {
      setLoadingProjects(true);
      axiosInstance
        .get("/user/allocate", {
          params: { domain, difficulty, score },
        })
        .then((res) => {
          if (Array.isArray(res.data)) {
            setProjects(res.data);
            setMessage("");
          } else {
            setMessage(res.data || "No suitable projects found.");
          }
        })
        .catch(() => {
          setMessage("❌ Failed to fetch projects. Please try again.");
        })
        .finally(() => {
          setLoadingProjects(false);
        });
    }
  }, [score, domain, difficulty]);

  // Animate title while loading project selection
 useEffect(() => {
  let interval;
  const frames = ["◐", "◓", "◑", "◒"];
  let i = 0;

  if (selectedProjectId !== null) {
    interval = setInterval(() => {
      document.title = `Selecting project ${frames[(i = ++i % frames.length)]} `;
    }, 100);
  } else {
    document.title = "Project Allocation System";
  }

  return () => clearInterval(interval);
}, [selectedProjectId]);


  // Handle project selection
  const handleProjectSelect = async (project) => {
  const studentId = localStorage.getItem("studentId");
  if (!studentId) {
    alert("Student ID not found. Please log in again.");
    return;
  }

  // Save project details to localStorage
  localStorage.setItem("title", project.title);
  localStorage.setItem("description", project.description);
  localStorage.setItem("requirement", project.requirement);
  localStorage.setItem("projectLink", project.projectLink);

  setSelectedProjectId(project.id); // ✅ Only this project's button will show loading

  try {
    await axiosInstance.put("/user/selectProject", null, {
      params: {
        studentId,
        projectTitle: project.title,
        difficulty: difficulty,
      },
    });
    navigate("/project-confirmation");
  } catch (error) {
    console.error("Project selection error:", error);
    alert("❌ Failed to select project. Please try again.");
  } finally {
    setSelectedProjectId(null);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
          🎯 Your Score: <span className="text-black">{score}/20</span>
        </h1>

        {loadingProjects ? (
          <div className="text-center py-10 text-lg text-gray-700 animate-pulse">
            🔄 Fetching your best project suggestions...
          </div>
        ) : message ? (
          <div className="text-center text-red-600 font-medium py-6">{message}</div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-green-700 text-center mb-6">
              ✅ Projects Suggested Based on Your Score
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projects.map((proj, index) => (
                <div
                  key={proj.id}
                  className="border border-blue-300 bg-blue-50 p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    📌 {proj.title}
                  </h3>
                  <p className="text-sm mb-1">
                    <strong>Description:</strong> {proj.description}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Requirement:</strong> {proj.requirement}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Project Link:</strong>{" "}
                    <a
                      href={proj.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {proj.projectLink}
                    </a>
                  </p>
                 <button
                     onClick={() => handleProjectSelect(proj)}
                     disabled={selectedProjectId === proj.id}
                     className={`mt-4 w-full py-2 rounded-lg font-semibold transition duration-200 ${
                     selectedProjectId === proj.id
                     ? "bg-gray-400 cursor-not-allowed"
                     : "bg-blue-700 hover:bg-green-700 text-white"
  }`}
>
  {selectedProjectId === proj.id ? "Selecting..." : "Choose This Project"}
</button>

                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultPage;

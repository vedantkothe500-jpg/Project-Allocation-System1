import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLaptopCode, FaUserShield, FaCloud, FaRobot, FaUserCircle, FaRegSmileWink
} from "react-icons/fa";
import { MdPhoneIphone, MdComputer, MdLogout } from "react-icons/md";
import axiosInstance from "../Security/AxiosIntant";

const DomainSelection = () => {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const menuRef = useRef(null); // 👈 ref for logout dropdown
  const studentName = localStorage.getItem("studentName");
  const studentId = localStorage.getItem("studentId");

  

  useEffect(() => {
    if (!studentName) {
      navigate("/login");
    }
  }, [studentName, navigate]);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const domains = [
    { name: "Web Development", icon: <FaLaptopCode size={80} /> },
    { name: "Machine Learning", icon: <FaRobot size={80} /> },
    { name: "Mobile App Development", icon: <MdPhoneIphone size={80} /> },
    { name: "Software Development", icon: <MdComputer size={80} /> },
    { name: "Cybersecurity", icon: <FaUserShield size={80} /> },
    { name: "Cloud Computing", icon: <FaCloud size={80} /> },
  ];

  const handleDomainClick = async (domain) => {
    if (isLoading) return;

    setSelectedDomain(domain);
    setIsLoading(true);
       
    localStorage.setItem("domain", domain);
    try {
      await axiosInstance.put(`/user/setDomain/${studentId}`, { domain });
      navigate("/difficulty", { state: { domain } });
    } catch (error) {
      console.error("Error updating domain:", error);
      alert("⚠️ Failed to update domain. Please try again later.");
      setSelectedDomain("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-700 tracking-wide">
          Project Allocator
        </h1>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-2 focus:outline-none hover:text-blue-700 cursor-pointer"
          >
            <span className="font-semibold">{studentName}</span>
            <FaUserCircle size={28} className="text-blue-600" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-md transition duration-150 z-50">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left hover:bg-red-100 text-red-600 flex items-center space-x-2"
              >
                <MdLogout />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-10 py-2 bg-amber-100 rounded-xl shadow-inner mx-6 mt-6">
        <div className="text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-800 mb-2">
            Welcome, {studentName}! 👋
          </h2>
          <p className="text-yellow-700 text-lg">
            Ready to explore and choose your project domain? Let’s begin!
          </p>
        </div>
        <FaRegSmileWink className="text-yellow-600 w-24 h-24 md:w-32 md:h-32 mb-6 lg:mb-0" />
      </div>

      {/* Domain Selection */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Choose Your Domain
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {domains.map((domain, index) => (
            <button
              key={index}
              onClick={() => handleDomainClick(domain.name)}
              disabled={isLoading}
              className={`flex flex-col items-center justify-center p-12 rounded-2xl 
                shadow-md border-2 bg-white hover:shadow-xl transition-all 
                duration-300 focus:outline-none hover:scale-105 text-center cursor-pointer
                ${
                  selectedDomain === domain.name
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
            >
              <div className="text-blue-600 mb-4">{domain.icon}</div>
              <span className="text-lg font-medium text-gray-700">
                {domain.name}
              </span>
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="mt-6 text-center text-blue-600 font-semibold">
            Please wait...
          </div>
        )}
      </section>
    </div>
  );
};

export default DomainSelection;

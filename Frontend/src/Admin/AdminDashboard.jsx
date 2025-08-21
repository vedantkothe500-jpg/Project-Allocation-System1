import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  FaUserEdit,
  FaUserShield,
  FaProjectDiagram,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const AdminLayout = () => {
  const [showProjectSubmenu, setShowProjectSubmenu] = useState(false);
  const [showQuestionSubmenu, setShowQuestionSubmenu] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(false);
  const adminName = localStorage.getItem("adminName") || "Admin";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowProjectSubmenu(false);
    setShowQuestionSubmenu(false);
    setMobileSidebarOpen(false);
  };

  const SidebarContent = ({ isCollapsed }) => (
    <div
      className={`p-4 ${isCollapsed ? "w-16" : "w-64"
        } bg-gray-800 text-white h-full transition-all duration-300`}
    >
      <h2 className={`text-3xl font-bold mb-6 text-center ${isCollapsed ? "hidden" : ""}`}>
        Admin
      </h2>

      <button
        onClick={() => handleNavigate("add-admin")}
        className="mb-4 text-xl flex items-center hover:text-gray-400 cursor-pointer"
      >
        <FaUserShield className="mr-3" />
        {!isCollapsed && "Add Admin"}
      </button>

      <button
        onClick={() => handleNavigate("manage")}
        className="mb-4 text-xl flex items-center hover:text-gray-400 cursor-pointer"
      >
        <FaUserEdit className="mr-3" />
        {!isCollapsed && "Manage User"}
      </button>

      {/* Manage Projects */}
      <div>
        <button
          onClick={() => setShowProjectSubmenu(!showProjectSubmenu)}
          className="mb-4 text-xl flex items-center hover:text-gray-400 cursor-pointer"
        >
          <FaProjectDiagram className="mr-3" />
          {!isCollapsed && "Manage Projects"}
        </button>

        {!isCollapsed && showProjectSubmenu && (
          <div className="ml-8 mb-4">
            <button
              onClick={() => handleNavigate("/admin/add-project")}
              className="block text-lg mb-2 hover:text-gray-400 cursor-pointer"
            >
              ➤ Add Project
            </button>
            <button
              onClick={() => handleNavigate("/admin/get-projects")}
              className="block text-lg hover:text-gray-400 cursor-pointer"
            >
              ➤ Get All Projects
            </button>
          </div>
        )}
      </div>

      {/* Manage Questions */}
      <div>
        <button
          onClick={() => setShowQuestionSubmenu(!showQuestionSubmenu)}
          className="mb-4 text-xl flex items-center hover:text-gray-400 cursor-pointer"
        >
          <FaQuestionCircle className="mr-3" />
          {!isCollapsed && "Manage Questions"}
        </button>

        {!isCollapsed && showQuestionSubmenu && (
          <div className="ml-8 mb-4">
            <button
              onClick={() => handleNavigate("/admin/add-question")}
              className="block text-lg mb-2 hover:text-gray-400 cursor-pointer"
            >
              ➤ Add Question
            </button>
            <button
              onClick={() => handleNavigate("/admin/update-question")}
              className="block text-lg hover:text-gray-400 cursor-pointer"
            >
              ➤ Get All Questions
            </button>
          </div>
        )}
      </div>

      {/* Logout */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-600 text-xl flex items-center cursor-pointer"
        >
          <FaSignOutAlt className="mr-3" />
          {!isCollapsed && "Logout"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SidebarContent isCollapsed={desktopSidebarCollapsed} />
      </div>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full z-50">
            <SidebarContent isCollapsed={false} />
          </div>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-white p-4 shadow-md">
          <div className="flex items-center gap-4">
            {/* Mobile toggle */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="text-gray-800 hover:text-blue-500 text-2xl md:hidden"
            >
              {mobileSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Desktop toggle */}
            <button
              onClick={() => setDesktopSidebarCollapsed(!desktopSidebarCollapsed)}
              className="text-gray-800 hover:text-blue-500 text-2xl hidden md:block"
            >
              {desktopSidebarCollapsed ? <FaBars /> : <FaTimes />}
            </button>

            <h1 className="text-xl font-semibold">Welcome, {adminName} 😊</h1>
          </div>
        </div>

        {/* Dynamic content */}
        <div className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './Components/Register';
import Login from "./Components/Login";
import Domains from "./Components/Domains";
import Home from "./Components/Home";
import Diff from "./Components/DiffSelection";
import Quiz from "./Components/Quiz";
import Result from "./Components/Result";
import Confirm from "./Components/ProjectConfirmation";
import ManageUser from "./Admin/ManageUser";
import AddProject from "./Admin/AddProject";
import AddQuestions from "./Admin/AddQuestions";
import GetAllQuestions from "./Admin/GetAllQuestions";
import Admin from "./Admin/AdminDashboard";
import AddAdmin from './Admin/AddAdmin';
import GetAllProjects from "./Admin/GetAllProjects";
// import AddUser from './Admin/AddUser'; // Add other components later

// Route Guards
import AdminRoute from "./Security/AdminRoute";
import UserRoute from "./Security/UserRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔓 Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* 👨‍🎓 User Protected Routes */}
        <Route path="/domains" element={<UserRoute><Domains /></UserRoute>} />
        <Route path="/difficulty" element={<UserRoute><Diff /></UserRoute>} />
        <Route path="/quiz/:id" element={<UserRoute><Quiz /></UserRoute>} />
        <Route path="/result" element={<UserRoute><Result /></UserRoute>} />
        <Route path="/project-confirmation" element={<UserRoute><Confirm /></UserRoute>} />

        {/* 👨‍💼 Admin Protected Routes */}
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>}>
          <Route path="add-admin" element={<AddAdmin />} />
          <Route path="manage" element={<ManageUser />} />
          <Route path="add-project" element={<AddProject />} />
          <Route path="add-question" element={<AddQuestions />} /> 
          <Route path="update-question" element={<GetAllQuestions />} />
          <Route path="/admin/get-projects" element={<GetAllProjects />} />
          {/* Add update-user, delete-user, manage-question routes here */}
        </Route>

        {/* 🏠 Default Fallback Route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

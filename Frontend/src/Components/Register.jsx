import React, { useState } from 'react';
import axiosInstance from "../Security/AxiosIntant";
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    rollno: '',
    phno: '',
    email: '',
    password: '',
    branch: '',
    address: ''
  });

  const [responseMsg, setResponseMsg] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await axiosInstance.post('/auth/save', formData);

    // If successful (201 Created)
    setResponseMsg({ text: '✅ Registration successful!', type: 'success' });

    setTimeout(() => {
      navigate('/login');
    }, 1000);

  } catch (err) {
    // Handle specific server error
    if (err.response) {
      if (err.response.status === 409) {
        setResponseMsg({ text: '❌ Student already exists with this email.', type: 'error' });
      } else if (err.response.status === 500) {
        setResponseMsg({ text: '⚠️ Server error occurred. Please try again later.', type: 'error' });
      } else {
        setResponseMsg({ text: err.response.data || 'Something went wrong.', type: 'error' });
      }
    } else {
      setResponseMsg({ text: '🚫 Network error. Please check your connection.', type: 'error' });
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Register</h2>

        {responseMsg.text && (
          <div
            className={`mb-4 text-sm p-2 rounded-md text-center font-medium ${
              responseMsg.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {responseMsg.text}
          </div>
        )}

        {[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Roll No', name: 'rollno', type: 'text' },
          { label: 'Phone Number', name: 'phno', type: 'tel' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Password', name: 'password', type: 'password' },
          { label: 'Branch', name: 'branch', type: 'text' }
        ].map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block mb-1 text-gray-700 font-medium">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-lg text-white flex justify-center items-center gap-2 font-semibold transition duration-200 ${
            isLoading ? 'bg-blue-900 cursor-not-allowed' : 'bg-blue-600 cursor-pointer hover:bg-blue-800'
          }`}
        >
          {isLoading ? 'Registering...' : 'Register'}
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isModalOpen, setIsModalOpen] = useState(false); // For Add Task modal
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false); // For Sign-Out modal
  const [user, setUser] = useState(""); // Simulate user state (null = not logged in)

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleSignOutModal = () => setIsSignOutModalOpen(!isSignOutModalOpen);
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem("token"); // Example: check for an auth token in localStorage
    const isAuthenticated1 = sessionStorage.getItem("token"); // Example: check for an auth token in sessionStorage

    const userID1: any =
      localStorage.getItem("userId") || sessionStorage.getItem("userId");

    setUserID(userID1);
    const cleanUserID = userID1.slice(1, -1);
    console.log("cleanUserID====", cleanUserID);

    if (isAuthenticated || isAuthenticated1) {
      axios
        .get("https://backend-gilt-gamma.vercel.app/api/users/" + cleanUserID)
        .then((response) => {
          console.log("response====", response.data);
          setUserName(response.data.username);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    setUser("");
    setIsSignOutModalOpen(false);
    window.location.href = "/login";
  };

  const handleAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Validate user ID
    if (!userID) {
      alert("Please log in to add a task.");
      return;
    }

    // Remove surrounding quotes from userID if necessary
    const cleanUserID = userID.slice(1, -1);
    console.log("cleanUserID====", cleanUserID);
    // Collect form data
    const formData = new FormData(event.target as HTMLFormElement);

    try {
      // Send a POST request to the backend API
      const response = await axios.post(
        "https://backend-gilt-gamma.vercel.app/api/tasks",
        {
          title: formData.get("title"),
          description: formData.get("description"),
          status: formData.get("status"),
          priority: formData.get("priority"),
          dueDate: formData.get("dueDate"),
          userid: cleanUserID,
        }
      );

      console.log("Task added successfully:", response.data);

      // Show success message and close modal
      alert("Task added successfully!");
      window.location.reload();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  return (
    <>
      <nav className="bg-gray-200 text-gray-900">
        <div className="container mx-auto h-[70px] px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-xl text-indigo-600 font-bold">Task Manager</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <button
              onClick={toggleModal}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Add Task
            </button>
            {userName ? (
              <span
                className="text-gray-900 font-medium cursor-pointer"
                onClick={toggleSignOutModal}
              >
                {userName}
              </span>
            ) : (
              <a
                href="/login"
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                Login
              </a>
            )}
          </div>

          {/* Hamburger Icon */}
          <button
            className="block md:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-200 space-y-2 px-4 py-3">
            <button
              onClick={toggleModal}
              className="block bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700"
            >
              Add Task
            </button>
            {user ? (
              <span
                className="block text-gray-900 font-medium cursor-pointer"
                onClick={toggleSignOutModal}
              >
                Welcome, {user}
              </span>
            ) : (
              <a
                href="/login"
                className="block bg-gray-900 text-white px-3 py-2 rounded-md hover:bg-gray-800"
              >
                Login
              </a>
            )}
          </div>
        )}
      </nav>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <form onSubmit={handleAddTask}>
              {/* Task Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Task Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter task title"
                  required
                />
              </div>

              {/* Task Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Task Description
                </label>
                <textarea
                  name="description"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter task description"
                  required
                />
              </div>

              {/* Task Status */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Task Priority */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  name="priority"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* Due Date */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-5">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sign-Out Modal */}
      {isSignOutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Sign Out</h2>
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to sign out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={toggleSignOutModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

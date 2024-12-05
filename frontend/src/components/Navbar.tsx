"use client";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [isModalOpen, setIsModalOpen] = useState(false); // For Add Task modal
  const [user, setUser] = useState(null); // Simulate user state (null = not logged in)

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

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
            {user ? (
              <span className="text-gray-900 font-medium">
                Welcome, {user.name}
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
              <span className="block text-gray-900 font-medium">
                Welcome, {user.name}
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
            <form>
              {/* Task Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Task Title
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter task title"
                />
              </div>

              {/* Task Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Task Description
                </label>
                <textarea
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter task description"
                />
              </div>

              {/* Task Status */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* Task Priority */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
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
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  type="button"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  onClick={() => alert("Task added!")}
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

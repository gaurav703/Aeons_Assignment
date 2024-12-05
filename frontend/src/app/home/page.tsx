/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import axios from "axios";

const tasks = [
  {
    id: 1,
    user: "userIdPlaceholder",
    title: "Complete project documentation",
    description:
      "Write detailed documentation for the project including usage, setup, and deployment instructions.",
    status: "Pending",
    priority: "High",
    dueDate: new Date("2024-12-15T00:00:00Z"),
  },
  {
    id: 2,
    user: "userIdPlaceholder",
    title: "Prepare slides for client meeting",
    description:
      "Prepare a presentation with key highlights and updates for the client meeting tomorrow.",
    status: "Pending",
    priority: "Medium",
    dueDate: new Date("2024-12-10T00:00:00Z"),
  },
  {
    id: 3,
    user: "userIdPlaceholder",
    title: "Redesign homepage",
    description:
      "Work on improving the UX of the homepage by making it more user-friendly and responsive.",
    status: "Completed",
    priority: "Medium",
    dueDate: new Date("2024-11-20T00:00:00Z"),
  },
  {
    id: 4,
    user: "userIdPlaceholder",
    title: "Fix bugs in the codebase",
    description:
      "Resolve issues in the existing codebase related to performance and bugs.",
    status: "Pending",
    priority: "Low",
    dueDate: new Date("2024-12-05T00:00:00Z"),
  },
];

export default function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [taskList, setTaskList] = useState([]);
  const router = useRouter();

  const toggleModal = () => setIsOpen(!isOpen);

  useEffect(() => {
    const userId =
      localStorage.getItem("userId") || sessionStorage.getItem("userId");

    if (!userId) {
      router.push("/login");
    }

    const cleanUserID = userId.slice(1, -1);
    console.log("cleanUserID====", cleanUserID);
    // Collect form data

    const fetchTasks = async () => {
      try {
        const resp = await axios.get(
          "http://localhost:5000/api/tasks/user/" + cleanUserID
        );
        setTaskList(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const toggleTaskStatus = (taskId: any) => {
    try {
      console.log(taskId);
      const resp = axios.put("http://localhost:5000/api/tasks/" + taskId, {
        status: "Completed",
      });
      console.log(resp);
      window.location.reload();
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen flex flex-col items-center">
        {/* Page Title */}
        <main className="w-full flex flex-col items-center py-8">
          {taskList.length === 0 ? (
            <div className="text-center text-xl text-gray-700">
              No tasks added yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
              {taskList.map((task) => (
                <div
                  key={task._id}
                  className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
                >
                  <h2 className="text-xl font-semibold text-indigo-600">
                    {task.title}
                  </h2>
                  <p className="text-gray-700 mt-2">{task.description}</p>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Status:{" "}
                      <span
                        className={
                          task.status === "Completed"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }
                      >
                        {task.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Priority:{" "}
                      <span
                        className={
                          task.priority === "High"
                            ? "text-red-600"
                            : task.priority === "Medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }
                      >
                        {task.priority}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Due Date:{" "}
                      <span className="text-gray-800">{task.dueDate}</span>
                    </p>

                    {/* Status Toggle Button */}
                    {task.status !== "Completed" && (
                      <button
                        onClick={() => toggleTaskStatus(task._id)}
                        className={`mt-4 p-2 rounded-lg ${
                          task.status === "Completed"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-yellow-600 hover:bg-yellow-700"
                        } text-white`}
                      >
                        {task.status === "Completed"
                          ? "Mark as Pending"
                          : "Mark as Completed"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

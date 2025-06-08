import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const data = [
    { name: "Jan", users: 30 },
    { name: "Feb", users: 45 },
    { name: "Mar", users: 60 },
    { name: "Apr", users: 20 },
    { name: "May", users: 75 },
];

const kanbanTasks = {
    todo: ["Task 1", "Task 2"],
    inProgress: ["Task 3"],
    done: ["Task 4"]
};

export default function Dashboard() {
    const [theme, setTheme] = useState("light");
    const [tasks, setTasks] = useState(kanbanTasks);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
        document.documentElement.classList.toggle("dark");
    };

    return (
        <div className="p-6 space-y-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {theme === "light" ? "Dark" : "Light"} Mode
                </button>
            </div>

            {/* Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">User Statistics</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="#8884d8" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="users" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Users</h2>
                <table className="w-full table-auto text-left text-gray-700 dark:text-gray-200">
                    <thead>
                        <tr>
                            <th className="border-b p-2">Name</th>
                            <th className="border-b p-2">Email</th>
                            <th className="border-b p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-b p-2">Alice</td>
                            <td className="border-b p-2">alice@example.com</td>
                            <td className="border-b p-2">Active</td>
                        </tr>
                        <tr>
                            <td className="border-b p-2">Bob</td>
                            <td className="border-b p-2">bob@example.com</td>
                            <td className="border-b p-2">Inactive</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Calendar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Calendar</h2>
                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    className="rounded-xl p-2 max-w-sm dark:bg-gray-700"
                />
            </div>

            {/* Kanban Board */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Kanban Board</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(tasks).map(([column, items]) => (
                        <div key={column} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
                            <h3 className="text-lg font-semibold capitalize mb-2 text-gray-900 dark:text-white">
                                {column.replace(/([A-Z])/g, ' $1')}
                            </h3>
                            <ul className="space-y-2">
                                {items.map((item, index) => (
                                    <li key={index} className="bg-white dark:bg-gray-600 text-gray-800 dark:text-white p-2 rounded shadow">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

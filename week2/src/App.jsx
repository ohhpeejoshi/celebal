import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { Moon, Sun } from "lucide-react";

export default function TodoApp() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState("all");
    const [sortAsc, setSortAsc] = useState(true);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const addTask = () => {
        if (!input.trim()) return;
        setTasks([...tasks, { text: input.trim(), completed: false }]);
        setInput("");
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleComplete = (index) => {
        setTasks(
            tasks.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const filteredTasks = tasks
        .filter((task) => {
            if (filter === "completed") return task.completed;
            if (filter === "active") return !task.completed;
            return true;
        })
        .sort((a, b) => {
            if (sortAsc) return a.text.localeCompare(b.text);
            return b.text.localeCompare(a.text);
        });

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-4">
            <div className="max-w-xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">To-Do List</h1>
                    <Switch
                        checked={darkMode}
                        onChange={setDarkMode}
                        className="flex items-center gap-2"
                    >
                        {darkMode ? <Moon /> : <Sun />}
                        <span className="text-sm">{darkMode ? "Dark" : "Light"}</span>
                    </Switch>
                </div>

                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") addTask();
                        }}
                        placeholder="Add a new task..."
                        className="flex-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                    />
                    <button
                        onClick={addTask}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Add
                    </button>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <select
                        onChange={(e) => setFilter(e.target.value)}
                        className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>

                    <button
                        onClick={() => setSortAsc(!sortAsc)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
                    >
                        Sort {sortAsc ? "A-Z" : "Z-A"}
                    </button>
                </div>

                <ul className="space-y-2">
                    {filteredTasks.map((task, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
                        >
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleComplete(index)}
                                />
                                <span className={task.completed ? "line-through opacity-60" : ""}>
                                    {task.text}
                                </span>
                            </div>
                            <button
                                onClick={() => removeTask(index)}
                                className="text-red-500 hover:underline"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

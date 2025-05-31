# React To-Do List

A simple and clean React To-Do List application built using Vite and styled with Tailwind CSS. This app allows users to add, remove, and mark tasks as completed, along with optional filtering, sorting, theme toggling, and persistent localStorage integration.

## 🚀 Features

* Add new tasks with input validation
* Remove tasks
* Mark tasks as completed
* Filter by All / Active / Completed
* Sort tasks alphabetically (A-Z / Z-A)
* Light and dark theme toggle with preference persistence
* Local storage support for saving tasks and theme

## 🛠 Tech Stack

* React (via Vite)
* Tailwind CSS
* Headless UI (for theme switch)
* Lucide React (for icons)

## 📦 Installation

```bash
npm install
npm run dev
```

Make sure you’ve installed these dependencies:

```bash
npm install @headlessui/react lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## ✅ Testing Guidance

1. **Add Task**
   Type a task and press `Enter` or click **Add**. The task should appear below.

2. **Validate Input**
   Try entering an empty or whitespace-only task. It should not be added.

3. **Mark as Completed**
   Use the checkbox to mark a task as done. It should be styled with a line-through.

4. **Remove Task**
   Click **Remove** to delete a task from the list.

5. **Sort Tasks**
   Use the sort button to arrange tasks A-Z or Z-A.

6. **Filter Tasks**
   Use the filter dropdown to show All / Active / Completed tasks.

7. **Theme Toggle**
   Switch between Light and Dark themes using the toggle in the header.

8. **Persistence**
   Reload the page. Tasks and theme preference should persist via localStorage.

## 📁 Folder Structure

```
├── public
│   └── index.html
├── src
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
└── README.md
```

## 📄 License

This project is licensed under the MIT License.

# Markdown Editor - Vite + React + Material-UI

## 📌 Description
This project is a **Markdown editor** built with **React** and **Material-UI**, using **Vite** as the build tool. It allows users to create, edit, and preview Markdown files in real-time, providing a smooth and responsive interface.

## ✨ Key Features
- 📂 **Markdown file management** (create, rename, delete, and reorder)
- ✅ **Automatic file selection** when launching the application
- 🔄 **UUIDs instead of sequential IDs** for better file management
- 🎨 **UI/UX Improvements**
  - The selected file is highlighted with an orange border
  - The "Create New File" button is always fixed at the bottom of the panel
  - Columns have fixed widths and use the full available space
  - The Markdown Editor takes up the full height of its container
  - The editor always starts in **"Show Editor Only"** mode
- 🚀 **Optimised performance with Vite**

## 🚀 How to Run
### 1️⃣ Install Dependencies
```sh
npm install
```

### 2️⃣ Start the Project
```sh
npm run dev
```
The server will start and be available at `http://localhost:5173/` (or another port set by Vite).

## 📂 Project Structure
```
/src
├── components
│   ├── NavigationPanel.jsx  # File navigation panel
│   ├── MarkdownEditor.jsx   # Markdown editor
│   ├── LivePreview.jsx      # Rendered Markdown preview
│
├── App.jsx                 # Main application component
├── theme.js                # Material-UI theme configuration
├── index.jsx               # React entry point
├── vite-env.d.ts           # Global types for Vite

public/
├── index.html              # Main HTML file
```

## 🔧 Potential Future Improvements
- 📌 **Responsive mode for small screens**
- 📂 **Local storage** (persist files in the browser)
- 📄 **Export/import Markdown files**
- 📝 **Support for predefined templates**

---

This project is a practical example of a modern Markdown editor, focusing on usability and performance. 🚀

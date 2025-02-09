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
- 🌙 **Custom Material-UI theme** with a modern and accessible design
- 🚀 **Optimised performance with Vite**
- 🧪 **Unit and functional tests** ensuring core functionalities work reliably

## 🚀 How to Run

### 1️⃣ Install Dependencies

Using **Yarn**:
```sh
yarn install
```

Or using **npm**:
```sh
npm install
```

### 2️⃣ Start the Project

Using **Yarn**:
```sh
yarn dev
```

Or using **npm**:
```sh
npm run dev
```

The server will start and be available at `http://localhost:5173/` (or another port set by Vite).

## 📂 Project Structure

```
/src
├── components
│   ├── NavigationPanel.tsx  # File navigation panel with drag-and-drop
│   ├── MarkdownEditor.jsx   # Markdown editor
│   ├── LivePreview.jsx      # Rendered Markdown preview
│
├── App.jsx                 # Main application component
├── theme.js                # Material-UI theme configuration
├── index.jsx               # React entry point with ThemeProvider
├── vite-env.d.ts           # Global types for Vite

public/
├── index.html              # Main HTML file
```

## 🔧 Potential Future Improvements

- 📌 **Responsive mode for small screens**
- 📂 **Local storage** (persist files in the browser)
- 📄 **Export/import Markdown files**

## 🧪 Testing

The project includes unit and functional tests for core features such as:
- ✅ File creation, deletion, renaming, and selection
- ✅ Content editing and Markdown rendering
- ✅ UI interactions and component behavior

To run the tests, use:
```sh
yarn test
```
Or:
```sh
npm test
```

---

This project is a practical example of a modern Markdown editor, focusing on usability and performance. 🚀


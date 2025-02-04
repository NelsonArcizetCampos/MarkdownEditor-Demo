import React, { useState, useEffect } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { Box, Typography, Paper } from "@mui/material";

const MarkdownEditor = ({ selectedFile, onContentChange }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(selectedFile?.content || "");
  }, [selectedFile]);

  const handleEditorChange = ({ text }) => {
    setContent(text);
    onContentChange(text); // Atualiza o conteúdo em tempo real no App.js
  };

  return (
    <Paper
      elevation={3}
      sx={{
        flexGrow: 1,
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        minHeight: 550,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", fontWeight: 600 }}>
        Markdown Editor
      </Typography>

      <Box sx={{ mt: 2 }}>
        <MdEditor
          value={content}
          style={{ height: "500px" }}
          onChange={handleEditorChange}
          placeholder="Escreva seu conteúdo Markdown aqui..."
        />
      </Box>
    </Paper>
  );
};

export default MarkdownEditor;

import React, { useState, useEffect } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Box, Typography, Paper } from '@mui/material';

const MarkdownEditor = ({ selectedFile, onContentChange }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(selectedFile?.content || '');
  }, [selectedFile]);

  const handleEditorChange = ({ text }) => {
    setContent(text);
    onContentChange(text);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        flexGrow: 1,
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 600 }}>
        Markdown Editor
      </Typography>

      <Box sx={{ flexGrow: 1, mt: 2, height: '100%' }}>
        <MdEditor
          value={content}
          style={{ height: '100%' }}
          renderHTML={(text) => text}
          view={{ menu: true, md: true, html: false }} // "Show Editor Only" ativado
          onChange={handleEditorChange}
          placeholder="Escreva seu conteúdo Markdown aqui..."
        />
      </Box>
    </Paper>
  );
};

export default MarkdownEditor;

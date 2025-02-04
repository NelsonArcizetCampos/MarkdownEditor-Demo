import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaGripLines } from "react-icons/fa";
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Button,
  Paper,
} from "@mui/material";

const NavigationPanel = ({
  files,
  onFileSelect,
  onFileCreate,
  onFileDelete,
  onFileRename,
  onFileReorder,
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const reorderedFiles = [...files];
    const draggedFile = reorderedFiles[draggedIndex];
    reorderedFiles.splice(draggedIndex, 1);
    reorderedFiles.splice(index, 0, draggedFile);

    onFileReorder(reorderedFiles);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        maxWidth: 320,
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", fontWeight: 600 }}>
        Navigation Panel
      </Typography>

      <List sx={{ mt: 2 }}>
        {files.map((file, index) => (
          <ListItem
            key={file.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={() => handleDragOver(index)}
            onDragEnd={handleDragEnd}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
              borderRadius: 1,
              border: "1px solid",
              borderColor: "divider",
              bgcolor:
                draggedIndex === index ? "grey.200" : "background.default",
              cursor: "grab",
              transition: "background-color 0.2s ease",
            }}
          >
            <FaGripLines style={{ marginRight: 10, cursor: "grab" }} />
            <Typography
              variant="body2"
              sx={{
                flexGrow: 1,
                cursor: "pointer",
                "&:hover": { color: "primary.main" },
              }}
              onClick={() => onFileSelect(file)}
            >
              {file.name}
            </Typography>
            <IconButton size="small" onClick={() => onFileRename(file.id)}>
              <FaEdit />
            </IconButton>
            <IconButton size="small" onClick={() => onFileDelete(file.id)}>
              <FaTrash />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        startIcon={<FaPlus />}
        sx={{ mt: 2, textTransform: "none" }}
        onClick={onFileCreate}
      >
        Criar Novo Arquivo
      </Button>
    </Paper>
  );
};

export default NavigationPanel;

import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaGripLines } from 'react-icons/fa';
import {
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Button,
  Paper,
} from '@mui/material';

const NavigationPanel = ({
  files,
  selectedFile, // Novo parâmetro para identificar o arquivo selecionado
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
        backgroundColor: 'background.paper',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // Faz com que o painel ocupe toda a altura disponível
      }}
    >
      <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 600 }}>
        Navigation Panel
      </Typography>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', mt: 2 }}>
        <List>
          {files.map((file, index) => {
            const isSelected = file.id === selectedFile?.id; // Comparação com o arquivo selecionado
            return (
              <ListItem
                key={file.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={() => handleDragOver(index)}
                onDragEnd={handleDragEnd}
                onClick={() => onFileSelect(file)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1,
                  borderRadius: 1,
                  border: isSelected ? '2px solid' : '1px solid',
                  borderColor: isSelected ? 'primary.main' : 'divider', // Borda laranja para o item selecionado
                  bgcolor: 'background.default',
                  cursor: 'pointer',
                  fontWeight: isSelected ? 'bold' : 'normal',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <FaGripLines style={{ marginRight: 10, cursor: 'grab' }} />
                <Typography
                  variant="body2"
                  sx={{
                    flexGrow: 1,
                  }}
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
            );
          })}
        </List>
      </Box>

      {/* Botão fixado no fundo */}
      <Box sx={{ mt: 'auto' }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          sx={{ textTransform: 'none' }}
          onClick={onFileCreate}
        >
          Criar Novo Arquivo
        </Button>
      </Box>
    </Paper>
  );
};

export default NavigationPanel;

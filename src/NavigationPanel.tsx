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

// Tipagem das props
interface File {
  id: string;
  name: string;
  content: string;
}

interface NavigationPanelProps {
  files: File[];
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  onFileCreate: () => void;
  onFileDelete: (id: string) => void;
  onFileRename: (id: string) => void;
  onFileReorder: (reorderedFiles: File[]) => void;
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({
  files,
  selectedFile,
  onFileSelect,
  onFileCreate,
  onFileDelete,
  onFileRename,
  onFileReorder,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number) => {
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
        height: '100%',
      }}
    >
      <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 600 }}>
        Navigation Panel
      </Typography>

      <Box sx={{ flexGrow: 1, overflowY: 'auto', mt: 2 }}>
        <List>
          {files.map((file, index) => {
            const isSelected = file.id === selectedFile?.id;
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
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  bgcolor: 'background.default',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease',
                }}
                aria-current={isSelected ? 'true' : undefined} // Adiciona acessibilidade para seleção
              >
                <FaGripLines style={{ marginRight: 10, cursor: 'grab' }} />
                <Typography
                  variant="body2"
                  sx={{
                    flexGrow: 1,
                    fontWeight: isSelected ? 'bold' : 'normal',
                  }}
                >
                  {file.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => onFileRename(file.id)}
                  aria-label="Editar Arquivo"
                  disableRipple
                >
                  <FaEdit />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onFileDelete(file.id)}
                  aria-label="Excluir Arquivo"
                  disableRipple
                >
                  <FaTrash />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ mt: 'auto' }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          sx={{ textTransform: 'none' }}
          onClick={onFileCreate}
          disableRipple
        >
          Criar Novo Arquivo
        </Button>
      </Box>
    </Paper>
  );
};

export default NavigationPanel;

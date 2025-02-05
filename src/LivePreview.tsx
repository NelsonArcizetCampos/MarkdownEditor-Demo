import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Typography, Paper } from '@mui/material';

// Tipagem para as props
interface File {
  id: string;
  name: string;
  content: string;
}

interface LivePreviewProps {
  selectedFile: File | null;
}

const LivePreview: React.FC<LivePreviewProps> = ({ selectedFile }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        flexGrow: 1,
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
        minHeight: 550,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 600 }}>
        Live Preview
      </Typography>

      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        {!selectedFile ? (
          <Typography variant="body1" color="text.secondary">
            Selecione um arquivo para visualizar o conteúdo.
          </Typography>
        ) : (
          <ReactMarkdown>{selectedFile.content}</ReactMarkdown>
        )}
      </Box>
    </Paper>
  );
};

export default LivePreview;

import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import NavigationPanel from "./NavigationPanel";
import MarkdownEditor from "./MarkdownEditor";
import LivePreview from "./LivePreview";
import { Box } from "@mui/material";

const App = () => {
  const [files, setFiles] = useState([
    {
      id: uuid(),
      name: "Arquivo1.md",
      content: "# Título 1\nConteúdo do arquivo 1.",
    },
    {
      id: uuid(),
      name: "Arquivo2.md",
      content: "# Título 2\nConteúdo do arquivo 2.",
    },
  ]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (files.length > 0 && !selectedFile) {
      setSelectedFile(files[0]);
    } else if (files.length === 0) {
      setSelectedFile(null);
    }
  }, [files]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleFileCreate = () => {
    const newFile = {
      id: uuid(),
      name: `NovoArquivo${files.length + 1}.md`,
      content: "",
    };
    setFiles([...files, newFile]);
    setSelectedFile(newFile);
  };

  const handleFileDelete = (id) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
    if (selectedFile?.id === id) {
      setSelectedFile(updatedFiles.length > 0 ? updatedFiles[0] : null);
    }
  };

  const handleFileRename = (id) => {
    const newName = prompt("Novo nome do arquivo:");
    if (newName) {
      setFiles(
        files.map((file) =>
          file.id === id ? { ...file, name: newName } : file
        )
      );
    }
  };

  const handleFileReorder = (reorderedFiles) => {
    setFiles(reorderedFiles);
  };

  const handleContentChange = (content) => {
    if (selectedFile) {
      const updatedFile = { ...selectedFile, content };
      setSelectedFile(updatedFile);
      setFiles(
        files.map((file) => (file.id === selectedFile.id ? updatedFile : file))
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        padding: 2,
        maxWidth: "1600px",
        margin: "0 auto",
        gap: 2,
        overflow: "hidden",

        // Especificação de largura fixa para os elementos
        "& > *:nth-of-type(1)": { width: "300px", flexShrink: 0 }, // NavigationPanel fixo
        "& > *:nth-of-type(2)": { flexGrow: 1, width: "50%" }, // MarkdownEditor
        "& > *:nth-of-type(3)": { flexGrow: 1, width: "50%" }, // LivePreview
      }}
    >
      <NavigationPanel
        files={files}
        selectedFile={selectedFile}
        onFileSelect={handleFileSelect}
        onFileCreate={handleFileCreate}
        onFileDelete={handleFileDelete}
        onFileRename={handleFileRename}
        onFileReorder={handleFileReorder}
      />
      {selectedFile ? (
        <>
          <MarkdownEditor
            selectedFile={selectedFile}
            onContentChange={handleContentChange}
          />
          <LivePreview selectedFile={selectedFile} />
        </>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "550px",
            bgcolor: "background.paper",
            borderRadius: 2,
            textAlign: "center",
            p: 3,
          }}
        >
          <p>Nenhum arquivo disponível. Crie um novo arquivo para começar.</p>
        </Box>
      )}
    </Box>
  );
};

export default App;

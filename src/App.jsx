import React, { useState } from "react";
import NavigationPanel from "./NavigationPanel";
import MarkdownEditor from "./MarkdownEditor";
import LivePreview from "./LivePreview";
import { Box } from "@mui/material"; // Importando o Box do Material UI

const App = () => {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Arquivo1.md",
      content: "# Título 1\nConteúdo do arquivo 1.",
    },
    {
      id: 2,
      name: "Arquivo2.md",
      content: "# Título 2\nConteúdo do arquivo 2.",
    },
  ]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleFileCreate = () => {
    const newFile = {
      id: files.length + 1,
      name: `NovoArquivo${files.length + 1}.md`,
      content: "",
    };
    setFiles([...files, newFile]);
  };

  const handleFileDelete = (id) => {
    setFiles(files.filter((file) => file.id !== id));
    if (selectedFile?.id === id) {
      setSelectedFile(null);
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
      const updatedFile = { ...selectedFile, content }; // Atualiza o conteúdo do arquivo
      setSelectedFile(updatedFile); // Atualiza imediatamente o arquivo selecionado
      setFiles(
        files.map((file) => (file.id === selectedFile.id ? updatedFile : file))
      ); // Atualiza a lista de arquivos
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: 3,
        maxWidth: "1200px",
        margin: "0 auto",
        flexDirection: { xs: "column", md: "row" }, // Responsividade
        gap: 2, // Espaçamento entre os elementos
      }}
    >
      <NavigationPanel
        files={files}
        onFileSelect={handleFileSelect}
        onFileCreate={handleFileCreate}
        onFileDelete={handleFileDelete}
        onFileRename={handleFileRename}
        onFileReorder={handleFileReorder}
      />
      <MarkdownEditor
        selectedFile={selectedFile}
        onContentChange={handleContentChange}
      />
      <LivePreview selectedFile={selectedFile} />
    </Box>
  );
};

export default App;

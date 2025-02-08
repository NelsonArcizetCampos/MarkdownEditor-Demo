import { useState } from 'react';
import { v4 as uuid } from 'uuid';

// Definição da tipagem para um arquivo
export interface File {
  id: string;
  name: string;
  content: string;
}

const useFiles = () => {
  // Estado para armazenar os arquivos
  const [files, setFiles] = useState<File[]>([]);
  // Estado para armazenar o arquivo selecionado
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Função para selecionar um arquivo
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  // Função para criar um novo arquivo
  const handleFileCreate = () => {
    const newFile: File = {
      id: uuid(),
      name: `NovoArquivo${files.length + 1}.md`,
      content: '',
    };
    // Atualiza o estado de 'files' de forma segura, considerando a versão mais recente do estado
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, newFile];
      setSelectedFile(newFile); // Seleciona automaticamente o arquivo recém-criado
      return updatedFiles;
    });
  };

  // Função para excluir um arquivo
  const handleFileDelete = (id: string) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
    // Se o arquivo excluído for o selecionado, seleciona o próximo ou null
    if (selectedFile?.id === id) {
      setSelectedFile(updatedFiles.length > 0 ? updatedFiles[0] : null);
    }
  };

  // Função para renomear um arquivo
  const handleFileRename = (id: string) => {
    const newName = prompt('Novo nome do arquivo:');
    if (newName) {
      setFiles(
        files.map((file) =>
          file.id === id ? { ...file, name: newName } : file
        )
      );
    }
  };

  // Função para reordenar os arquivos
  const handleFileReorder = (reorderedFiles: File[]) => {
    setFiles(reorderedFiles);
  };

  // Função para atualizar o conteúdo de um arquivo
  const handleContentChange = (content: string) => {
    if (selectedFile) {
      const updatedFile = { ...selectedFile, content };
      setSelectedFile(updatedFile);
      setFiles(
        files.map((file) => (file.id === selectedFile.id ? updatedFile : file))
      );
    }
  };

  // Retorno das funções e estados para serem usados nos componentes
  return {
    files,
    selectedFile,
    handleFileSelect,
    handleFileCreate,
    handleFileDelete,
    handleFileRename,
    handleFileReorder,
    handleContentChange,
  };
};

export default useFiles;

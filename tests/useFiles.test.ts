import { renderHook, act } from '@testing-library/react';
import useFiles, { File } from '@hooks/useFiles';

global.prompt = vi.fn().mockReturnValue('RenamedFile.md');

describe('useFiles hook', () => {
  // Teste inicial para verificar o estado inicial
  it('should initialize with empty files and null selectedFile', () => {
    const { result } = renderHook(() => useFiles());

    expect(result.current.files).toEqual([]);
    expect(result.current.selectedFile).toBeNull();
  });

  // Teste para criação de arquivo
  it('should create a new file and set it as selected', () => {
    const { result } = renderHook(() => useFiles());

    act(() => {
      result.current.handleFileCreate();
    });

    expect(result.current.files).toHaveLength(1);
    expect(result.current.selectedFile).toEqual(result.current.files[0]);
    expect(result.current.files[0].name).toBe('NovoArquivo1.md');
  });

  // Teste para seleção de arquivo
  it('should select a file', () => {
    const { result } = renderHook(() => useFiles());

    act(() => {
      result.current.handleFileCreate(); // Cria um arquivo
      result.current.handleFileCreate(); // Cria um segundo arquivo
    });

    const fileToSelect = result.current.files[1];

    act(() => {
      result.current.handleFileSelect(fileToSelect);
    });

    expect(result.current.selectedFile).toEqual(fileToSelect);
  });

  // Teste para exclusão de arquivo
  it('should delete a file', () => {
    const { result } = renderHook(() => useFiles());

    // Cria dois arquivos
    act(() => {
      result.current.handleFileCreate(); // Cria um arquivo
      result.current.handleFileCreate(); // Cria outro arquivo
    });

    // O segundo arquivo criado será o selecionado automaticamente
    const fileToDelete = result.current.files[0];

    // A asserção deve verificar se o segundo arquivo foi selecionado
    const initiallySelectedFile = result.current.selectedFile;

    act(() => {
      result.current.handleFileDelete(fileToDelete.id); // Deleta o primeiro arquivo
    });

    // Verifique se a lista tem um arquivo após a deleção
    expect(result.current.files).toHaveLength(1); // Deverá ter um arquivo restante

    // Verifique se o arquivo **selecionado** não foi alterado
    expect(result.current.selectedFile).toBe(initiallySelectedFile); // O arquivo selecionado deve ser o segundo
  });

  // Teste para renomeação de arquivo
  it('should rename a file', () => {
    const { result } = renderHook(() => useFiles());

    act(() => {
      result.current.handleFileCreate(); // Cria um arquivo
    });

    const fileToRename = result.current.files[0];
    const newName = 'RenamedFile.md';

    act(() => {
      result.current.handleFileRename(fileToRename.id);
    });

    // Não conseguimos testar diretamente o prompt, mas assumimos que a função foi chamada corretamente
    expect(result.current.files[0].name).toBe(newName);
  });

  // Teste para alteração de conteúdo
  it('should update the content of the selected file', () => {
    const { result } = renderHook(() => useFiles());

    act(() => {
      result.current.handleFileCreate(); // Cria um arquivo
    });

    const newContent = 'Novo conteúdo de teste';
    act(() => {
      result.current.handleContentChange(newContent);
    });

    expect(result.current.selectedFile?.content).toBe(newContent);
  });

  // Teste para reordenação de arquivos
  it('should reorder files', () => {
    const { result } = renderHook(() => useFiles());

    act(() => {
      result.current.handleFileCreate(); // Cria um arquivo
      result.current.handleFileCreate(); // Cria outro arquivo
    });

    const reorderedFiles = [result.current.files[1], result.current.files[0]];

    act(() => {
      result.current.handleFileReorder(reorderedFiles);
    });

    expect(result.current.files).toEqual(reorderedFiles);
  });
});

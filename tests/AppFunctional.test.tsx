import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';
import '@testing-library/jest-dom';

describe('App functional tests', () => {
  it('should create a new file', async () => {
    render(<App />);

    userEvent.click(screen.getByText('Criar Novo Arquivo'));

    const newFile = await screen.findByText('NovoArquivo1.md');
    expect(newFile).toBeInTheDocument();
  });

  it('should delete a file', async () => {
    render(<App />);

    // Create two files
    const createButton = screen.getByText('Criar Novo Arquivo');
    userEvent.click(createButton); // Create the first file
    userEvent.click(createButton); // Create the second file

    // Wait until both files appear on screen
    const newFile1 = await screen.findByText('NovoArquivo1.md');
    const newFile2 = await screen.findByText('NovoArquivo2.md');

    expect(newFile1).toBeInTheDocument();
    expect(newFile2).toBeInTheDocument();

    // Click to delete the first file
    const deleteButton = screen.getAllByLabelText('Excluir Arquivo')[0];
    userEvent.click(deleteButton);

    // Wait until the deleted file is removed from the DOM
    await waitFor(() => {
      expect(screen.queryByText('NovoArquivo1.md')).not.toBeInTheDocument();
    });

    // Confirm that the second file is still present
    expect(newFile2).toBeInTheDocument();
  });

  it('should select a file', async () => {
    render(<App />);

    // Create two files
    const createButton = screen.getByText('Criar Novo Arquivo');
    userEvent.click(createButton);
    userEvent.click(createButton);

    // Wait for files to appear on screen
    const newFile1 = await screen.findByText('NovoArquivo1.md');
    const newFile2 = await screen.findByText('NovoArquivo2.md');

    expect(newFile1).toBeInTheDocument();
    expect(newFile2).toBeInTheDocument();

    // Select the first file
    userEvent.click(newFile1);

    // Wait until the first file is marked as selected (aria-current="true")
    await waitFor(() => {
      expect(newFile1.closest('li')).toHaveAttribute('aria-current', 'true');
    });

    // Select the second file
    userEvent.click(newFile2);

    // Verify that the second file is selected and the first is not
    await waitFor(() => {
      expect(newFile2.closest('li')).toHaveAttribute('aria-current', 'true');
      expect(newFile1.closest('li')).not.toHaveAttribute('aria-current');
    });
  });

  it('should rename a file', async () => {
    render(<App />);

    // Create two files
    const createButton = screen.getByText('Criar Novo Arquivo');
    userEvent.click(createButton);
    userEvent.click(createButton);

    // Wait for files to appear on screen
    const newFile1 = await screen.findByText('NovoArquivo1.md');
    const newFile2 = await screen.findByText('NovoArquivo2.md');

    expect(newFile1).toBeInTheDocument();
    expect(newFile2).toBeInTheDocument();

    // Simulate entering a new name via prompt
    const newName = 'ArquivoRenomeado.md';
    vi.spyOn(window, 'prompt').mockReturnValue(newName);

    // Click on the edit button for the first file
    const renameButton = screen.getAllByLabelText('Editar Arquivo')[0];
    userEvent.click(renameButton);

    // Wait until the old name is replaced with the new name
    await waitFor(() => {
      expect(screen.queryByText('NovoArquivo1.md')).not.toBeInTheDocument();
      expect(screen.getByText(newName)).toBeInTheDocument();
    });
  });

  it('should update file content and reflect in LivePreview', async () => {
    render(<App />);

    // Create a file
    const createButton = screen.getByText('Criar Novo Arquivo');
    userEvent.click(createButton);

    const newFile = await screen.findByText('NovoArquivo1.md');
    expect(newFile).toBeInTheDocument();

    // Simulate typing in the MarkdownEditor
    const editor = screen.getByRole('textbox'); // Confirms it's a <textarea>
    const newText = 'Este é um teste de edição.';
    await userEvent.type(editor, newText);

    // Find the LivePreview container
    const previewContainer = screen
      .getByRole('heading', { level: 6, name: 'Live Preview' })
      .closest('div');

    // Verify the content is updated in the LivePreview
    await waitFor(() => {
      expect(within(previewContainer).getByText(newText)).toBeInTheDocument();
    });
  });

  it('should retain file content when switching between files', async () => {
    render(<App />);

    // Create two files
    const createButton = screen.getByText('Criar Novo Arquivo');
    userEvent.click(createButton);
    userEvent.click(createButton);

    // Wait for both files to appear on screen
    const newFile1 = await screen.findByText('NovoArquivo1.md');
    const newFile2 = await screen.findByText('NovoArquivo2.md');

    expect(newFile1).toBeInTheDocument();
    expect(newFile2).toBeInTheDocument();

    // Select the first file and type some content
    userEvent.click(newFile1);
    const editor = screen.getByRole('textbox');
    const firstFileContent = 'Conteúdo do primeiro arquivo';
    await userEvent.type(editor, firstFileContent);

    // Switch to the second file
    userEvent.click(newFile2);
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    // Switch back to the first file
    userEvent.click(newFile1);
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue(firstFileContent);
    });
  });
});

import { useState, useCallback } from 'react';

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
}

interface UseFileSystemReturn {
  files: FileNode[];
  currentFile: FileNode | null;
  createFile: (name: string, parentId?: string) => void;
  createFolder: (name: string, parentId?: string) => void;
  deleteNode: (id: string) => void;
  renameNode: (id: string, newName: string) => void;
  updateFileContent: (id: string, content: string) => void;
  selectFile: (id: string) => void;
}

export function useFileSystem(): UseFileSystemReturn {
  const [files, setFiles] = useState<FileNode[]>([
    {
      id: '1',
      name: 'src',
      type: 'folder',
      children: [
        {
          id: '2',
          name: 'index.js',
          type: 'file',
          content: '// Write your code here\nconsole.log("Hello, Vive Code!");',
        },
        {
          id: '3',
          name: 'styles.css',
          type: 'file',
          content: '/* Your styles here */',
        },
      ],
    },
    {
      id: '4',
      name: 'README.md',
      type: 'file',
      content: '# My Project\n\nWelcome to my project!',
    },
  ]);
  const [currentFile, setCurrentFile] = useState<FileNode | null>(null);

  const findNodeById = (nodes: FileNode[], id: string): FileNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNodeById(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const createFile = useCallback((name: string, parentId?: string) => {
    const newFile: FileNode = {
      id: Date.now().toString(),
      name,
      type: 'file',
      content: '',
    };

    setFiles((prev) => {
      if (!parentId) {
        return [...prev, newFile];
      }

      const addToParent = (nodes: FileNode[]): FileNode[] => {
        return nodes.map((node) => {
          if (node.id === parentId && node.type === 'folder') {
            return {
              ...node,
              children: [...(node.children || []), newFile],
            };
          }
          if (node.children) {
            return { ...node, children: addToParent(node.children) };
          }
          return node;
        });
      };

      return addToParent(prev);
    });
  }, []);

  const createFolder = useCallback((name: string, parentId?: string) => {
    const newFolder: FileNode = {
      id: Date.now().toString(),
      name,
      type: 'folder',
      children: [],
    };

    setFiles((prev) => {
      if (!parentId) {
        return [...prev, newFolder];
      }

      const addToParent = (nodes: FileNode[]): FileNode[] => {
        return nodes.map((node) => {
          if (node.id === parentId && node.type === 'folder') {
            return {
              ...node,
              children: [...(node.children || []), newFolder],
            };
          }
          if (node.children) {
            return { ...node, children: addToParent(node.children) };
          }
          return node;
        });
      };

      return addToParent(prev);
    });
  }, []);

  const deleteNode = useCallback(
    (id: string) => {
      setFiles((prev) => {
        const removeNode = (nodes: FileNode[]): FileNode[] => {
          return nodes
            .filter((node) => node.id !== id)
            .map((node) => {
              if (node.children) {
                return { ...node, children: removeNode(node.children) };
              }
              return node;
            });
        };
        return removeNode(prev);
      });

      if (currentFile?.id === id) {
        setCurrentFile(null);
      }
    },
    [currentFile]
  );

  const renameNode = useCallback((id: string, newName: string) => {
    setFiles((prev) => {
      const rename = (nodes: FileNode[]): FileNode[] => {
        return nodes.map((node) => {
          if (node.id === id) {
            return { ...node, name: newName };
          }
          if (node.children) {
            return { ...node, children: rename(node.children) };
          }
          return node;
        });
      };
      return rename(prev);
    });
  }, []);

  const updateFileContent = useCallback(
    (id: string, content: string) => {
      setFiles((prev) => {
        const update = (nodes: FileNode[]): FileNode[] => {
          return nodes.map((node) => {
            if (node.id === id && node.type === 'file') {
              return { ...node, content };
            }
            if (node.children) {
              return { ...node, children: update(node.children) };
            }
            return node;
          });
        };
        return update(prev);
      });

      if (currentFile?.id === id) {
        setCurrentFile((prev) => (prev ? { ...prev, content } : null));
      }
    },
    [currentFile]
  );

  const selectFile = useCallback(
    (id: string) => {
      const file = findNodeById(files, id);
      if (file && file.type === 'file') {
        setCurrentFile(file);
      }
    },
    [files]
  );

  return {
    files,
    currentFile,
    createFile,
    createFolder,
    deleteNode,
    renameNode,
    updateFileContent,
    selectFile,
  };
}

import { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  FolderOpen,
  Plus,
  Trash2,
  Edit2,
} from 'lucide-react';
import { FileNode } from '../hooks/useFileSystem';

interface FileExplorerProps {
  files: FileNode[];
  currentFileId?: string;
  onSelectFile: (id: string) => void;
  onCreateFile: (name: string, parentId?: string) => void;
  onCreateFolder: (name: string, parentId?: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, newName: string) => void;
}

export function FileExplorer({
  files,
  currentFileId,
  onSelectFile,
  onCreateFile,
  onCreateFolder,
  onDelete,
  onRename,
}: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['1']));
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    nodeId: string;
    nodeType: 'file' | 'folder';
  } | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleContextMenu = (e: React.MouseEvent, node: FileNode) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, nodeId: node.id, nodeType: node.type });
  };

  const handleNewFile = () => {
    if (!contextMenu) return;
    const name = prompt('Enter file name:');
    if (name) {
      const parentId = contextMenu.nodeType === 'folder' ? contextMenu.nodeId : undefined;
      onCreateFile(name, parentId);
    }
    setContextMenu(null);
  };

  const handleNewFolder = () => {
    if (!contextMenu) return;
    const name = prompt('Enter folder name:');
    if (name) {
      const parentId = contextMenu.nodeType === 'folder' ? contextMenu.nodeId : undefined;
      onCreateFolder(name, parentId);
    }
    setContextMenu(null);
  };

  const handleDelete = () => {
    if (!contextMenu) return;
    if (confirm(`Are you sure you want to delete this ${contextMenu.nodeType}?`)) {
      onDelete(contextMenu.nodeId);
    }
    setContextMenu(null);
  };

  const startRename = () => {
    if (!contextMenu) return;
    setRenamingId(contextMenu.nodeId);
    setContextMenu(null);
  };

  const finishRename = (nodeId: string) => {
    if (newName.trim()) {
      onRename(nodeId, newName);
    }
    setRenamingId(null);
    setNewName('');
  };

  const renderNode = (node: FileNode, depth: number = 0) => {
    const isExpanded = expandedFolders.has(node.id);
    const isSelected = node.id === currentFileId;
    const isRenaming = renamingId === node.id;

    return (
      <div key={node.id}>
        <div
          className={`flex items-center px-2 py-1 hover:bg-gray-700 cursor-pointer ${
            isSelected ? 'bg-gray-700' : ''
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.id);
            } else {
              onSelectFile(node.id);
            }
          }}
          onContextMenu={(e) => handleContextMenu(e, node)}
        >
          {node.type === 'folder' && (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-400 mr-1" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400 mr-1" />
              )}
              {isExpanded ? (
                <FolderOpen className="w-4 h-4 text-blue-400 mr-2" />
              ) : (
                <Folder className="w-4 h-4 text-blue-400 mr-2" />
              )}
            </>
          )}
          {node.type === 'file' && <File className="w-4 h-4 text-gray-400 mr-2 ml-5" />}
          
          {isRenaming ? (
            <input
              type="text"
              defaultValue={node.name}
              className="bg-gray-800 text-white px-1 rounded outline-none"
              autoFocus
              onChange={(e) => setNewName(e.target.value)}
              onBlur={() => finishRename(node.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  finishRename(node.id);
                } else if (e.key === 'Escape') {
                  setRenamingId(null);
                  setNewName('');
                }
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="text-sm text-gray-300">{node.name}</span>
          )}
        </div>

        {node.type === 'folder' && isExpanded && node.children && (
          <div>{node.children.map((child) => renderNode(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-gray-800 text-white overflow-y-auto">
      <div className="p-2 border-b border-gray-700 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Files</h3>
        <div className="flex space-x-1">
          <button
            className="p-1 hover:bg-gray-700 rounded"
            onClick={() => onCreateFile(prompt('Enter file name:') || 'newfile.txt')}
            title="New File"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="py-2">{files.map((node) => renderNode(node))}</div>

      {contextMenu && (
        <>
          <div
            className="fixed inset-0"
            onClick={() => setContextMenu(null)}
          />
          <div
            className="fixed bg-gray-800 border border-gray-700 rounded shadow-lg py-1 z-50"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            {contextMenu.nodeType === 'folder' && (
              <>
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center"
                  onClick={handleNewFile}
                >
                  <File className="w-4 h-4 mr-2" /> New File
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center"
                  onClick={handleNewFolder}
                >
                  <Folder className="w-4 h-4 mr-2" /> New Folder
                </button>
              </>
            )}
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center"
              onClick={startRename}
            >
              <Edit2 className="w-4 h-4 mr-2" /> Rename
            </button>
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 text-red-400 flex items-center"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

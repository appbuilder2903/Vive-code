import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Play, Save, Download, Settings, Users, MessageSquare, FileText } from 'lucide-react';
import { Logo } from '../components/Logo';
import { FileExplorer } from '../components/FileExplorer';
import { useFileSystem } from '../hooks/useFileSystem';

export function ImprovedEditorPage() {
  const { projectId } = useParams();
  const {
    files,
    currentFile,
    createFile,
    createFolder,
    deleteNode,
    renameNode,
    updateFileContent,
    selectFile,
  } = useFileSystem();

  const [output, setOutput] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    if (unsavedChanges && currentFile) {
      const timer = setTimeout(() => {
        // Simulate auto-save
        console.log('Auto-saving...', currentFile.name);
        setUnsavedChanges(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [unsavedChanges, currentFile]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      // Ctrl/Cmd + Enter to run
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFile]);

  const handleRunCode = () => {
    if (!currentFile) {
      setOutput('No file selected');
      return;
    }
    
    setOutput(`Running ${currentFile.name}...\n> Hello, Vive Code!\n> Code execution completed.`);
  };

  const handleSave = () => {
    if (currentFile) {
      console.log('Saving file:', currentFile.name);
      setUnsavedChanges(false);
    }
  };

  const handleCodeChange = useCallback(
    (value: string | undefined) => {
      if (currentFile && value !== undefined) {
        updateFileContent(currentFile.id, value);
        setUnsavedChanges(true);
      }
    },
    [currentFile, updateFileContent]
  );

  const getLanguage = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      py: 'python',
      rb: 'ruby',
      go: 'go',
      rs: 'rust',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      cs: 'csharp',
      php: 'php',
      html: 'html',
      css: 'css',
      json: 'json',
      md: 'markdown',
      yml: 'yaml',
      yaml: 'yaml',
    };
    return languageMap[ext || ''] || 'plaintext';
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <Logo size="sm" withText={false} />
          </Link>
          <h2 className="text-white font-semibold">Project {projectId}</h2>
          {currentFile && (
            <>
              <span className="text-gray-500">›</span>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">{currentFile.name}</span>
                {unsavedChanges && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full" title="Unsaved changes" />
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="p-2 hover:bg-gray-700 rounded transition"
            title="Collaborators"
          >
            <Users className="w-5 h-5 text-gray-300" />
          </button>
          <button
            className="p-2 hover:bg-gray-700 rounded transition"
            title="Chat"
          >
            <MessageSquare className="w-5 h-5 text-gray-300" />
          </button>
          <button
            className="p-2 hover:bg-gray-700 rounded transition"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-gray-300" />
          </button>
          <button
            onClick={handleSave}
            className="p-2 hover:bg-gray-700 rounded transition"
            title="Save (Ctrl/Cmd+S)"
          >
            <Save className="w-5 h-5 text-gray-300" />
          </button>
          <button
            onClick={handleRunCode}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            title="Run (Ctrl/Cmd+Enter)"
          >
            <Play className="w-4 h-4" />
            <span>Run</span>
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer */}
        <div className="w-64 border-r border-gray-700">
          <FileExplorer
            files={files}
            currentFileId={currentFile?.id}
            onSelectFile={selectFile}
            onCreateFile={createFile}
            onCreateFolder={createFolder}
            onDelete={deleteNode}
            onRename={renameNode}
          />
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          {currentFile ? (
            <>
              <div className="flex-1">
                <Editor
                  height="100%"
                  language={getLanguage(currentFile.name)}
                  theme="vs-dark"
                  value={currentFile.content || ''}
                  onChange={handleCodeChange}
                  options={{
                    fontSize: 14,
                    minimap: { enabled: true },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: 'on',
                    formatOnPaste: true,
                    formatOnType: true,
                  }}
                />
              </div>

              {/* Output Panel */}
              <div className="h-48 bg-gray-950 border-t border-gray-700 p-4 overflow-auto">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold text-sm">Output</h3>
                  <button
                    className="text-gray-400 hover:text-white text-xs"
                    onClick={() => setOutput('')}
                  >
                    Clear
                  </button>
                </div>
                <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                  {output || 'Click "Run" to execute your code'}
                </pre>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select a file to start editing</p>
                <p className="text-sm mt-2">or create a new one</p>
              </div>
            </div>
          )}
        </div>

        {/* AI Assistant Panel */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
          <h3 className="text-white font-semibold mb-4">AI Assistant</h3>
          <div className="space-y-4">
            <textarea
              className="w-full h-32 bg-gray-900 text-white p-3 rounded border border-gray-700 focus:border-blue-500 outline-none resize-none"
              placeholder="Ask AI to help with your code..."
            />
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Ask AI
            </button>
            <div className="text-sm text-gray-400 space-y-1">
              <p>Providers: OpenAI, Gemini, Perplexity</p>
              <p>Prompts used: 0 / 1000 this week</p>
            </div>
            <div className="border-t border-gray-700 pt-4">
              <h4 className="text-white text-sm font-semibold mb-2">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 bg-gray-900 hover:bg-gray-700 rounded text-sm text-gray-300">
                  Explain selected code
                </button>
                <button className="w-full text-left px-3 py-2 bg-gray-900 hover:bg-gray-700 rounded text-sm text-gray-300">
                  Find bugs
                </button>
                <button className="w-full text-left px-3 py-2 bg-gray-900 hover:bg-gray-700 rounded text-sm text-gray-300">
                  Optimize code
                </button>
                <button className="w-full text-left px-3 py-2 bg-gray-900 hover:bg-gray-700 rounded text-sm text-gray-300">
                  Generate tests
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

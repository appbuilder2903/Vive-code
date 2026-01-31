import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Play, Save, Download, Settings, Users, MessageSquare } from 'lucide-react';

export function EditorPage() {
  const { projectId } = useParams();
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, Vive Code!");');
  const [output, setOutput] = useState('');

  const handleRunCode = () => {
    setOutput('Running code...\n> Hello, Vive Code!');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <h2 className="text-white font-semibold">Project {projectId}</h2>
          <span className="text-gray-400 text-sm">index.js</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-700 rounded transition">
            <Users className="w-5 h-5 text-gray-300" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded transition">
            <MessageSquare className="w-5 h-5 text-gray-300" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded transition">
            <Settings className="w-5 h-5 text-gray-300" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded transition">
            <Save className="w-5 h-5 text-gray-300" />
          </button>
          <button
            onClick={handleRunCode}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            <Play className="w-4 h-4" />
            <span>Run</span>
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex">
        {/* File Explorer */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
          <h3 className="text-white font-semibold mb-4">Files</h3>
          <div className="space-y-2">
            <div className="text-gray-300 hover:bg-gray-700 px-2 py-1 rounded cursor-pointer">
              📄 index.js
            </div>
            <div className="text-gray-300 hover:bg-gray-700 px-2 py-1 rounded cursor-pointer">
              📄 package.json
            </div>
            <div className="text-gray-300 hover:bg-gray-700 px-2 py-1 rounded cursor-pointer">
              📄 README.md
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                fontSize: 14,
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          {/* Output Panel */}
          <div className="h-48 bg-gray-950 border-t border-gray-700 p-4 overflow-auto">
            <h3 className="text-white font-semibold mb-2">Output</h3>
            <pre className="text-green-400 text-sm font-mono">{output}</pre>
          </div>
        </div>

        {/* AI Assistant Panel */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
          <h3 className="text-white font-semibold mb-4">AI Assistant</h3>
          <div className="space-y-4">
            <textarea
              className="w-full h-32 bg-gray-900 text-white p-3 rounded border border-gray-700 focus:border-blue-500 outline-none"
              placeholder="Ask AI to help with your code..."
            />
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Ask AI
            </button>
            <div className="text-sm text-gray-400">
              <p>Providers: OpenAI, Gemini, Perplexity</p>
              <p>Prompts used: 0 / 1000 this week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

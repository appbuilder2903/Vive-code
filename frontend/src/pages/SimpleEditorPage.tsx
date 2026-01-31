import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Sparkles, Play, Share2, HelpCircle, MessageSquare, Eye, Code, Wand2 } from 'lucide-react';
import { Logo } from '../components/Logo';

export function SimpleEditorPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialPrompt = searchParams.get('prompt') || '';

  const [showPreview, setShowPreview] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; message: string }>>([]);
  const [isThinking, setIsThinking] = useState(false);

  // Simulated generated code based on prompt
  const [generatedCode, setGeneratedCode] = useState({
    html: `<!DOCTYPE html>
<html>
<head>
    <title>My Project</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        h1 {
            color: #333;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 Your Project is Ready!</h1>
        <p>This is your generated project. You can modify it by asking the AI!</p>
        <button onclick="alert('Hello!')">Click Me!</button>
    </div>
</body>
</html>`,
  });

  useEffect(() => {
    if (initialPrompt) {
      setChatHistory([
        {
          role: 'assistant',
          message: `Great! I've created "${initialPrompt}" for you. Your project is ready to use! Try clicking the button or ask me to make changes.`,
        },
      ]);
    }
  }, [initialPrompt]);

  const handleAskAI = async () => {
    if (!aiMessage.trim()) return;

    const userMessage = aiMessage;
    setAiMessage('');
    setChatHistory((prev) => [...prev, { role: 'user', message: userMessage }]);
    setIsThinking(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I've updated your project! The changes are now visible in the preview.",
        "Done! I've modified the code as you requested. Check out the preview!",
        "Great idea! I've implemented that change for you.",
        "All set! Your project has been updated. Want me to add anything else?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setChatHistory((prev) => [...prev, { role: 'assistant', message: randomResponse }]);
      setIsThinking(false);
    }, 1500);
  };

  const handleRun = () => {
    setShowPreview(true);
  };

  const handleShare = () => {
    alert('Your project link: https://vive-code.app/project/abc123\n\nLink copied to clipboard! 🎉');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Simple Mode</span> • {initialPrompt || 'My Project'}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRun}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 font-semibold"
            >
              <Play className="w-4 h-4" />
              Run
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-semibold"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>

            <button
              onClick={() => navigate('/simple')}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              New Project
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Preview/Code */}
        <div className="flex-1 flex flex-col">
          {/* View Toggle */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowPreview(true);
                  setShowCode(false);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                  showPreview && !showCode
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>

              <button
                onClick={() => {
                  setShowCode(true);
                  setShowPreview(false);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                  showCode && !showPreview
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Code className="w-4 h-4" />
                View Code
              </button>

              <button
                onClick={() => {
                  setShowPreview(true);
                  setShowCode(true);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  showCode && showPreview
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Split View
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Preview */}
            {showPreview && (
              <div className={`${showCode ? 'w-1/2' : 'w-full'} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700`}>
                <iframe
                  srcDoc={generatedCode.html}
                  className="w-full h-full border-0"
                  title="Preview"
                  sandbox="allow-scripts"
                />
              </div>
            )}

            {/* Code View */}
            {showCode && (
              <div className={`${showPreview ? 'w-1/2' : 'w-full'} bg-gray-900 text-gray-100 p-4 overflow-auto font-mono text-sm`}>
                <pre className="whitespace-pre-wrap">{generatedCode.html}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - AI Assistant */}
        <div className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">AI Assistant</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Ask me anything!</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 bg-blue-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              {[
                'Change colors',
                'Add a button',
                'Make it bigger',
                'Add animation',
              ].map((action) => (
                <button
                  key={action}
                  onClick={() => setAiMessage(action)}
                  className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {chatHistory.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Ask me to modify your project!</p>
                <p className="text-xs mt-2">Try: "Make the background blue" or "Add a counter"</p>
              </div>
            ) : (
              chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      chat.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm">{chat.message}</p>
                  </div>
                </div>
              ))
            )}

            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
                placeholder="Ask AI to modify your project..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                disabled={isThinking}
              />
              <button
                onClick={handleAskAI}
                disabled={!aiMessage.trim() || isThinking}
                className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
                  !aiMessage.trim() || isThinking
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Wand2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

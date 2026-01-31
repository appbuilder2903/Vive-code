import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Wand2, Rocket, MessageSquare } from 'lucide-react';
import { Logo } from '../components/Logo';
import { OnboardingGuide } from '../components/OnboardingGuide';

const EXAMPLE_PROMPTS = [
  "Create a simple calculator",
  "Make a todo list app",
  "Build a personal portfolio website",
  "Create a quiz game",
  "Make a weather app",
  "Build a simple blog",
  "Create a photo gallery",
  "Make a countdown timer",
];

export function SimpleModePage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      // Navigate to editor with generated project
      navigate(`/simple-editor?prompt=${encodeURIComponent(prompt)}`);
    }, 2000);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      {/* Onboarding Guide */}
      {showOnboarding && <OnboardingGuide onComplete={() => setShowOnboarding(false)} />}
      
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Logo size="md" />
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
          >
            Advanced Mode
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">AI-Powered Simple Mode</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Tell us what you want to build
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            No coding needed! Just describe your idea, and AI will create it for you.
          </p>
        </div>

        {/* Prompt Input */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-3">
                What do you want to build today?
              </label>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: I want to create a simple calculator that can add, subtract, multiply and divide numbers..."
                className="w-full h-32 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white resize-none text-lg"
                disabled={isGenerating}
              />
              
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Be as detailed as you want - the more details, the better!
                </p>
                
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className={`px-8 py-3 rounded-xl font-semibold text-lg flex items-center gap-2 transition-all ${
                    !prompt.trim() || isGenerating
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-5 h-5" />
                      Create My Project
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Example Prompts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Need inspiration? Try these:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {EXAMPLE_PROMPTS.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition-all text-left group"
                disabled={isGenerating}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {example}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Instant Setup</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              No installation or setup needed. Start building immediately.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">AI-Powered</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Our AI understands your ideas and writes the code for you.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Easy to Edit</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Make changes with simple prompts or visual tools.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-12">
        <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>✨ Powered by AI • No coding experience needed • Start building in seconds</p>
        </div>
      </footer>
    </div>
  );
}

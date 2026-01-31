import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Code, Globe, Gamepad2, Calculator, ListTodo, Image, Clock } from 'lucide-react';
import { Logo } from '../components/Logo';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  difficulty: 'Beginner' | 'Easy' | 'Medium';
  preview: string;
  color: string;
}

const TEMPLATES: Template[] = [
  {
    id: 'calculator',
    name: 'Simple Calculator',
    description: 'A basic calculator that can add, subtract, multiply, and divide numbers. Perfect for beginners!',
    category: 'Apps',
    icon: <Calculator className="w-8 h-8" />,
    difficulty: 'Beginner',
    preview: '🧮',
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: 'todo',
    name: 'Todo List',
    description: 'Keep track of your tasks with this simple and colorful todo list app.',
    category: 'Apps',
    icon: <ListTodo className="w-8 h-8" />,
    difficulty: 'Beginner',
    preview: '✅',
    color: 'from-green-400 to-green-600',
  },
  {
    id: 'portfolio',
    name: 'Personal Website',
    description: 'A beautiful portfolio website to showcase your projects and skills.',
    category: 'Websites',
    icon: <Globe className="w-8 h-8" />,
    difficulty: 'Easy',
    preview: '🌐',
    color: 'from-purple-400 to-purple-600',
  },
  {
    id: 'quiz',
    name: 'Quiz Game',
    description: 'Create a fun quiz game with questions, answers, and score tracking.',
    category: 'Games',
    icon: <Gamepad2 className="w-8 h-8" />,
    difficulty: 'Easy',
    preview: '🎮',
    color: 'from-pink-400 to-pink-600',
  },
  {
    id: 'gallery',
    name: 'Photo Gallery',
    description: 'Display your photos in a beautiful grid layout with lightbox effect.',
    category: 'Websites',
    icon: <Image className="w-8 h-8" />,
    difficulty: 'Easy',
    preview: '📸',
    color: 'from-orange-400 to-orange-600',
  },
  {
    id: 'timer',
    name: 'Countdown Timer',
    description: 'A countdown timer for tracking events, deadlines, or cooking time!',
    category: 'Apps',
    icon: <Clock className="w-8 h-8" />,
    difficulty: 'Beginner',
    preview: '⏰',
    color: 'from-red-400 to-red-600',
  },
  {
    id: 'blog',
    name: 'Simple Blog',
    description: 'A clean and simple blog to share your thoughts and stories.',
    category: 'Websites',
    icon: <Code className="w-8 h-8" />,
    difficulty: 'Medium',
    preview: '📝',
    color: 'from-teal-400 to-teal-600',
  },
  {
    id: 'weather',
    name: 'Weather App',
    description: 'Check the weather for any city with this beautiful weather app.',
    category: 'Apps',
    icon: <Globe className="w-8 h-8" />,
    difficulty: 'Medium',
    preview: '☀️',
    color: 'from-cyan-400 to-cyan-600',
  },
];

const CATEGORIES = ['All', 'Apps', 'Websites', 'Games'];

export function SimpleTemplatesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: Template) => {
    // Navigate to simple editor with template
    navigate(`/simple-editor?template=${template.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo size="sm" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Templates</h1>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600"
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">Ready-to-Use Templates</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Start with a Template
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose a template and customize it with AI - no coding needed!
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-3 flex-wrap">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
            >
              {/* Preview */}
              <div className={`h-40 bg-gradient-to-br ${template.color} flex items-center justify-center relative`}>
                <div className="text-7xl">{template.preview}</div>
                <div className="absolute top-3 right-3">
                  <span className="bg-white dark:bg-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {template.difficulty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${template.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                    {template.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 truncate">
                      {template.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {template.category}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {template.description}
                </p>

                <button
                  onClick={() => handleUseTemplate(template)}
                  className={`w-full py-2 rounded-lg font-semibold bg-gradient-to-r ${template.color} text-white hover:shadow-lg transition-all`}
                >
                  Use This Template
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No templates found. Try a different search or category.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Can't find what you're looking for?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Describe your project idea and let AI create it from scratch!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Create with AI
          </button>
        </div>
      </main>
    </div>
  );
}

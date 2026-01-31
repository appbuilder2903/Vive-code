import { Link } from 'react-router-dom';
import { Sparkles, Users, GraduationCap, Rocket } from 'lucide-react';
import { Logo } from '../components/Logo';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center space-x-4">
            <Link to="/templates" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
              Templates
            </Link>
            <Link to="/education" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
              Education
            </Link>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Code, Collaborate, and Create
            <span className="block text-blue-600">with AI-Powered IDE</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Vive Code is a powerful online IDE that combines the best of Replit with advanced AI features,
            real-time collaboration, and comprehensive educational tools.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/dashboard"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
            >
              Start Coding Free
            </Link>
            <a
              href="#features"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition text-lg font-semibold"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Sparkles className="w-10 h-10 text-blue-600" />}
            title="AI-Powered Coding"
            description="6 AI providers including OpenAI, Gemini, and Perplexity to assist your coding"
          />
          <FeatureCard
            icon={<Users className="w-10 h-10 text-green-600" />}
            title="Real-time Collaboration"
            description="Code together with live cursors, chat, and shared editing"
          />
          <FeatureCard
            icon={<GraduationCap className="w-10 h-10 text-purple-600" />}
            title="Education Mode"
            description="Classrooms, assignments, auto-grading, and student management"
          />
          <FeatureCard
            icon={<Rocket className="w-10 h-10 text-orange-600" />}
            title="One-Click Deploy"
            description="Deploy to Netlify instantly with custom domains"
          />
        </div>

        {/* Stats */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          <StatCard number="50+" label="Languages Supported" />
          <StatCard number="1000+" label="AI Prompts per Week" />
          <StatCard number="100+" label="Ready-to-use Templates" />
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 Vive Code. All rights reserved.</p>
          <p className="mt-2">Built with ❤️ for developers and students</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
      <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600 dark:text-gray-300">{label}</div>
    </div>
  );
}

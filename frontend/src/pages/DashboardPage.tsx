import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Folder, Code2 } from 'lucide-react';

export function DashboardPage() {
  const [projects] = useState([
    { id: '1', name: 'My First Project', language: 'javascript', updatedAt: new Date() },
    { id: '2', name: 'Python App', language: 'python', updatedAt: new Date() },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code2 className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Vive Code</span>
            </div>
            <nav className="flex items-center space-x-4">
              <Link to="/templates" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Templates
              </Link>
              <Link to="/education" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
                Education
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Projects</h1>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Plus className="w-5 h-5" />
            <span>New Project</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map(project => (
            <Link
              key={project.id}
              to={`/editor/${project.id}`}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex items-start space-x-3">
                <Folder className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {project.language}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                    Updated {project.updatedAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

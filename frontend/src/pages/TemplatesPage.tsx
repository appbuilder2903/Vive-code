export function TemplatesPage() {
  const templates = [
    { id: '1', name: 'React App', category: 'web', language: 'javascript' },
    { id: '2', name: 'Express API', category: 'api', language: 'javascript' },
    { id: '3', name: 'Python Flask', category: 'web', language: 'python' },
    { id: '4', name: 'Next.js', category: 'web', language: 'typescript' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Templates</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map(template => (
            <div
              key={template.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {template.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {template.category} • {template.language}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EducationPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Education Hub</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              For Teachers
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>✅ Create and manage classrooms</li>
              <li>✅ Assign coding projects</li>
              <li>✅ Auto-grade submissions</li>
              <li>✅ Track student progress</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              For Students
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>✅ Join classrooms</li>
              <li>✅ Submit assignments</li>
              <li>✅ Get instant feedback</li>
              <li>✅ Learn with AI assistance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

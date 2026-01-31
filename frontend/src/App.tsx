import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SimpleModePage } from './pages/SimpleModePage';
import { SimpleEditorPage } from './pages/SimpleEditorPage';
import { ImprovedEditorPage } from './pages/ImprovedEditorPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { EducationPage } from './pages/EducationPage';
import { AuthCallback } from './components/AuthCallback';

function App() {
  return (
    <Routes>
      {/* Simple Mode - Default for beginners */}
      <Route path="/" element={<SimpleModePage />} />
      <Route path="/simple" element={<SimpleModePage />} />
      <Route path="/simple-editor" element={<SimpleEditorPage />} />
      
      {/* Advanced Mode */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/editor/:projectId" element={<ImprovedEditorPage />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/education" element={<EducationPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

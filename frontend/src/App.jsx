import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth, AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HealthProfilePage from './pages/HealthProfilePage';
import DietPlanPage from './pages/DietPlanPage';
import ChatbotPage from './pages/ChatbotPage';
import FoodDatabasePage from './pages/FoodDatabasePage';
import ProgressPage from './pages/ProgressPage';
import UserProfilePage from './pages/UserProfilePage';

import Layout from './components/Layout';

function AppContent() {
  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'glass-card text-white bg-dark-800 border border-white/10',
          duration: 3000,
          style: {
            background: 'rgba(26, 26, 40, 0.9)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
          }
        }}
      />
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/health-profile" element={<ProtectedRoute><HealthProfilePage /></ProtectedRoute>} />
          <Route path="/diet-plan" element={<ProtectedRoute><DietPlanPage /></ProtectedRoute>} />
          <Route path="/chatbot" element={<ProtectedRoute><ChatbotPage /></ProtectedRoute>} />
          <Route path="/food-database" element={<ProtectedRoute><FoodDatabasePage /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />

          {/* Fallback to dashboard if route not found */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Layout>
    </Router>
  );
}


function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { AppShell } from '@/components/layout/AppShell';
import LoginPage from '@/pages/auth/LoginPage';
import EmployeeDashboard from '@/pages/dashboard/EmployeeDashboard';
import ManagerDashboard from '@/pages/dashboard/ManagerDashboard';
import HRDashboard from '@/pages/dashboard/HRDashboard';
import LeadershipDashboard from '@/pages/dashboard/LeadershipDashboard';
import PIPage from '@/pages/pi/PIPage';
import CopilotPage from '@/pages/copilot/CopilotPage';

// Newly created pages
import ProfilePage from '@/pages/profile/ProfilePage';
import EventsPage from '@/pages/events/EventsPage';
import EvidencePage from '@/pages/evidence/EvidencePage';
import FeedbackPage from '@/pages/feedback/FeedbackPage';
import LedgerPage from '@/pages/ledger/LedgerPage';
import AppraisalPage from '@/pages/appraisal/AppraisalPage';
import TeamPage from '@/pages/team/TeamPage';
import ValidationPage from '@/pages/validation/ValidationPage';
import AIAnalyzerPage from '@/pages/ai-analyzer/AIAnalyzerPage';
import ReviewPage from '@/pages/review/ReviewPage';
import BiasPage from '@/pages/bias/BiasPage';
import BellCurvePage from '@/pages/bell-curve/BellCurvePage';
import EmployeesPage from '@/pages/employees/EmployeesPage';
import AnalyticsPage from '@/pages/analytics/AnalyticsPage';
import FairnessPage from '@/pages/fairness/FairnessPage';
import SystemConfigPage from '@/pages/config/SystemConfigPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <AppShell>{children}</AppShell> : <Navigate to="/login" replace />;
}

function RoleDashboard() {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  switch (user.role) {
    case 'employee':
      return <EmployeeDashboard />;
    case 'reporting_officer':
      return <ManagerDashboard />;
    case 'reviewing_officer':
      return <ManagerDashboard />; // Share the manager view dashboard
    case 'hr_admin':
      return <HRDashboard />;
    case 'senior_leadership':
      return <LeadershipDashboard />;
    default:
      return <EmployeeDashboard />;
  }
}

export default function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><RoleDashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/pi" element={<ProtectedRoute><PIPage /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
        <Route path="/events/new" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
        <Route path="/evidence" element={<ProtectedRoute><EvidencePage /></ProtectedRoute>} />
        <Route path="/feedback" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />
        <Route path="/feedback/new" element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />
        <Route path="/ledger" element={<ProtectedRoute><LedgerPage /></ProtectedRoute>} />
        <Route path="/copilot" element={<ProtectedRoute><CopilotPage /></ProtectedRoute>} />
        <Route path="/appraisal" element={<ProtectedRoute><AppraisalPage /></ProtectedRoute>} />
        
        {/* Manager/RO/Reviewer routes */}
        <Route path="/team" element={<ProtectedRoute><TeamPage /></ProtectedRoute>} />
        <Route path="/consistency" element={<ProtectedRoute><TeamPage /></ProtectedRoute>} />
        <Route path="/validation" element={<ProtectedRoute><ValidationPage /></ProtectedRoute>} />
        <Route path="/ai-analyzer" element={<ProtectedRoute><AIAnalyzerPage /></ProtectedRoute>} />
        <Route path="/review" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />
        
        {/* Reviewer / HR / Leadership bias & curve */}
        <Route path="/bias" element={<ProtectedRoute><BiasPage /></ProtectedRoute>} />
        <Route path="/bell-curve" element={<ProtectedRoute><BellCurvePage /></ProtectedRoute>} />
        
        {/* HR and Admin routes */}
        <Route path="/employees" element={<ProtectedRoute><EmployeesPage /></ProtectedRoute>} />
        <Route path="/heatmap" element={<ProtectedRoute><EmployeesPage /></ProtectedRoute>} />
        <Route path="/succession" element={<ProtectedRoute><EmployeesPage /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path="/org" element={<ProtectedRoute><LeadershipDashboard /></ProtectedRoute>} />
        <Route path="/fairness" element={<ProtectedRoute><FairnessPage /></ProtectedRoute>} />
        <Route path="/ai-governance" element={<ProtectedRoute><FairnessPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><AppraisalPage /></ProtectedRoute>} />
        <Route path="/config" element={<ProtectedRoute><SystemConfigPage /></ProtectedRoute>} />
        <Route path="/sap" element={<ProtectedRoute><SystemConfigPage /></ProtectedRoute>} />
        <Route path="/audit" element={<ProtectedRoute><SystemConfigPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

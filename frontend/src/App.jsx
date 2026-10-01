import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import VoterLayout from './components/layout/VoterLayout';
import AdminLayout from './components/layout/AdminLayout';

// Protection
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

// Public Pages
import Home from './pages/public/Home';
import Elections from './pages/public/Elections';
import ElectionDetails from './pages/public/ElectionDetails';
import Candidates from './pages/public/Candidates';
import CandidateDetails from './pages/public/CandidateDetails';
import Parties from './pages/public/Parties';
import PartyDetails from './pages/public/PartyDetails';
import Results from './pages/public/Results';
import ResultDetails from './pages/public/ResultDetails';
import About from './pages/public/About';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Voter Pages
import VoterDashboard from './pages/voter/VoterDashboard';
import VotingPage from './pages/voter/VotingPage';
import VoteReview from './pages/voter/VoteReview';
import VoteSuccess from './pages/voter/VoteSuccess';
import MyVotes from './pages/voter/MyVotes';
import Profile from './pages/voter/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminElections from './pages/admin/AdminElections';
import AdminStates from './pages/admin/AdminStates';
import AdminConstituencies from './pages/admin/AdminConstituencies';
import AdminPositions from './pages/admin/AdminPositions';
import AdminParties from './pages/admin/AdminParties';
import AdminCandidates from './pages/admin/AdminCandidates';
import AdminUsers from './pages/admin/AdminUsers';
import AdminResults from './pages/admin/AdminResults';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Public Layout Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/elections" element={<Elections />} />
              <Route path="/elections/:id" element={<ElectionDetails />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route path="/candidates/:id" element={<CandidateDetails />} />
              <Route path="/parties" element={<Parties />} />
              <Route path="/parties/:id" element={<PartyDetails />} />
              <Route path="/results" element={<Results />} />
              <Route path="/results/:electionId" element={<ResultDetails />} />
              <Route path="/about" element={<About />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* Voter Protected Layout Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <VoterLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<VoterDashboard />} />
              <Route path="/vote/:electionId" element={<VotingPage />} />
              <Route path="/vote-review" element={<VoteReview />} />
              <Route path="/vote-success" element={<VoteSuccess />} />
              <Route path="/my-votes" element={<MyVotes />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            {/* Admin Protected Layout Routes */}
            <Route
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/elections" element={<AdminElections />} />
              <Route path="/admin/states" element={<AdminStates />} />
              <Route path="/admin/constituencies" element={<AdminConstituencies />} />
              <Route path="/admin/positions" element={<AdminPositions />} />
              <Route path="/admin/parties" element={<AdminParties />} />
              <Route path="/admin/candidates" element={<AdminCandidates />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/results" element={<AdminResults />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;

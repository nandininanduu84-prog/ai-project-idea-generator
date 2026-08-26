import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './stores/authStore';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProjectGenerator from './pages/ProjectGenerator';
import ProjectDetail from './pages/ProjectDetail';
import SavedProjects from './pages/SavedProjects';
import AdminDashboard from './pages/AdminDashboard';

// Components
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/generate" element={<PrivateRoute><ProjectGenerator /></PrivateRoute>} />
        <Route path="/project/:id" element={<PrivateRoute><ProjectDetail /></PrivateRoute>} />
        <Route path="/saved" element={<PrivateRoute><SavedProjects /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;

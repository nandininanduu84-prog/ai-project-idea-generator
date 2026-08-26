import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaRobot, FaBookmark, FaUser, FaSignOutAlt, FaMenu } from 'react-icons/fa';
import useAuthStore from '../stores/authStore';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold gradient-bg bg-clip-text text-transparent">
          <FaRobot /> ProjectGen AI
        </Link>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaMenu size={24} />
        </button>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex gap-6 items-center absolute md:relative top-16 md:top-0 left-0 md:left-auto right-0 bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none`}>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-2 text-primary hover:text-blue-700 transition">
                <FaHome /> Dashboard
              </Link>
              <Link to="/generate" className="flex items-center gap-2 text-primary hover:text-blue-700 transition">
                <FaRobot /> Generate
              </Link>
              <Link to="/saved" className="flex items-center gap-2 text-primary hover:text-blue-700 transition">
                <FaBookmark /> Saved
              </Link>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Hi, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

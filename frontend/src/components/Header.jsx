import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const getNavLinks = () => {
    const baseLinks = [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
      { to: '/career', label: 'Career' },
    ];

    if (isAuthenticated) {
      // Add dashboard link based on user type
      // Note: Backend uses UserRole field with values 'Buyer'/'Seller'
      const dashboardLink = user?.UserRole === 'Seller' 
        ? { to: '/sellerdashboard', label: 'Dashboard' }
        : { to: '/buyerdashboard', label: 'Dashboard' };
      
      return [
        ...baseLinks,
        dashboardLink,
        { action: handleLogout, label: 'Logout' }
      ];
    } else {
      return [
        ...baseLinks,
        { to: '/login', label: 'Login' },
        { to: '/signup', label: 'Sign Up' },
      ];
    }
  };

  const navLinks = getNavLinks();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-cyan-700 shadow-lg w-full sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl sm:text-2xl font-bold text-white flex-shrink-0">
            DigiMart
          </Link>

          {/* Navigation - Hide only on mobile, show everywhere else */}
          <nav className="flex items-center gap-2 flex-wrap max-sm:hidden">
            {navLinks.map((link, index) => {
              if (link.action) {
                // Render button for actions like logout
                return (
                  <button
                    key={`action-${index}`}
                    onClick={link.action}
                    className="px-3 py-2 rounded-md font-medium transition-colors duration-200 text-sm whitespace-nowrap text-white hover:bg-cyan-600 hover:text-white border border-transparent hover:border-cyan-400"
                  >
                    {link.label}
                  </button>
                );
              } else {
                // Render Link for navigation
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 text-sm whitespace-nowrap border ${
                      location.pathname === link.to
                        ? 'bg-white text-cyan-700 border-white'
                        : 'text-white hover:bg-cyan-600 hover:text-white border-transparent hover:border-cyan-400'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }
            })}
          </nav>

          {/* Mobile Menu Button - Only show on small screens */}
          <button
            onClick={toggleMenu}
            className="max-sm:flex hidden flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu - Only show on small screens when menu is open */}
        <div className={`${isMenuOpen ? 'max-sm:block' : 'max-sm:hidden'} hidden transition-all duration-300 ease-in-out`}>
          <nav className="flex flex-col space-y-1 mt-4 pb-4 border-t border-cyan-600 pt-4">
            {navLinks.map((link, index) => {
              if (link.action) {
                // Render button for actions like logout
                return (
                  <button
                    key={`mobile-action-${index}`}
                    onClick={link.action}
                    className="px-4 py-3 rounded-md font-medium transition-colors duration-200 text-base text-white hover:bg-cyan-600 text-left border border-transparent hover:border-cyan-400"
                  >
                    {link.label}
                  </button>
                );
              } else {
                // Render Link for navigation
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-md font-medium transition-colors duration-200 text-base border ${
                      location.pathname === link.to
                        ? 'bg-white text-cyan-700 border-white'
                        : 'text-white hover:bg-cyan-600 border-transparent hover:border-cyan-400'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              }
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/career', label: 'Career' },
    { to: '/login', label: 'Login' },
    { to: '/signup', label: 'Sign Up' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-cyan-700 shadow-lg w-full sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-white">
            DigiMart
          </Link>

          <nav className="flex gap-2 md:gap-3 lg:gap-4">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1 rounded-md font-bold transition-colors duration-200 text-base lg:text-lg whitespace-nowrap ${
                  location.pathname === link.to
                    ? 'bg-white text-cyan-700'
                    : 'text-white hover:bg-cyan-600 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={toggleMenu}
            className="hidden flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </button>
        </div>

        <div className="hidden">
          <nav className="flex flex-col space-y-2 mt-4 pb-4">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 text-sm ${
                  location.pathname === link.to
                    ? 'bg-white text-cyan-700'
                    : 'text-white hover:bg-cyan-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/career', label: 'Career' },
    { to: '/login', label: 'Login' },
    { to: '/signup', label: 'Sign Up' },
  ];

  return (
    <header className="bg-cyan-700 shadow-lg w-full">
      <div className="w-full px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          DigiMart
        </Link>
        <nav className="flex gap-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-md font-medium transition-colors ${
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
    </header>
  );
};

export default Header; 
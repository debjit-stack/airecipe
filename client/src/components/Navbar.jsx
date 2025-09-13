import React from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle'; // 1. Import the new component

const Navbar = () => {
  // This function determines the style for the active NavLink
  const activeLinkStyle = ({ isActive }) => {
    return {
      'border-emerald-400 text-emerald-400': isActive,
      'border-transparent hover:text-white': !isActive,
    };
  };

  return (
    <nav className="bg-slate-700/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand Name */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-white font-bold text-xl">
              Recipe Remixer
            </NavLink>
          </div>

          {/* Main Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium text-slate-300 border-b-2 transition-colors ${
                  isActive ? 'border-emerald-400 text-emerald-400' : 'border-transparent hover:text-white'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium text-slate-300 border-b-2 transition-colors ${
                  isActive ? 'border-emerald-400 text-emerald-400' : 'border-transparent hover:text-white'
                }`
              }
            >
              My History
            </NavLink>
          </div>
          
          {/* Theme Toggle on the right */}
          <div className="flex items-center">
             <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-40 transition-colors duration-300">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-bold text-emerald-500 dark:text-emerald-400">
              Recipe Remixer
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-300 hover:text-emerald-500'}`
              }
            >
              Home
            </NavLink>
            
            {isAuthenticated ? (
              <>
                <NavLink 
                  to="/history" 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-300 hover:text-emerald-500'}`
                  }
                >
                  My Recipes
                </NavLink>
                
                <span className="text-slate-600 dark:text-slate-300 text-sm">
                  Hello, {user?.name}
                </span>
                
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-500 dark:text-slate-300 hover:text-emerald-500 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-300 hover:text-emerald-500'}`
                  }
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  className={({ isActive }) => 
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-300 hover:text-emerald-500'}`
                  }
                >
                  Sign Up
                </NavLink>
              </>
            )}
            
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="ml-4 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" onClick={closeMobileMenu} className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
              Home
            </NavLink>
            
            {isAuthenticated ? (
              <>
                <NavLink to="/history" onClick={closeMobileMenu} className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                  My Recipes
                </NavLink>
                
                <div className="px-3 py-2 text-slate-300 text-sm">
                  Hello, {user?.name}
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={closeMobileMenu} className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                  Login
                </NavLink>
                <NavLink to="/register" onClick={closeMobileMenu} className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-slate-900 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Header = ({ isAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100">
      <div className="container-max">
        <div className="flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold text-gradient">E-Learning</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 hover:scale-105 transform"
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 hover:scale-105 transform"
            >
              Courses
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-300 hover:scale-105 transform"
            >
              About
            </Link>
            {isAuth ? (
              <Link 
                to="/account" 
                className="btn-primary text-sm"
              >
                Account
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="btn-primary text-sm"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <HiX className="w-6 h-6 text-gray-700" />
            ) : (
              <HiMenuAlt3 className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <nav className="flex flex-col space-y-4 px-6 pb-6 border-t border-gray-100">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-purple-600 font-medium py-2 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className="text-gray-700 hover:text-purple-600 font-medium py-2 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-purple-600 font-medium py-2 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {isAuth ? (
              <Link 
                to="/account" 
                className="btn-primary text-sm inline-block w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="btn-primary text-sm inline-block w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

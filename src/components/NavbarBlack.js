import React, { useState } from 'react';
import logo from '../images/logoW.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-black shadow-lg">
      <div className="container mx-auto px-6 py-2 flex items-center justify-between">
        {/* Mobile & Desktop: Logo */}
        <img src={logo} alt="Logo" className="h-8 w-auto" />

        {/* Desktop: Links on top right */}
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="text-white hover:text-pink-300">Home</a>
          <a href="#" className="text-white hover:text-pink-300">Marketplace</a>
          <a href="#" className="text-white hover:text-pink-300">Notifications</a>
          <a href="#" className="text-white hover:text-pink-300">Profile</a>
          <a href="#" className="text-white hover:text-pink-300">Log Out</a>
        </nav>
        
        {/* Mobile: Hamburger */}
        <button className="md:hidden text-gray-500 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile View: Sidebar */}
      {isMenuOpen && (
        <div className="bg-pink-300 md:hidden h-screen w-64 fixed top-0 left-0 overflow-y-auto transition-transform transform translate-x-0 transition-duration-500">
          <div className="px-6 py-2 flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </div>
          <nav className="mt-8 space-y-4 px-6 flex flex-col justify-between h-full">
            <div>
              <a href="#" className="text-white block mb-4">Home</a>
              <a href="#" className="text-white block mb-4">Marketplace</a>
              <a href="#" className="text-white block mb-4">Notifications</a>
              <a href="#" className="text-white block mb-4">Profile</a>
            </div>
            <a href="#" className="text-white mb-4">Log Out</a>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Navbar;

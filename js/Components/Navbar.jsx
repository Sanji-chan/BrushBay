import React, { useState } from 'react';
import logo from '../images/logo.png';

function Navbar({ notifications }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-2 flex items-center justify-between">
        {/* Mobile & Desktop: Logo */}
        <img src={logo} alt="Logo" className="h-8 w-auto" />

        {/* Desktop: Links on top right */}
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="text-gray-600 hover:text-pink-300">Home</a>
          <a href="#" className="text-gray-600 hover:text-pink-300">Marketplace</a>
          {/* Notifications Dropdown */}
          <div>
            <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} className="text-gray-600 hover:text-pink-300 focus:outline-none">
              Notifications
            </button>
            
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                {notifications.slice(0, 5).map((notification, index) => (
                  <a href="#" key={index} className="block px-4 py-2 text-sm text-gray-800 hover:bg-pink-100">
                    {notification}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="#" className="text-gray-600 hover:text-pink-300">Profile</a>
          <a href="#" className="text-gray-600 hover:text-pink-300">Log Out</a>
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

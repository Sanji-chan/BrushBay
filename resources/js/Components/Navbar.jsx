import React, { useState } from 'react';
import logo from '../../images/logo.png';
import { Link, Head } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';

function Navbar({auth=""}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-2 flex items-center justify-between">
        {/* Mobile & Desktop: Logo */}
        <Link
            href="/"
            className="text-gray-600 hover:text-pink-300"
          >
              <img src={logo} alt="Logo" className="h-8 w-auto" />
        </Link>        
        

        {/* Desktop: Links on top right */}
        <nav className="hidden md:flex space-x-4">


          {auth.user ? (
              <>
                        <Link
                            href={route('dashboard')}
                            className="text-gray-600 hover:text-pink-300"
                        >
                            Dashboard
                        </Link>
                        {/* <Link
                            href={route('dashboard')}
                            className="text-gray-600 hover:text-pink-300"
                        >
                            Notifications
                        </Link>
                        <Link
                            href={route('dashboard')}
                            className="text-gray-600 hover:text-pink-300"
                        >
                            Profile
                        </Link> */}
                        <Link href={route('logout')} 
                              method="post" 
                              
                              className="text-gray-600 hover:text-pink-300">
                              Log out
                        </Link>


              </>



                    ) : (
                        <>
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-pink-300"                            >
                                Home
                            </Link>
                            <Link
                                href={route('marketplace.showMarket')}
                                className="text-gray-600 hover:text-pink-300"                            >
                                Marketplace
                            </Link>
                            <Link
                                href={route('login')}
                                className="text-gray-600 hover:text-pink-300"                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="text-gray-600 hover:text-pink-300"                            >
                                Register
                            </Link>
                        </>
                    )}
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

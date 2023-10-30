import React from 'react';
import LogoW from '../images/logoW.png';

function Footer() {
  return (
    
    <div className="bg-black p-8">
      <div className="container mx-auto">
        
        
        <div className="flex justify-between">
        <div>
          <img src={LogoW} alt="Logo" className="mb-4 h-28 w-34" />
        </div>
        <div>
          <h4 className="text-white mb-4">The Team</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-white hover:text-pink-300">Azmain Morshed</a></li>
            <li><a href="#" className="text-white hover:text-pink-300">Sanjida Tasnim</a></li>
            <li><a href="#" className="text-white hover:text-pink-300">Nahin Hossain</a></li>
            <li><a href="#" className="text-white hover:text-pink-300">Namirul Islam</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-4">More from BrushBay</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-white">Our Story</a></li>
            <li><a href="#" className="text-white hover:text-pink-300">Blog</a></li>
            <li><a href="#" className="text-white hover:text-pink-300">Affiliate</a></li>
            <li><a href="#" className="text-white hover:text-pink-300">Contact Us</a></li>
            <li><a href="#" className="text-white hover:text-pink-300">FAQ</a></li>
            <li><a href="#" className="text-white hover:text-pink-300">Sign In</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-4">Let's Stay Connected</h4>
          <form className="mb-4">
            <input 
              type="email" 
              placeholder="Your Email"
              className="p-2 rounded mb-2 w-full" 
            />
            <button className="p-2 rounded bg-pink-500 text-white hover:bg-pink-300 w-full">
              SUBMIT
            </button>
          </form>
          <h4 className="text-white mb-4">Follow us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/yourPage" target="_blank" rel="noopener noreferrer" className="mr-4">
                <i className="fab fa-facebook-f text-pink-500 hover:text-pink-300 text-2xl"></i>
            </a>
            <a href="https://www.instagram.com/yourUsername" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram text-pink-500 hover:text-pink-300 text-2xl"></i>
            </a>
        </div>

        </div>
      </div>
      <div className="border-t mt-8 pt-6 text-center text-white">
        © 2023 brushbay.com
        <div className="mt-2 space-x-4">
          <a href="#" className="text-white hover:text-pink-300">Terms of Service</a>
          <a href="#" className="text-white hover:text-pink-300">Privacy Policy</a>
          <a href="#" className="text-white hover:text-pink-300">Refund Policy</a>
          <a href="#" className="text-white hover:text-pink-300">Accessibility Policy</a>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Footer;



{/* <div className="w-full overflow-hidden" style={{ height: '60px' }}>
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
          <path d="M0,0 Q250,100 500,0 L500,150 L0,150 Z" style={{ stroke: 'none', fill: '#000000' }}></path>

          </svg>
        </div> */}
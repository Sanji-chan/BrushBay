import React from 'react';
import LandingCollage from '../../../images/LandingCollage.png';

function Hero() {
  return (
    <div className="relative flex items-center justify-center h-80 overflow-hidden" style={{ backgroundImage: `url(${LandingCollage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        
      {/* Black overlay with reduced opacity */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold text-white">
          
          <span className="text-pink-400 neon-effect">
          Your Digital Exhibition.
          </span> 
          
        </h1>
        <button className="mt-8 font-bold bg-pink-600 hover:bg-pink-200 text-white px-8 py-2 rounded-full shadow-xl hover:scale-105 duration-300">Explore</button>
      </div>

      {/* CSS for neon effect */}
      <style>
        {`
          .neon-effect {
            text-shadow: 0 0 3px #FF4DA6, 0 0 8px #FF4DA6, 0 0 12px #FF3399, 0 0 17px #FF3399, 0 0 22px #FF3399, 0 0 25px #FF3399, 0 0 32px #FF3399;
            animation: blinkAnimation 3s infinite;
          }

          @keyframes blinkAnimation {
            0% {opacity: 0.1;}
            30% {opacity: 0.9;}
            80% {opacity: 0.1;}
          }
          
        `}
      </style>
    </div>
  );
}

export default Hero;

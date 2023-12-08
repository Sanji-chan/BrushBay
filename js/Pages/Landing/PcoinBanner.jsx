import React from 'react';
import pcoinbanner from '../../../images/pcoinbanner.png';
import pcoin from '../../../images/pcoin.png';

function PcoinBanner() {
  return (
    <div className="relative flex justify-between items-center bg-white h-80 px-20 mr-30">
        
      <div className="flex flex-col z-10 relative">
        <h2 className="text-7xl font-bold mb-2 text-pink-600">Buy and Sell Paintings</h2>
        <h3 className="text-5xl font-semibold text-yellow-600">
          With <span className="relative">Pcoins
            <svg className="absolute top-2 -left-4 w-44 h-14" viewBox="0 0 100 30">
              <ellipse cx="50" cy="15" rx="48" ry="14" fill="none" stroke="red" strokeLinecap="round" strokeDasharray="2,5" />
            </svg>
          </span>
        </h3>
      </div>
      
      <div className="relative">
        <svg className="absolute -top-10 left-1/2 transform -translate-x-1/2 animate-bounce w-8 h-10" viewBox="0 0 24 30">
          <path d="M12 28L4 20H10V8H14V20H20L12 28Z" fill="red" />
        </svg>
        {/* clicking the coin will take to wallet */}
        <img src={pcoin} alt="Pcoin" className="w-40 mr-20 hover:scale-105 duration-300" /> 
      </div>
      
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
      
    </div>
  );
}

export default PcoinBanner;

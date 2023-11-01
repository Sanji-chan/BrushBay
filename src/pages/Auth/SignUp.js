import React from 'react';
import { useState } from 'react';

// Importing the images
import logo from '../../images/logo.png';
import taglineBg from '../../images/taglineBg.png';
import collage from '../../images/collage.png';



function SignUp() {
  const [step, setStep] = useState(1);
  const [selectedCards, setSelectedCards] = useState([]);

  const handleArrowClick = () => {
      // Submit data to the database here
      setStep(2);
  };

  const handleCardClick = (card) => {
      if (selectedCards.includes(card)) {
          setSelectedCards(prev => prev.filter(c => c !== card));
      } else {
          setSelectedCards(prev => [...prev, card]);
      }
  };

  return (
    <div className="flex h-screen">
       <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-10">
            {step === 1 ? (
                <>
      {/* Left Side */}
        <div className="mb-4">
          <img src={logo} alt="Logo" className="w-30 h-16" />
        </div>
        <div className="mb-5 text-xl font-semibold">Sign Up</div>
        <div className="mb-4">
          <div className="flex items-center border-b border-pink-300">
            <span className="pr-2 text-red-500">👤</span>
            <input type="text" placeholder="Name" className="outline-none py-2 focus:border-b-2 focus:border-pink-300" />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center border-b border-pink-300">
            <span className="pr-2 text-red-500">@</span>
            <input type="email" placeholder="Email" className="outline-none py-2 focus:border-b-2 focus:border-pink-300" />
          </div>
        </div>
        {/* <div className="mb-4 relative">
          <div className="flex items-center border-b border-pink-300">
            <span className="pr-2 text-red-500">📅</span>
            <input 
              type="date" 
              className="outline-none py-2 focus:border-b-2 focus:border-pink-300 appearance-none z-10"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {!dateOfBirth && <span className="absolute left-6 top-2 text-gray-400 z-0">Date of Birth</span>}
          </div>
        </div> */}
        <div className="mb-4">
                        <a href="#" className='text-pink-400 hover:text-pink-300'>Already registered?</a>
                    </div>
                    <div className="flex justify-center items-center">
                        <button 
                            onClick={handleArrowClick} 
                            className="bg-pink-500 hover:bg-pink-300 rounded-full w-12 h-12 mt-4 flex items-center text-white justify-center"
                        >
                            ⟶
                        </button>
                    </div>
          </>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-4"> {/* New div to space out back arrow and title */}
                <button 
                  onClick={() => setStep(1)} 
                  className="bg-pink-500 hover:bg-pink-300 rounded-full px-3 py-2 mr-2 text-white"
                >
                  ⟵
                </button>
                <h1 className='text-black font-extrabold text-3xl text-center mb-8'>Select your <span className='text-pink-500'>Favorite</span> Categories</h1>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {["Action", "Oil", "Modern", "Abstract", "Portrait", "Surrealism"].map((card, index) => (
                      <div
                        key={index}
                        onClick={() => handleCardClick(card)}
                        className={`relative card bg-pink-500 hover:bg-pink-300 text-center text-white py-10 px-8 rounded-md ${selectedCards.includes(card) ? 'border-2 border-white' : ''}`}
                      >
                        {card}
                        <button 
                          onClick={(e) => {
                            handleCardClick(card);
                            e.stopPropagation();  // prevent parent click
                          }}
                          className={`absolute top-1 right-1 w-4 h-4 rounded-full ${selectedCards.includes(card) ? "bg-pink-300" : "bg-white"}`}
                        >
                          {selectedCards.includes(card) ? "" : ""}
                        </button>
                      </div>
                    ))}
                  </div>
              <div className='flex justify-center items-center mt-8'>
                  <button className="bg-pink-500 hover:bg-pink-400 text-white text-center py-2 px-4 rounded-full">Sign Up</button>
              </div>
          </div>
      )}
  </div>
      {/* Right Side - hidden on small screens */}
      <div 
        className="hidden md:flex w-1/2 items-center justify-center relative" // Added 'relative' here
        style={{
          backgroundColor: 'rgba(252, 81, 133, 0.1)'
        }}
      >
        <div 
          className="absolute inset-0" // Ensure it covers the whole parent div
          style={{
            backgroundImage: `url(${collage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: 1.2, // Adjust this value to change the opacity of the image
            zIndex: -1 // Ensure it sits behind the content
          }}
        ></div>

        <div style={{ 
          width: '80%', 
          height: '70%', 
          backgroundImage: `url(${taglineBg})`, 
          backgroundSize: 'contain', 
          backgroundRepeat: 'no-repeat', 
          backgroundPosition: 'center' 
        }}>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

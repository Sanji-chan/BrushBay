import React from 'react'; 

// Importing the images
import logo from '../../images/logo.png';
import taglineBg from '../../images/taglineBg.png';
import collage from '../../images/collage.png';

function Login() {
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-10"> {/* Updated for full width on small screens */}
        <div className="mb-4">
          <img src={logo} alt="Logo" className="w-30 h-16" />
        </div>
        <div className="mb-5 text-xl font-semibold">Login</div>
        <div className="mb-4">
          <div className="flex items-center border-b border-pink-300">
            <span className="pr-2 text-red-500 border-pink-300">👤</span>
            <input type="text" placeholder="Email" className="outline-none py-2 focus:border-b-2 focus:border-pink-300" />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center border-b border-pink-300">
            <span className="pr-2 text-red-500 border-pink-300">🔒</span>
            <input type="password" placeholder="••••••••" className="outline-none py-2 focus:border-b-2 focus:border-pink-300" />
          </div>
        </div>
        <div>
          <button className="bg-pink-500 hover:bg-pink-400 text-white py-2 px-4 rounded-full">Enter</button>
        </div>
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

export default Login;

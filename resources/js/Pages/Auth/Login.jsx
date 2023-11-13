import React from 'react'; 
import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

//import Navbar and Footer
import Navbar from "../../Components/Navbar";
import Footer from '../../Components/Footer';

// Importing the images
import taglineBg from '../../../images/taglineBg.png';
import collage from '../../../images/collage.png';

export default function Login({ status, canResetPassword }) {
  
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
        reset('password');
    };
  }, []);

  const submit = (e) => {
      e.preventDefault();

      post(route('login'));
  };

  return (
    <>
    <Navbar/>
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-10"> {/* Updated for full width on small screens */}
        <div className="mb-4">
            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </div>
        <div className="mb-5 text-xl font-semibold">Login</div>
        
        {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

        <form onSubmit={submit} >
        <div className="mb-4">
          <div className="flex items-center border-b border-pink-300">
            <span className="pr-2 text-red-500 border-pink-300">👤</span>
            <TextInput  
              id="email"
              type="email"
              name="email"
              value={data.email} 
              placeholder="Email" 
              className="outline-none py-2 focus:border-b-2 focus:border-pink-300"
              autoComplete="username"
              isFocused={true}
              onChange={(e) => setData('email', e.target.value)}
            />
            <InputError message={errors.email} className="mt-2" />
          </div>

        </div>
        <div className="mb-4">
          <div className="flex items-center border-b border-pink-300">
            <span className="pr-2 text-red-500 border-pink-300">🔒</span>
            <TextInput 
              id="password"
              type="password"
              name="password"
              value={data.password}
              placeholder="••••••••" 
              className="outline-none py-2 focus:border-b-2 focus:border-pink-300" 
              autoComplete="current-password"
              onChange={(e) => setData('password', e.target.value)}
            />
            <InputError message={errors.password} className="mt-2" />

          </div>
        </div>

        <div className="mb-4">
        {canResetPassword && (
          <Link
            href={route('password.request')}
            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            > Forgot your password?
          </Link>
          )}
        </div>
        
        
        {/* submit button  */}
        <div>
          <button
          disabled={processing} 
          className="bg-pink-500 hover:bg-pink-400 text-white py-2 px-4 rounded-full"
          >Enter
          </button>
        </div>
        
        </form>
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
    <Footer/>
    </>
 
  );
}


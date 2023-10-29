import React from 'react';
import { useState, useEffect } from 'react';
// import { useEffect } from 'react';
// import Checkbox from '@/Components/Checkbox';
// import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
// import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';



// Importing the images
import taglineBg from '../../../images/taglineBg.png';
import collage from '../../../images/collage.png';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
      return () => {
          reset('password', 'password_confirmation');
      };
  }, []);

  const submit = (e) => {
      e.preventDefault();

      post(route('register'));
  };
  
  const [dateOfBirth, setDateOfBirth] = useState('');
  
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-10">
        <div className="mb-4">
            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </div>
        <div className="mb-5 text-xl font-semibold">Sign Up</div>
        
        <form onSubmit={submit}>
        <div className="mb-4">
          <div className="flex items-center border-b border-pink-300">
            <span className="pr-2 text-red-500">👤</span>
            <TextInput 
               id="name"
               name="name"
               value={data.name}
               className="outline-none py-2 focus:border-b-2 focus:border-pink-300" 
               autoComplete="name"
               isFocused={true}
               onChange={(e) => setData('name', e.target.value)}
               placeholder="Name" 
               required
              />
              <InputError message={errors.name} className="mt-2" />

          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center border-b border-pink-300">
            <span className="pr-2 text-red-500">@</span>
            <TextInput 
             id="email"
             type="email"
             name="email"
             value={data.email}
             className="outline-none py-2 focus:border-b-2 focus:border-pink-300" 
             autoComplete="username"
             onChange={(e) => setData('email', e.target.value)}
             placeholder="Email" 
             required
            />
            <InputError message={errors.email} className="mt-2" />

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
          <div className="flex items-center border-b border-pink-300">
            <span className="pr-2 text-red-500">🔒</span>
            <TextInput 
             id="password"
             type="password"
             name="password"
             value={data.password}
             placeholder="Password" 
             className="outline-none py-2 focus:border-b-2 focus:border-pink-300" 
             autoComplete="new-password"
             onChange={(e) => setData('password', e.target.value)}
             required
             />
            <InputError message={errors.password} className="mt-2" />

          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center border-b border-pink-300">
            <span className="pr-2 text-red-500">🔒</span>

            <TextInput 
             id="password_confirmation"
             type="password"
             name="password_confirmation"
             value={data.password_confirmation}
             placeholder="Confirm Password" 
             className="outline-none py-2 focus:border-b-2 focus:border-pink-300" 
             autoComplete="new-password"
             onChange={(e) => setData('password_confirmation', e.target.value)}
             required
             />

            <InputError message={errors.password_confirmation} className="mt-2" />

          </div>
        </div>

        {/* link to redirect to login page */}
        <div className="mb-4">
        <Link
          href={route('login')}
          className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          > Already registered?
        </Link>
        </div>

        <div>
     
          <button 
            className="bg-pink-500 hover:bg-pink-400 text-white py-2 px-4 rounded-full"
            disabled={processing}>
            Sign Up
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
  );
}



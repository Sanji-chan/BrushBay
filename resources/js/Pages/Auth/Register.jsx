import React from 'react';
import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

import Axios from 'axios';

//import Navbar and Footer
import Navbar from "../../Components/Navbar";
import Footer from '../../Components/Footer';


// Importing the images
import taglineBg from '../../../images/taglineBg.png';
import collage from '../../../images/collage.png';
// import { getTags } from '@/apiCalls';

async function getTags() {
  let result = await fetch("http://127.0.0.1:8000/api/tag/");
  result = await result.json();
  return result;
}

export default function Register() {
  const [step, setStep] = useState(1);
  const [selectedCards, setSelectedCards] = useState([]);

  const [tags, setTags] = useState([]);
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

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const { preferences, setPreferences } = useState();

  useEffect(() => {
    getTags().then((res) => {
      setTags(res);
    });
  }, []);

  useEffect(() => {
      return () => {
          reset('password', 'password_confirmation');
      };
  }, []);

  const submit = (e) => {
      e.preventDefault();

      let userTags = selectedCards.toString();
      post(route('register'));
      Axios.post('http://127.0.0.1:8000/api/userPrefs', {
        email: data["email"],
        preferences: userTags,
      });
  };
  

  
  return (

    <>
    <Navbar/>
    
    <div className="flex h-screen">

      {/* Left Side */}
      <div className="flex flex-col justify-center  text-center items-center w-full md:w-1/2 bg-white p-10">
      { step === 1 ? (<div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-10">
        <div className="mb-4">
            <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        </div>
        <div className="mb-5 text-xl font-semibold">Sign Up</div>
        
        {/* <form onSubmit={submit}> */}
        <form>
        <div className="mb-4">
          <div className="flex items-center border-b border-pink-300">
            <span className="pr-2 text-red-500">👤</span>
            <input 
               id="name"
               name="name"
               value={data.name}
               className="border-none outline-none py-2 focus:border-b-2 focus:border-pink-300" 
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
            <input 
             id="email"
             type="email"
             name="email"
             value={data.email}
             className="border-none outline-none py-2 focus:border-b-2 focus:border-pink-300" 
             autoComplete="username"
             onChange={(e) => setData('email', e.target.value)}
             placeholder="Email" 
             required
            />
            <InputError message={errors.email} className="mt-2" />

          </div>
        </div>
      
        <div className="mb-4">
          <div className="flex items-center border-b border-pink-300">
            <span className="pr-2 text-red-500">🔒</span>
            <input 
             id="password"
             type="password"
             name="password"
             value={data.password}
             placeholder="Password" 
             className="border-none outline-none py-2 focus:border-b-2 focus:border-pink-300" 
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

            <input 
             id="password_confirmation"
             type="password"
             name="password_confirmation"
             value={data.password_confirmation}
             placeholder="Confirm Password" 
             className="border-none outline-none py-2 focus:border-b-2 focus:border-pink-300" 
             autoComplete="new-password"
             onChange={(e) => setData('password_confirmation', e.target.value)}
             required
             />

            <InputError message={errors.password_confirmation} className="mt-2" />

          </div>
        </div>

        {/* link to redirect to login page */}
        <div className="justify-center text-center">
        <Link
          href={route('login')}
          className=" underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          > Already registered?
        </Link>
        </div>

        {/* <div>
     
          <button 
            className="bg-pink-500 hover:bg-pink-400 text-white py-2 px-4 rounded-full"
            disabled={processing}>
            Sign Up
          </button>
        </div> */}

        <div className="flex justify-center items-center">
            <button 
                onClick={handleArrowClick} 
                className="bg-pink-500 hover:bg-pink-300 rounded-full w-12 h-12 mt-4 flex items-center text-white justify-center"
            >
                ⟶
            </button>
        </div>

        </form>
      </div>) : (
              <div>
                <div className="flex  justify-between items-start mb-4"> {/* New div to space out back arrow and title */}
                <button 
                  onClick={() => setStep(1)} 
                  className="bg-pink-500 hover:bg-pink-300 rounded-full px-3 py-2 mr-2 text-white"
                >
                  ⟵
                </button>
                <h1 className='text-black font-extrabold text-3xl text-center mb-8'>Select your <span className='text-pink-500'>Favorite</span> Categories</h1>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {tags.map((card, index) => (
                      <div
                        key={index}
                        onClick={() => handleCardClick(card.name)}
                        className={`relative card bg-pink-500 hover:bg-pink-300 text-center text-white py-10 px-8 rounded-md ${selectedCards.includes(card.name) ? 'border-2 border-white' : ''}`}
                      >
                        {card.name}
                        <button 
                          onClick={(e) => {
                            handleCardClick(card.name);
                            e.stopPropagation();  // prevent parent click
                          }}
                          className={`absolute top-1 right-1 w-4 h-4 rounded-full ${selectedCards.includes(card.name) ? "bg-pink-300" : "bg-white"}`}
                        >
                          {selectedCards.includes(card.name) ? "" : ""}
                        </button>
                      </div>
                    ))}
                  </div>
              <div className='flex justify-center items-center mt-8'>
                  <button className="bg-pink-500 hover:bg-pink-400 text-white text-center py-2 px-4 rounded-full" onClick={submit}>Sign Up</button>
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
    <Footer/>
    </>
  );
}



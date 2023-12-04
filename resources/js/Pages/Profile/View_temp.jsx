import React from "react";
import ColumnSection from './Partials/ColumnSection';
import ImageSection from './Partials/ImageSection';
import  Axios  from "axios";
import { useEffect, useState } from 'react';

import Navbar from "../../Components/Navbar";
import Footer from '../../Components/Footer';

import profilepic from './img/profile-placeholder.jpg';
import bg from './img/background-placeholder.jpg';

export default function View({ auth, userid }){
  console.log("page id is:", userid);

    // get profile information
    const [record, setRecord] = useState([]);
    useEffect(()=>{
        Axios.get(`http://127.0.0.1:8000/api/getProfileInfo/${userid}`)
            .then(res=>{setRecord(res.data)})
            .catch(error=>console.log(error))
    }, [] );

    //show image
    const [imageSrc, setImageSrc] = useState(null);
    useEffect(() => { 
        const parsedUserId = parseInt(userid, 10); // Parse userId as an integer
        if (isNaN(parsedUserId)) {
        console.error('Invalid user ID');
        return;
        }

        Axios.get(`http://127.0.0.1:8000/api/get-profileimage/${parsedUserId}`, { responseType: 'blob' })
        .then((response) => {
            const url = URL.createObjectURL(new Blob([response.data]));
            setImageSrc(url);
        })
        .catch((error) => {
            console.error('Error fetching image:', error);
        });
    }, [userid]);



  return (
    <>
     <Navbar  auth = {auth} />
    <div className="flex justify-center font-sans bg-slate-50">
      
      <div className="flex flex-col items-center">
      {/* <div>
           <h2>Id: { record.id}</h2> 
           <h2>Name: { record.name}</h2> 
           <h2>email: { record.email}</h2> 
           <h2>pCoins: { record.pcoins}</h2> 
           <h2>preferences: { record.preferences}</h2> 
           <h2>Daily bid count: { record.bid_count}</h2> 

        </div>            */}

        {/* PROFILE SECTION */}
        <div className="relative w-[120%] h-64 rounded-b-lg bg-cover bg-center bg-[url(../public/img/nahin-background.jpg')]"
              style={{ 
                backgroundImage: `url(${bg})`, 
              }}>
          <div className="absolute -bottom-10 left-10 flex">
              
            {/* Profile picture */}
            { (imageSrc && (
                  <img
                  src={imageSrc} 
                  className="h-32 w-32 rounded-full border-4 border-white bg-white"
                  style={{
                    boxShadow: "7px 5px 20px 0px rgba(0, 0, 0, 0.3)",
                    backgroundColor: "#fff",
                  }}
              />
            )) || (  
            
            <img
            
                className="h-32 w-32 rounded-full bg-cover bg-center border-4 border-white bg-white"
                style={{
                  backgroundImage: `url(${profilepic})`, 
                  boxShadow: "7px 5px 20px 0px rgba(0, 0, 0, 0.3)",
                  backgroundColor: "#fff",
                }}
               />
            )}
            

            {/* Name */}
            <div className="flex h-14 mt-4 ml-8">
              <div>
                <div className="text-xl font-bold">{ record.name}</div>
                <div className="text-sm font-medium text-gray-600">{ record.email}</div>
                
                {/* <div className="text-sm font-medium text-gray-600">{ record.email}</div> */}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="absolute bottom-4 right-4 flex items-center justify-center">
            <div class="mr-6 pr-6 text-center border-r border-grey-100">
              <span class="text-3xl font-bold">142</span>
              <p class="text-m font-medium text-gray-600">Views</p>
            </div>

            <div class="mr-6 pr-6 text-center border-r border-grey-100">
              <span class="text-3xl font-bold">201</span>
              <p class="text-m font-medium text-gray-600">Likes</p>
            </div>

            <div class="pr-6 text-center">
              <span class="text-3xl font-bold">3.2K</span>
              <p class="text-m font-medium text-gray-600">Followers</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full m-16">
          {/* LEFT COLUMN */}
          <div className="flex flex-col w-1/4 mr-5">
            <ColumnSection
              title="Dummy Title"
              options={["Dummy Text", "Dummy Text", "Dummy Text"]}
            />
            <ColumnSection
              title="Dummy Title"
              options={["Dummy Text", "Dummy Text", "Dummy Text", "Dummy Text"]}
            />
          </div>

          {/* IMAGES CONTAINER */}
          <div className="w-3/4 flex  flex-wrap rounded-lg border bg-white">

           {/* <div className="flex flex-row w-full">
            <p className="ml-2 font-bold">Your paintings</p>
           </div> */}

           {/* <p className="ml-2 font-bold">{title}</p> */}
            <ImageSection title="Dummy Title" subtitle="Dummy Text" />
            <ImageSection title="Dummy Title" subtitle="Dummy Text" />
            <ImageSection title="Dummy Title" subtitle="Dummy Text" />
            <ImageSection title="Dummy Title" subtitle="Dummy Text" />
            <ImageSection title="Dummy Title" subtitle="Dummy Text" />
            <ImageSection title="Dummy Title" subtitle="Dummy Text" />
            
          </div>
         
          
        </div>
      </div>
      
    </div>
     <Footer />
     </>
  );
};




import React from "react";
import ColumnSection from './ProfileView/ColumnSection';
import ImageContainer from './ProfileView/ImageContainer';

import  Axios  from "axios";
import { useEffect, useState } from 'react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import profilepic from './img/profile-placeholder.jpg';
import bg from './img/background-placeholder.jpg';



const View = ({auth, userid, owned, created} ) => {
  
  
    // get profile information
    const [record, setRecord] = useState([]);
    useEffect(()=>{
        Axios.get(`http://127.0.0.1:8000/api/getProfileInfo/${userid}`)
            .then(res=>{setRecord(res.data)})
            .catch(error=>console.log(error.data))
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


    //get painting owned


    //get painting created




    console.log("page data  is", record, created, owned);

  
  const POSTS = [
    { title: "Dummy Title", subtitle: "Dummy Text" },
    { title: "Dummy Title", subtitle: "Dummy Text" },
    { title: "Dummy Title", subtitle: "Dummy Text" },
    { title: "Dummy Title", subtitle: "Dummy Text" },
    { title: "Dummy Title", subtitle: "Dummy Text" },
    { title: "Dummy Title", subtitle: "Dummy Text" },
  ];

  return (
    <AuthenticatedLayout
    user={auth.user}   
    header={record.name+"'s Profile"}   
  >
         <div className="flex justify-center font-sans bg-slate-50">
      <div className="flex flex-col items-center">
        {/* PROFILE SECTION */}
        <div className="relative w-[80%] h-64 rounded-b-lg bg-cover bg-center bg-[url('../public/img/nahin-background.jpg')]"
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
                <div className="text-sm font-medium text-gray-600">
                { record.email}
                </div>
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

        <div className="flex flex-row w-[80%] mt-16">
          {/* LEFT COLUMN */}
          <div className="flex flex-col w-1/4 mr-4">
            <ColumnSection
              title="User preferences"
              options={["Dummy Text", "Dummy Text", "Dummy Text"]}
            />
            <ColumnSection
              title="Dummy Title"
              options={["Dummy Text", "Dummy Text", "Dummy Text", "Dummy Text"]}
            />
          </div>
          {/* RIGHT COLUMN (Images Section) */}
          <div className="w-3/4 flex flex-col gap-y-5">
            {/* Heading for the Owned Paintings */}
            <h2 className="text-2xl font-bold mb-0">Owned Paintings</h2>
            {owned.length > 0 ? 
              <ImageContainer posts={owned} />
              :
              <div  className="w-full flex flex-wrap rounded-lg p-4 border bg-white"> This user does not own paintings yet.</div>
            }

            {/* Heading for the Created Paintings */}
            <h2 className="text-2xl font-bold mb-0">Created Paintings</h2>
            {created.length > 0 ? 
              <ImageContainer posts={created} />
              :
              <div  className="w-full flex flex-wrap rounded-lg p-4 mb-16 border bg-white">This user has not created any paintings yet.</div>
            }
            
          </div>
        </div>
      </div>
    </div>

    </AuthenticatedLayout>
 
  );
};

export default View;

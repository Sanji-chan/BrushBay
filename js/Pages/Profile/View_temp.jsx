import  Axios  from "axios";
import react from "react";
import { useEffect, useState } from 'react';

export default function View({ userid }){

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


    return(
        <div>
            <div className="">
                {/* <img className="img-thumbnail" width="150" height="150"  src="http://127.0.0.1:8000/public/storage/userimages/placeholder.png"  alt="#Image Here"/> */}
                {imageSrc && (
                    <img  
                    className="mt-1" 
                    src={imageSrc} 
                    alt="Profile Image" 
                    width="250" 
                    height="250" />
                )}
                </div>            
           <h2>Id: { record.id}</h2> 
           <h2>Name: { record.name}</h2> 
           <h2>email: { record.email}</h2> 
           <h2>pCoins: { record.pcoins}</h2> 
           <h2>preferences: { record.preferences}</h2> 
           <h2>Daily bid count: { record.bid_count}</h2> 
           {/* <h2>{ record.email}</h2> 
           <h2>{ record.email}</h2> 
           <h2>{ record.email}</h2>  */}




        </div>           
)}
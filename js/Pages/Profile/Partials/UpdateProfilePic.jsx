// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { usePage } from '@inertiajs/react';
// import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';

import Axios from 'axios';
// import react from 'react';



import profilepic from '../img/profile-placeholder.jpg';


export default function UpdateProfilePic({  className = '' }) {
     //update image
    const user = usePage().props.auth.user;
    const [imagedata, setImagedata] = useState('');

    const handleChange = file => {
        setImagedata(file[0]);
    };

    const submitdata = (e) => {
        e.preventDefault();
        const fData =new FormData();
        fData.append('image', imagedata);
        fData.append('user_id', user.id);

        Axios.post('http://127.0.0.1:8000/api/upload-profileimage', fData)
        .then(res => {
            console.log('Response', res);
        })
        .catch(e => {
            console.error('Failue', e.response.data);
        });
    };



    //show image
    const [imageSrc, setImageSrc] = useState(null);
    useEffect(() => { 
        const parsedUserId = parseInt(user.id, 10); // Parse userId as an integer
        if (isNaN(parsedUserId)) {
        console.error('Invalid user ID');
        return;
        }

        axios.get(`http://127.0.0.1:8000/api/get-profileimage/${parsedUserId}`, { responseType: 'blob' })
        .then((response) => {
            const url = URL.createObjectURL(new Blob([response.data]));
            setImageSrc(url);
            console.log(url);
        })
        .catch((error) => {
            console.error('Error fetching image:', error);
        });
    }, [user.id]);
  
    return (
        
        <div >
           <form method="post" onSubmit={submitdata} className="">
                <div>
                    {/* <InputLabel htmlFor="profile_pic" value="Change image" /> */}

                    <div className="flex flex-col justify-center items-center">
                        {/* Profile picture */}
                        { (imageSrc && (
                            <img
                            src={imageSrc} 
                            className="h-64 w-64 rounded-full border-4 border-white bg-white"
                            style={{
                                boxShadow: "7px 5px 20px 0px rgba(0, 0, 0, 0.3)",
                                backgroundColor: "#fff",
                            }}
                        />
                        )) || (  
                        
                        <img
                        // src={imageSrc} 
                            className="h-64 w-64 rounded-full bg-cover bg-center border-4 border-white bg-white"
                            style={{
                            backgroundImage: `url(${profilepic})`, 
                            boxShadow: "7px 5px 20px 0px rgba(0, 0, 0, 0.3)",
                            backgroundColor: "#fff",
                            }}
                        />
                        )}
                    </div>

                    <TextInput
                        id="userimg_link"
                        type="file"
                        name="userimg_link"  
                        className="mt-10 block w-full focus:border-none"
                        onChange={e => handleChange(e.target.files)}
                        required
                        isFocused
                        autoComplete="userimg_link"
                    />

                </div>


                <div className="flex items-center gap-4">
                    <PrimaryButton className="mt-2" type="submit" onClick={submitdata}>Upload</PrimaryButton>

                    {/* <PrimaryButton disabled={processing}  className="mt-2" type="submit" onClick={submitdata}>Upload</PrimaryButton>
                    
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Uploaded.</p>
                    </Transition> */}
                </div>
                
                </form>
        </div>
    );
}

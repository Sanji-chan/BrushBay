import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import UpdateProfilePic from './UpdateProfilePic';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import React from 'react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const today = new Date().toISOString().split("T")[0];


    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        dob: user.dob, // Ensure that user.dob is in a proper date format (e.g., 'YYYY-MM-DD').
        preferences: user.preferences
    });
    
    
    const submit = (e) => {
        e.preventDefault();

        console.log(data);
        patch(route('profile.update'), {
        dob: data.dob,
        preferences: data.preferences, // Send the date in the proper format to the Laravel backend.
        });

    };

    return (
        <section>
            <header>
                    <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Update your account's profile information and email address.
                    </p>
                </header>

        
        <div className="flex  mt-6 space-y-6">
            <div className="flex flex-col md:w-1/3 bg-white"> {/* Updated for full width on small screens */}
                
                <UpdateProfilePic                    
                        className="max-w-xl justify-center items-center "
                />

            </div>

        
        <div className= 'flex flex-col md:w-2/3 '>
            

            <form onSubmit={submit} className="max-w-xl ">
                <div className='my-4'>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className='my-4'>
                    <InputLabel htmlFor="dob" value="Date of Birth" />

                    <TextInput
                        id="dob"
                        type="date"
                        className="mt-1 block w-full"
                        value={data.dob}
                        onChange={(e) => setData('dob', e.target.value)}
                        max={today}
                        required
                        isFocused
                        autoComplete="dob"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className='my-4'>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex mt-2 items-center gap-4">
                    <button disabled={processing} className='bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded'>Save</button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </div>
        </div>
        </section>
    );
}

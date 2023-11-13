import { Link, Head } from '@inertiajs/react';
import React from 'react';
import Hero from './Landing/Hero';
import PcoinBanner from './Landing/PcoinBanner';
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import LandingCollage from '../../images/LandingCollage.png';


export default function Welcome({ auth, laravelVersion, phpVersion }) {
    
    return (
        <>
            <Navbar  auth = {auth} />
            <Hero />
            <PcoinBanner />
            <img src={LandingCollage} alt="Art Collage" className="w-full h-screen" />
            <Footer />
        </>
    );
}

import React from 'react';
import Hero from './Hero';
import PcoinBanner from './PcoinBanner';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import LandingCollage from '../../images/LandingCollage.png';

function Landing() {
  return (
    <div>
    <Navbar/>
      <Hero />
      <PcoinBanner />
      <img src={LandingCollage} alt="Art Collage" className="w-full h-screen" />
      <Footer />
    </div>
  );
}

export default Landing;

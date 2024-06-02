import React, { useState } from 'react';
import './styles/Login.css';
import HeroSection from './HeroSection'; 
import FindArea from './FindArea';
import Counter from './Counter';
import Breedservices from './BreedServices';
import FAQ from './FAQ';
import Newsletter from './Newsletter';

const Home = () => {

    return (
        <div >
            <HeroSection />
            <FindArea></FindArea>
            <Counter></Counter>
            <Breedservices />
            <FAQ />
            <Newsletter></Newsletter>
        </div>
    );
}

export default Home;

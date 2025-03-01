import React from 'react';
import { SearchBar } from '../components/SearchBar';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {Hero} from '../components/Hero';
import { Features } from '../components/Features';
import Stats from '../components/Stats';
import {CallToAction} from '../components/CallToAction';
import {NewsSection} from '../components/NewsSection';
import {useClerk} from '@clerk/clerk-react';

export function Home() {
  const {user} = useClerk();
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex-grow">
        <Navbar />
        <main >
          <Hero />
          <Stats />
          <Features />
          <NewsSection />
          <CallToAction />
        </main>
          
      </div>
      
      <Footer />
    </div>
  );
}
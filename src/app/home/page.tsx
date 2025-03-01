"use client";
import React from 'react';
import { SearchBar } from '../../components/searchBar';
import { Hero } from '../../components/Hero';
import { Features } from '../../components/Features';
import Stats from '../../components/Stats';
import { CallToAction } from '../../components/CallToAction';
import { NewsSection } from '../../components/NewsSection';
import { useClerk } from '@clerk/clerk-react';

export default function Home() {
    const { user } = useClerk();
    return (
        <div className="relative min-h-screen flex flex-col">
            <div className="flex-grow">
                <main >
                    <Hero />
                    <Stats />
                    <Features />
                    <NewsSection />
                    <CallToAction />
                </main>

            </div>
        </div>
    );
}
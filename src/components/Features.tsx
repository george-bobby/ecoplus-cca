"use client";
import React, { useEffect, useRef } from 'react';
import { Thermometer, Wind, Droplets, TreePine } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Thermometer className="w-12 h-12 text-green-500 mb-4" />,
    title: 'Temperature Tracking',
    description: 'Monitor global and local temperature changes with precise data visualization.',

  },
  {
    icon: <Wind className="w-12 h-12 text-green-500 mb-4" />,
    title: 'Air Quality Index',
    description: 'Real-time air quality measurements and pollution level monitoring.',

  },
  {
    icon: <Droplets className="w-12 h-12 text-green-500 mb-4" />,
    title: 'Precipitation Data',
    description: 'Track rainfall patterns and analyze precipitation trends over time.',
  },
  {
    icon: <TreePine className="w-12 h-12 text-green-500 mb-4" />,
    title: 'Forest Coverage',
    description: 'Monitor deforestation rates and forest conservation efforts globally.',
  },
];

export function Features() {
  const featuresRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse',
        },
      });
    }, featuresRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={featuresRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Track What Matters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              {feature.icon} {/* Render the icon directly */}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

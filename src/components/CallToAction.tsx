
"use client";
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Heart, TreePine } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const actions = [
  {
    icon: Users,
    title: 'Join Community',
    description: 'Connect with climate activists and make a difference together.',
    buttonText: 'Join Now',
    link: 'https://www.instagram.com/cca.christ/?igsh=ZnhkeDFsNmoxeHBj#'
  },
  {
    icon: Heart,
    title: 'Donate',
    description: 'Support organizations fighting climate change globally.',
    buttonText: 'Donate',
    link: 'https://sankalptaru.org/location/'
  },
  {
    icon: TreePine,
    title: 'Volunteer',
    description: 'Participate in local tree-planting and clean-up events.',
    buttonText: 'Get Started',
    link: 'https://chat.whatsapp.com/D3dPl12GYDaGksPmOKrRPD'
  },
  
];

export function CallToAction() {
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-card', {
        rotationY: -180,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top center+=100'
        }
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ctaRef} className="py-20 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Get Involved</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actions.map((action, index) => (
            <div key={index} className="cta-card bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <action.icon className="w-12 h-12 text-green-500 mb-6 mx-auto" />
              <h3 className="text-2xl font-semibold text-center mb-4">{action.title}</h3>
              <p className="text-gray-600 text-center mb-6">{action.description}</p>
              {action.link ? (
                <a
                  href={action.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block text-center bg-green-500 text-white py-3 rounded-full hover:bg-green-600 transition-colors"
                >
                  {action.buttonText}
                </a>
              ) : (
                <button className="w-full bg-green-500 text-white py-3 rounded-full hover:bg-green-600 transition-colors">
                  {action.buttonText}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

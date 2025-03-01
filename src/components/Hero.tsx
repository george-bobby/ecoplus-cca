"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef(null);
  const router = useRouter(); // ✅ Renamed to `router`

  const titleText = "The Future of Our Planet is in Our Hands";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title span", {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: "power4.out",
      });

      gsap.from(".hero-button", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1,
        ease: "power4.out",
        stagger: 0.2,
      });

      gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="hero-title text-6xl font-bold mb-6">
          {titleText.split(" ").map((word, index) => (
            <span key={index} className="inline-block">
              {word}&nbsp;
            </span>
          ))}
        </h1>
        <p className="hero-subtitle text-xl mb-12">
          Explore real-time climate data, track temperature changes,
          <br /> carbon emissions, and more.
        </p>
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => router.push("/live")} // ✅ Fixed navigation
            className="hero-button bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Start Tracking Now
          </button>
          <a
            href="https://christuniversity.in/center/C/SDGC/climate%20action"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-green-900 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

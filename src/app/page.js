"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import "./page.css";

const TechFestSection = () => {
  useEffect(() => {
    // Animating the text when the component mounts
    gsap.from("#hero-content h1", {
      opacity: 0,
      y: -50,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from("#hero-content p", {
      opacity: 0,
      y: 20,
      duration: 1.5,
      delay: 0.3,
      ease: "power3.out",
    });

    const calculateButton = document.querySelector("a[href='/calculator']");

    const handleMouseEnter = () => {
      gsap.to(calculateButton, {
        backgroundColor: "#2ECC71",
        color: "#ffffff",
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
        borderColor: "#016837",
        duration: 0.3,
        scale: 1.1, // Scale effect on hover
      });
    };

    const handleMouseLeave = () => {
      gsap.to(calculateButton, {
        backgroundColor: "transparent",
        color: "#00695C",
        boxShadow: "none",
        borderColor: "#B2DFDB",
        duration: 0.3,
        scale: 1, // Reset scale after hover
      });
    };

    if (calculateButton) {
      calculateButton.addEventListener("mouseenter", handleMouseEnter);
      calculateButton.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (calculateButton) {
        calculateButton.removeEventListener("mouseenter", handleMouseEnter);
        calculateButton.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="mx-8 mt-8">
      <div
        id="hero-section"
        className="pt-20 pb-40 rounded-2xl max-w-7xl m-auto"
      >
        <div
          id="hero-content"
          className="max-w-md m-auto text-center font-sans"
        >
          <h1
            className="font-bold text-shadow text-5xl text-white hover:text-green-400 transition duration-300 ease-in-out"
            id="hero-title"
          >
            MEASURE. REDUCE. SUSTAIN.
          </h1>
          <p
            className="font-semibold text-shadow text-purple-200 mt-5 font-sans text-xl"
            id="hero-description"
          >
            Measure your carbon footprint, reduce your impact, and build a
            greener future with Carbo.
          </p>
          <Link href="/calculator">
            <button className="flex m-auto mt-10 items-center justify-between overflow-hidden w-48 shadow-xl hover:shadow-2xl text:transparent transition transform hover:-translate-y-1 ease padding rounded-full m-3 text-green-700 font-bold bg-gradient-to-r from-green-300 to-green-200 hover:scale-105">
              <span className="pl-8">Calculate Now</span>
              <span className="px-3 py-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default function Page() {
  return (
    <>
      <div
        className="min-h-screen bg-[#A5D6A7] py-6 flex flex-col gap-6 px-4 sm:px-6 md:px-10 lg:px-16"
        style={{
          backgroundImage: "url('/earth3.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* TechFest Section */}
        <TechFestSection />

        {/* FAQ Section */}
        <section className="bg-[#AED581] py-8 px-6 sm:px-8 md:px-12 rounded-xl shadow-xl mt-10">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-8 text-gray-800">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[{
              question: "What is a carbon footprint?",
              answer: "A carbon footprint is the total amount of greenhouse gases, primarily carbon dioxide, released into the atmosphere as a result of human activities such as transportation, energy consumption, and industrial processes."
            }, {
              question: "Why should I track my carbon footprint?",
              answer: "Tracking your carbon footprint allows you to understand the environmental impact of your daily activities and make necessary changes to reduce it."
            }, {
              question: "How does Carbo calculate my carbon footprint?",
              answer: "Carbo calculates your carbon footprint using factors like travel distance, vehicle type, energy usage, and lifestyle choices, estimating your emissions with established emission factors."
            }, {
              question: "What can I do to reduce my carbon footprint?",
              answer: "To reduce your carbon footprint, consider using public transportation, driving fuel-efficient vehicles, conserving energy, recycling, and supporting sustainable practices."
            }, {
              question: "How often should I check my carbon emissions on Carbo?",
              answer: "You should check your carbon emissions regularly to monitor your progress, with monthly checks being a good practice."
            }, {
              question: "Is Carbo available on mobile devices?",
              answer: "Yes, Carbo is mobile-friendly, allowing you to track your emissions and access resources easily from your phone."
            }, {
              question: "Is my data safe and secure with Carbo?",
              answer: "Yes, Carbo uses strong encryption to ensure your personal information and carbon data are securely stored and protected."
            }, {
              question: "How can I provide feedback or report issues with Carbo?",
              answer: "We value your feedback! You can share your thoughts or report any issues via our feedback section or directly contact our support team."
            }].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all ease-in-out hover:scale-105"
              >
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                  {item.question}
                </h4>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

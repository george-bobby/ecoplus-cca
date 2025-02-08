"use client";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Link from "next/link";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Handle screen size change
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Set to 768px for small screens
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const footerItems = [
    { name: "Dashboard", icon: "/dashboard.png" },
    { name: "Calculator", icon: "/keys.png" },
    { name: "Chatbot", icon: "/chatbot.png" },
  ];

  const headerItems = [
    "Dashboard",
    "Calculator",
    "News",
    "Carpool",
    "Shop",
    "Ecocenter",
    "Chatbot",
  ];

  return (
    <>
      {/* Main Header */}
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between bg-[#D7ECD9] px-5 py-4">
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between">
          {/* Header Image */}
          <Link href="/">
            <div className="rounded-xl h-14 w-auto">
              <img
                className="w-full h-full object-cover rounded-lg"
                src="/imag1.webp"
                alt="Carbo"
                width={876}
                height={156}
              />
            </div>
          </Link>

          {/* Hamburger Menu Button */}
          <div className="block md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#444444] focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } md:flex gap-4 items-center mt-4 md:mt-0 w-full md:w-auto`}
          >
            <div className="flex flex-col md:flex-row gap-4">
              {headerItems
                .filter(
                  (item) =>
                    !isSmallScreen ||
                    !["Dashboard", "Calculator", "Chatbot"].includes(item)
                )
                .map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-[#444444] py-2 px-3 rounded-lg font-medium hover:bg-[#d4d4c1] transition duration-500" // Slower transition
                    onClick={() => setMenuOpen(false)} // Close menu after navigation
                  >
                    {item}
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Profile Section */}
        {!isSmallScreen && ( // Hide on smaller screens
          <div className="relative flex items-center justify-end group mt-4 md:mt-0 hidden md:flex">
            <ClerkLoading>
              <Spinner color="black" />
            </ClerkLoading>

            <ClerkLoaded>
              <SignedIn>
                <div className="relative group">
                  <div className="w-auto flex items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-105 active:scale-95"> {/* Slower transform */}
                    <UserButton
                      afterSignOutUrl="/"
                      style={{
                        transform: "scale(2.5)",
                        borderRadius: "50%",
                        marginRight: "10px",
                        overflow: "hidden",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </div>
                </div>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <div className="relative w-auto rounded-lg flex items-center justify-center bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white py-2 px-6 font-medium cursor-pointer shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-xl active:scale-95"> {/* Slower transition */}
                    <span className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m-3 0h12m-12 0a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25-2.25-2.25m-12 0V5.25M9 14.25h6"
                        />
                      </svg>
                      Sign In / Sign Up
                    </span>
                  </div>
                </SignInButton>
              </SignedOut>
            </ClerkLoaded>
          </div>
        )}
      </div>

      {/* Footer for smaller screens */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#D7ECD9] flex justify-around items-center py-3 md:hidden border-t border-gray-300 z-[9]">
        {footerItems.map((item, index) => (
          <div
            key={item.name}
            className="relative flex flex-col items-center group"
            onMouseEnter={() => setExpandedItem(index)}
            onMouseLeave={() => setExpandedItem(null)}
            onClick={() =>
              setExpandedItem((prev) => (prev === index ? null : index))
            }
          >
            <Link
              href={`/${item.name.toLowerCase()}`}
              className={`relative flex items-center gap-2 transition-all duration-500 ease-in-out ${ // Slower transition
                expandedItem === index ? "w-auto" : "w-12"
              }`}
            >
              <div
                className={`text-[#444444] flex items-center justify-center rounded-full w-12 h-12 hover:bg-[#d4d4c1] transition duration-500 ${ // Slower transition
                  expandedItem === index ? "bg-[#d4d4c1]" : ""
                }`}
              >
                <img src={item.icon} alt={item.name} className="w-6 h-6" />
              </div>

              {expandedItem === index && (
                <span className="bg-[#d4d4c1] text-[#444444] text-xs font-medium rounded px-2 py-1 shadow-lg whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </Link>
          </div>
        ))}
        <UserButton
          afterSignOutUrl="/"
          style={{
            transform: "scale(1.5)",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        />
      </div>
    </>
  );
}

export default Header;

"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarGraph from "./barGraph";
import PieChart from "./pieChart";
import EquivalenciesTable from "./eqvTable";

Chart.register(CategoryScale);
Chart.defaults.font.size = 20;

export default function UserProfile() {
  const { user } = useUser();

  return (
    <div
      className="relative bg-[#e8e6d7] min-h-screen"
      style={{
        backgroundImage: "url('/imaged1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(100%)",
      }}
    >
      {/* Overlay to fade background */}
      <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

      {/* Foreground content */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold py-6 text-white text-opacity-90 text-center">
          Hello {user?.firstName}, Tracking Since{" "}
          {user?.createdAt.toLocaleDateString()}
        </h1>

        {/* Main content */}
        <div className="space-y-8">
          {/* Row 1: Pie Chart and Equivalencies Table */}
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="p-6 border border-gray-300 shadow-lg rounded-lg w-full lg:w-1/2 bg-white bg-opacity-90">
              <PieChart clerkId={user?.id} />
            </div>
            <div className="p-6 border border-gray-300 shadow-lg rounded-lg w-full lg:w-1/2 bg-white bg-opacity-90">
              <EquivalenciesTable clerkId={user?.id} />
            </div>
          </div>

          {/* Row 2: Bar Graph */}
          <div className="flex justify-center">
            <div className="p-6 border border-gray-300 shadow-lg rounded-lg w-full lg:w-3/4 bg-white bg-opacity-90">
              <BarGraph clerkId={user?.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

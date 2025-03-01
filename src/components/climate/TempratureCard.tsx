import React from "react";
import { HeatMap } from "./HeatMap";
import { Card, CardContent } from "./card";

// Define the types for the 'coord' prop
interface TemperatureCardProps {
  coord: {
    lat: number;
    lon: number;
  };
}

export function TemperatureCard({ coord }: TemperatureCardProps) {
  return (
    <div className="w-full md:w-[500px] bg-white shadow-lg rounded-lg">

      <CardContent className="p-6">
        <h3 className="text-2xl font-semibold mb-4">Temperature Heat Map</h3>
        {coord && (
          <div className="w-full h-[500px] rounded-lg overflow-hidden">
            <HeatMap
              center={[coord.lat, coord.lon]}
              zoom={13}
              apiKey="1965ccbf28ec3943960a2e49ba7e4a04"
            />
          </div>
        )}
      </CardContent>
    </div>
  );
}

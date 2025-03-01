import React from "react";
import { useSearchParams } from 'next/navigation';
import { Sunrise, Sunset, Thermometer, Wind } from "lucide-react";
import { useWeatherData } from "../../whetherAPI";
import { TemperatureCard } from "./TempratureCard";  // Import the new TemperatureCard component
import { CardContent } from "./card";

export function DetailedStats() {
  const searchParams = useSearchParams(); // ✅ Direct assignment
  const location = searchParams.get("location") || "";
  const { currentWeather, loading, error } = useWeatherData(location);

  if (loading) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6">
        <p className="text-red-500">Error loading weather data: {error}</p>
      </div>
    );
  }

  // Ensure currentWeather.coord exists before passing it
  const coord = currentWeather?.coord ? currentWeather.coord : { lat: 0, lon: 0 };

  return (
    <div className="space-y-6 w-[1050px] mx-auto">
      <div className="flex flex-wrap gap-6 w-[1100px]">
        {/* Left Column: Detailed Statistics */}
        <div className="w-full md:w-[550px]  bg-white shadow-lg rounded-lg h-[400px]">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-4">Detailed Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Sunrise className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600">Sunrise</p>
                    <p className="font-semibold">
                      {currentWeather?.sys.sunrise
                        ? new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Thermometer className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-600">High / Low</p>
                    <p className="font-semibold">
                      {currentWeather?.main.temp_max
                        ? `${currentWeather.main.temp_max.toFixed(1)}°C`
                        : "N/A"} /{" "}
                      {currentWeather?.main.temp_min
                        ? `${currentWeather.main.temp_min.toFixed(1)}°C`
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Wind className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Wind Speed</p>
                    <p className="font-semibold">
                      {currentWeather?.wind.speed
                        ? `${currentWeather.wind.speed.toFixed(1)} m/s`
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Sunset className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600">Sunset</p>
                    <p className="font-semibold">
                      {currentWeather?.sys.sunset
                        ? new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="text-lg">🌡️</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Temperature</p>
                    <p className="font-semibold">
                      {currentWeather?.main.temp
                        ? `${currentWeather.main.temp.toFixed(1)}°C`
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="text-lg">💧</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Humidity</p>
                    <p className="font-semibold">
                      {currentWeather?.main.humidity
                        ? `${currentWeather.main.humidity}%`
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="text-lg">🌤️</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Weather Condition</p>
                    <p className="font-semibold">
                      {currentWeather?.weather[0]?.description
                        ? currentWeather.weather[0].description.charAt(0).toUpperCase() +
                          currentWeather.weather[0].description.slice(1)
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="text-lg">🌬️</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pressure</p>
                    <p className="font-semibold">
                      {currentWeather?.main.pressure
                        ? `${currentWeather.main.pressure} hPa`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Right Column: Temperature Heat Map */}
        <div className="w-full md:w-[300px]">
          <TemperatureCard coord={coord} />
        </div>
      </div>
    </div>
  );
}

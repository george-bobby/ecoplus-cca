import React from 'react';
import { ThermometerSun, Wind, Droplets, CloudRain, Sun, Gauge } from 'lucide-react';

interface CurrentConditionsProps {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  weatherIcon: string;
  description: string;
}

export function CurrentConditions({
  temperature,
  feelsLike,
  humidity,
  windSpeed,
  pressure,
  visibility,
  weatherIcon,
  description
}: CurrentConditionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <ThermometerSun className="w-6 h-6 text-yellow-500 mr-2" />
          <h3 className="font-semibold">Temperature</h3>
        </div>
        <div className="text-2xl font-bold">{temperature}°C</div>
        <div className="text-sm text-gray-600">Feels like {feelsLike}°C</div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <Droplets className="w-6 h-6 text-blue-500 mr-2" />
          <h3 className="font-semibold">Humidity</h3>
        </div>
        <div className="text-2xl font-bold">{humidity}%</div>
        <div className="text-sm text-gray-600">Relative Humidity</div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <Wind className="w-6 h-6 text-blue-500 mr-2" />
          <h3 className="font-semibold">Wind</h3>
        </div>
        <div className="text-2xl font-bold">{windSpeed} km/h</div>
        <div className="text-sm text-gray-600">Wind Speed</div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <CloudRain className="w-6 h-6 text-blue-500 mr-2" />
          <h3 className="font-semibold">Weather</h3>
        </div>
        <div className="flex items-center">
          <img 
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt={description}
            className="w-12 h-12"
          />
          <span className="text-sm capitalize">{description}</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <Sun className="w-6 h-6 text-yellow-500 mr-2" />
          <h3 className="font-semibold">Visibility</h3>
        </div>
        <div className="text-2xl font-bold">{visibility} km</div>
        <div className="text-sm text-gray-600">Clear View</div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center mb-2">
          <Gauge className="w-6 h-6 text-gray-500 mr-2" />
          <h3 className="font-semibold">Pressure</h3>
        </div>
        <div className="text-2xl font-bold">{pressure} hPa</div>
        <div className="text-sm text-gray-600">Stable</div>
      </div>
    </div>
  );
}
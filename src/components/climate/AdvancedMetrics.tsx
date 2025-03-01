import React from 'react';
import { Droplets, Wind, Gauge, Sun, CloudRain, Thermometer } from 'lucide-react';

interface AdvancedMetricsProps {
  data: {
    main: {
      pressure: number;
      temp: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    visibility: number;
    weather: Array<{
      main: string;
      description: string;
    }>;
  };
}

export function AdvancedMetrics({ data }: AdvancedMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Atmospheric Conditions</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Gauge className="w-5 h-5 text-blue-500 mr-2" />
              <span>Pressure</span>
            </div>
            <span className="font-semibold">{data.main.pressure} hPa</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Wind className="w-5 h-5 text-blue-500 mr-2" />
              <span>Wind Direction</span>
            </div>
            <span className="font-semibold">{data.wind.deg}°</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Droplets className="w-5 h-5 text-blue-500 mr-2" />
              <span>Visibility</span>
            </div>
            <span className="font-semibold">{data.visibility / 1000} km</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Current Conditions</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Thermometer className="w-5 h-5 text-red-500 mr-2" />
              <span>Temperature</span>
            </div>
            <span className="font-semibold">{data.main.temp}°C</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CloudRain className="w-5 h-5 text-blue-500 mr-2" />
              <span>Weather</span>
            </div>
            <span className="font-semibold capitalize">{data.weather[0].description}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Wind className="w-5 h-5 text-blue-500 mr-2" />
              <span>Wind Speed</span>
            </div>
            <span className="font-semibold">{Math.round(data.wind.speed * 3.6)} km/h</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Sun className="w-5 h-5 text-yellow-500 mr-2" />
              <span>Weather Type</span>
            </div>
            <span className="font-semibold">{data.weather[0].main}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Gauge className="w-5 h-5 text-blue-500 mr-2" />
              <span>Pressure Trend</span>
            </div>
            <span className="font-semibold">
              {data.main.pressure > 1013 ? 'High' : 'Low'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Wind className="w-5 h-5 text-blue-500 mr-2" />
              <span>Wind Category</span>
            </div>
            <span className="font-semibold">
              {data.wind.speed < 5 ? 'Light' : data.wind.speed < 10 ? 'Moderate' : 'Strong'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
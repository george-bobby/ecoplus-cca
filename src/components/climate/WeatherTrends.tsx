import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Wind } from 'lucide-react';

interface WeatherTrendsProps {
  data: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
      pressure: number;
    };
    wind: {
      speed: number;
    };
    pop: number;
  }>;
}

export function WeatherTrends({ data }: WeatherTrendsProps) {
  const [activeMetric, setActiveMetric] = useState<'temperature' | 'precipitation' | 'humidity' | 'wind'>('temperature');

  const formattedData = data.map(item => ({
    time: new Date(item.dt * 1000).toLocaleDateString(),
    temp: Math.round(item.main.temp),
    humidity: item.main.humidity,
    precipitation: Math.round(item.pop * 100),
    wind: Math.round(item.wind.speed * 3.6)
  }));

  const metrics = [
    { id: 'temperature', icon: Thermometer, label: 'Temperature', color: '#ff7c43' },
    { id: 'precipitation', icon: Droplets, label: 'Precipitation', color: '#4299e1' },
    { id: 'humidity', icon: Droplets, label: 'Humidity', color: '#667eea' },
    { id: 'wind', icon: Wind, label: 'Wind', color: '#48bb78' }
  ];

  const renderGraph = () => {
    switch (activeMetric) {
      case 'temperature':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 40]} />
              <Tooltip />
              <Line type="monotone" dataKey="temp" stroke="#ff7c43" name="Temperature (°C)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'precipitation':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="precipitation" fill="#4299e1" name="Precipitation (%)" />
            </BarChart>
          </ResponsiveContainer>
        );
        case 'humidity':
          return (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="humidity" stroke="#00b5d8" name="Humidity (%)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          );
        case 'wind':
          return (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="wind" stroke="#48bb78" name="Wind Speed (km/h)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          );
      // Add other cases for humidity and wind
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex space-x-4 mb-6">
        {metrics.map(({ id, icon: Icon, label, color }) => (
          <button
            key={id}
            onClick={() => setActiveMetric(id as typeof activeMetric)}
            className={`flex items-center px-4 py-2 rounded-full transition-colors ${
              activeMetric === id 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" style={{ color }} />
            {label}
          </button>
        ))}
      </div>
      {renderGraph()}
    </div>
  );
}
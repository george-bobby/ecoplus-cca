import React from 'react';
import { Wind, AlertTriangle, Gauge, ThermometerSun } from 'lucide-react';
import { getAQIDescription } from '../../services/weatherApi';

interface AirQualityDetailsProps {
  data: {
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no2: number;
      o3: number;
      pm2_5: number;
      pm10: number;
      so2: number;
      nh3: number;
    };
  };
}

const getPollutantLevel = (value: number, type: string) => {
  const levels = {
    pm2_5: { good: 12, moderate: 35.4, unhealthy: 55.4 },
    pm10: { good: 54, moderate: 154, unhealthy: 254 },
    no2: { good: 53, moderate: 100, unhealthy: 360 },
    o3: { good: 54, moderate: 70, unhealthy: 85 },
    co: { good: 4.4, moderate: 9.4, unhealthy: 12.4 },
    so2: { good: 35, moderate: 75, unhealthy: 185 },
    nh3: { good: 200, moderate: 400, unhealthy: 800 },
  };

  const thresholds = levels[type as keyof typeof levels];
  if (value <= thresholds.good) return { color: 'bg-green-500', text: 'Good' };
  if (value <= thresholds.moderate) return { color: 'bg-yellow-500', text: 'Moderate' };
  if (value <= thresholds.unhealthy) return { color: 'bg-orange-500', text: 'Unhealthy' };
  return { color: 'bg-red-500', text: 'Hazardous' };
};

const getHealthAdvice = (aqi: number) => {
  switch (aqi) {
    case 1:
      return "Air quality is ideal for outdoor activities.";
    case 2:
      return "Acceptable air quality. Sensitive individuals should limit prolonged outdoor exposure.";
    case 3:
      return "Members of sensitive groups may experience health effects.";
    case 4:
      return "Everyone may begin to experience health effects.";
    case 5:
      return "Health warnings of emergency conditions. Everyone should avoid outdoor activities.";
    default:
      return "No data available";
  }
};

const PollutantCard = ({ name, value, unit, type }: { name: string; value: number; unit: string; type: string }) => {
  const { color, text } = getPollutantLevel(value, type);
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{name}</span>
        <span className={`text-sm px-2 py-1 rounded ${text === 'Good' ? 'bg-green-100 text-green-800' : 
          text === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : 
          text === 'Unhealthy' ? 'bg-orange-100 text-orange-800' : 
          'bg-red-100 text-red-800'}`}>
          {text}
        </span>
      </div>
      <div className="text-2xl font-bold mb-2">{value.toFixed(1)} {unit}</div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`${color} h-2 rounded-full transition-all duration-500`} 
          style={{ width: `${Math.min((value / getPollutantLevel(value, type).unhealthy) * 100, 100)}%` }} />
      </div>
    </div>
  );
};

export function AirQualityDetails({ data }: AirQualityDetailsProps) {
  const { level, color } = getAQIDescription(data.main.aqi);
  const healthAdvice = getHealthAdvice(data.main.aqi);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Air Quality Details</h3>
        <div className={`px-4 py-2 rounded-full ${
          color === 'green' ? 'bg-green-100 text-green-800' :
          color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
          color === 'orange' ? 'bg-orange-100 text-orange-800' :
          color === 'red' ? 'bg-red-100 text-red-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          <span className="font-medium">{level}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <h4 className="font-medium">Health Advice</h4>
        </div>
        <p className="text-gray-600">{healthAdvice}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PollutantCard name="PM2.5" value={data.components.pm2_5} unit="µg/m³" type="pm2_5" />
        <PollutantCard name="PM10" value={data.components.pm10} unit="µg/m³" type="pm10" />
        <PollutantCard name="NO₂" value={data.components.no2} unit="µg/m³" type="no2" />
        <PollutantCard name="O₃" value={data.components.o3} unit="µg/m³" type="o3" />
        <PollutantCard name="CO" value={data.components.co} unit="mg/m³" type="co" />
        <PollutantCard name="SO₂" value={data.components.so2} unit="µg/m³" type="so2" />
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Wind className="w-5 h-5 text-blue-500" />
          <h4 className="font-medium text-blue-900">Pollutant Information</h4>
        </div>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• PM2.5 & PM10: Fine particles that can penetrate deep into the lungs</li>
          <li>• NO₂: Nitrogen dioxide from vehicle emissions</li>
          <li>• O₃: Ground-level ozone formed by chemical reactions</li>
          <li>• CO: Carbon monoxide from incomplete combustion</li>
          <li>• SO₂: Sulfur dioxide from industrial processes</li>
        </ul>
      </div>
    </div>
  );
}
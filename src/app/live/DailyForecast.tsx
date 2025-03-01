import React from 'react';

export interface ForecastItem {
  time: string;
  temp: number;
  weather: {
    main: string;
    icon: string;
    description: string;
  };
}

interface DailyForecastProps {
  data: ForecastItem[];
}


export function DailyForecast({ data }: DailyForecastProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <h3 className="text-xl font-semibold mb-4">24-Hour Forecast</h3>
      <div className="flex space-x-8 min-w-max">
        {data.map((item) => (
          <div key={item.time} className="flex flex-col items-center">
            <span className="text-sm text-gray-600">{item.time}</span>
            <img 
              src={`https://openweathermap.org/img/wn/${item.weather.icon}@2x.png`}
              alt={item.weather.description}
              className="w-12 h-12 my-2"
            />
            <span className="font-semibold">{Math.round(item.temp)}°C</span>
            <span className="text-xs text-gray-500 capitalize">{item.weather.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

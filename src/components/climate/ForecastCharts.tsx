import React from 'react';

export function ForecastCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Temperature Trend</h3>
        <div className="h-64">
          <img 
            src="https://images.unsplash.com/photo-1535320485706-44d43b919500?auto=format&fit=crop&q=80" 
            alt="Temperature trend"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Precipitation Forecast</h3>
        <div className="h-64">
          <img 
            src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80" 
            alt="Precipitation forecast"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
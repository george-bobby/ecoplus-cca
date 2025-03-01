import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Alert {
  type: string;
  level: string;
  message: string;
}

interface WeatherAlertsProps {
  alerts: Alert[];
}

export function WeatherAlerts({ alerts }: WeatherAlertsProps) {
  if (alerts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow max-w-[600px]">
        <h3 className="text-xl font-semibold mb-4">Weather Status</h3>
        <div className="flex items-start p-4 bg-green-50 rounded-lg">
          <div>
            <h4 className="font-semibold text-green-800">All Clear</h4>
            <p className="text-sm text-green-700">No weather warnings at this time.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-[400px]">
      <h3 className="text-xl font-semibold mb-4">Weather Alerts</h3>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className="flex items-start p-4 bg-yellow-50 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-800">{alert.type} Alert</h4>
              <p className="text-sm text-yellow-700">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
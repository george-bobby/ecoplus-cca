import React from 'react';
import { TemperatureTrend } from './graphs/TemperatureTrend';
import { RainfallDistribution } from './graphs/RainfallDistribution';
import { HumidityLevels } from './graphs/HumidityLevels';
import { WindDirection } from './graphs/WindDirection';

export function WeatherGraphs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TemperatureTrend />
      <RainfallDistribution />
      <HumidityLevels />
      <WindDirection />
    </div>
  );
}
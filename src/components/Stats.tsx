import React, { useState, useEffect } from 'react';
import { Thermometer, Wind, Cloud, TreePine } from 'lucide-react';

interface ClimateData {
  globalTemp: string | null;
  co2Concentration: string | null;
  emissionReduction: string | null;
  treesPlanted: string | null;
  loading: boolean;
  error: boolean;
}

function Stats() {
  const [climateData, setClimateData] = useState<ClimateData>({
    globalTemp: null,
    co2Concentration: null,
    emissionReduction: null,
    treesPlanted: null,
    loading: true,
    error: false
  });

  useEffect(() => {
    const fetchClimateData = async () => {
      try {
        // Fetch global temperature data from NASA GISS API
        const tempResponse = await fetch('https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.csv');
        const tempText = await tempResponse.text();
        // Parse the CSV to get the latest temperature anomaly (simplified)
        const tempRows = tempText.split('\n');
        const latestTempRow = tempRows[tempRows.length - 2]; // Get the last complete row
        const tempValue = parseFloat(latestTempRow.split(',')[13]).toFixed(2); // Annual mean

        // Fetch CO2 concentration from NOAA API
        const co2Response = await fetch('https://gml.noaa.gov/webdata/ccgg/trends/co2/co2_mm_mlo.csv');
        const co2Text = await co2Response.text();
        // Parse the CSV to get the latest CO2 value
        const co2Rows = co2Text.split('\n').filter(row => !row.startsWith('#'));
        const latestCo2Row = co2Rows[co2Rows.length - 2]; // Get the last complete row
        const co2Value = parseFloat(latestCo2Row.split(',')[3]).toFixed(1); // Monthly mean

        // For emission reduction goal and trees planted, we'll use static data
        // as there's no single free API that provides this global information
        
        setClimateData({
          globalTemp: tempValue || '1.2',
          co2Concentration: co2Value || '417',
          emissionReduction: '49', // Static value based on common global targets
          treesPlanted: '7.3B', // Static value
          loading: false,
          error: false
        });
      } catch (error) {
        console.error('Error fetching climate data:', error);
        // Fallback to static data if API calls fail
        setClimateData({
          globalTemp: '1.2',
          co2Concentration: '417',
          emissionReduction: '49',
          treesPlanted: '7.3B',
          loading: false,
          error: true
        });
      }
    };

    fetchClimateData();
  }, []);

  const stats = [
    {
      icon: Thermometer,
      value: climateData.globalTemp || '1.2',
      label: 'Global Temperature Rise (°C)',
      description: 'Increase in global temperatures since pre-industrial levels.',
      color: 'text-red-500',
      bgColor: 'bg-red-500',
      progress: 75,
    },
    {
      icon: Wind,
      value: climateData.co2Concentration || '417',
      label: 'CO2 Concentration (ppm)',
      description: 'Atmospheric carbon dioxide concentration in parts per million.',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500',
      progress: 65,
    },
    {
      icon: Cloud,
      value: climateData.emissionReduction || '49',
      label: 'Emission Reduction Goal (%)',
      description: 'Global target to reduce greenhouse gas emissions by 2030.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500',
      progress: 49,
    },
    {
      icon: TreePine,
      value: climateData.treesPlanted || '7.3B',
      label: 'Trees Planted',
      description: 'Total trees planted worldwide in recent environmental campaigns.',
      color: 'text-green-500',
      bgColor: 'bg-green-500',
      progress: 90,
    },
  ];

  return (
    <section 
      className="py-12 relative" 
      style={{
        backgroundColor: '#001F54',
        backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 31, 84, 1))',
        backdropFilter: 'blur(10px)',
      }}
    >
      
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:bg-white/10 p-6 rounded-lg transition-all duration-300 shadow-lg bg-black bg-opacity-30 relative"
              style={{
                backdropFilter: 'blur(5px)',
                boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
              }}
            >
              <div
                className="inline-block p-4 rounded-full bg-white/10 mb-4 group-hover:scale-110 transition-transform"
                aria-label={stat.label}
              >
                {/* Icon component with explicit size and color */}
                <stat.icon
                  size={48}
                  className={stat.color}
                  strokeWidth={1.5}
                />
              </div>
              
              <div className="text-4xl font-bold text-white mb-2">
                {climateData.loading ? '...' : stat.value}
              </div>
              
              <div className="text-white font-medium mb-1">{stat.label}</div>
              
              <div className="text-gray-400 text-sm">{stat.description}</div>
              
              <div className="relative bg-gray-700 h-2 w-full rounded-full mt-4">
                <div
                  className={`h-2 rounded-full ${stat.bgColor}`}
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
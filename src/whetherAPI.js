'use client';

import { useState, useEffect } from 'react';

// API Configuration
const API_KEY = '1965ccbf28ec3943960a2e49ba7e4a04';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Hook for Weather Data
export const useWeatherData = (location) => {
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecast, setForecast] = useState(null);
	const [airQuality, setAirQuality] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAllData = async () => {
			if (!location) return;

			setLoading(true);
			setError(null);

			try {
				// Fetch Current Weather
				const weatherResponse = await fetch(
					`${BASE_URL}/weather?q=${location}&units=metric&appid=${API_KEY}`
				);
				if (!weatherResponse.ok) throw new Error('Location not found');
				const weatherData = await weatherResponse.json();
				setCurrentWeather(weatherData);

				// Fetch 5-Day Forecast
				const forecastResponse = await fetch(
					`${BASE_URL}/forecast?q=${location}&units=metric&appid=${API_KEY}`
				);
				if (!forecastResponse.ok)
					throw new Error('Failed to fetch forecast data');
				const forecastData = await forecastResponse.json();
				setForecast(forecastData);

				// Fetch Air Quality
				const { coord } = weatherData;
				const airQualityResponse = await fetch(
					`${BASE_URL}/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}`
				);
				if (!airQualityResponse.ok)
					throw new Error('Failed to fetch air quality data');
				const airQualityData = await airQualityResponse.json();
				setAirQuality(airQualityData);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'Failed to fetch weather data'
				);
			} finally {
				setLoading(false);
			}
		};

		fetchAllData();
	}, [location]);

	// Fetch UV Index
	const getUVIndex = async (lat, lon) => {
		try {
			const response = await fetch(
				`${BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
			);
			if (!response.ok) throw new Error('Failed to fetch UV index');
			return await response.json();
		} catch (error) {
			throw new Error(
				error instanceof Error ? error.message : 'Failed to fetch UV index'
			);
		}
	};

	return {
		currentWeather,
		forecast,
		airQuality,
		loading,
		error,
		getUVIndex,
	};
};

// Get Air Quality Description
export const getAQIDescription = (aqi) => {
	const descriptions = {
		1: { level: 'Good', color: 'green' },
		2: { level: 'Fair', color: 'yellow' },
		3: { level: 'Moderate', color: 'orange' },
		4: { level: 'Poor', color: 'red' },
		5: { level: 'Very Poor', color: 'purple' },
	};
	return descriptions[aqi] || descriptions[1];
};

// Weather Alert Levels
export const getWeatherAlertLevel = (data) => {
	const alerts = [];

	// Temperature Alerts
	if (data.main.temp > 35) {
		alerts.push({
			type: 'Heat',
			level: 'warning',
			message:
				'Extreme heat conditions. Stay hydrated and avoid outdoor activities.',
		});
	}

	// Wind Alerts
	if (data.wind.speed > 20) {
		alerts.push({
			type: 'Wind',
			level: 'warning',
			message: 'Strong winds expected. Secure loose objects outdoors.',
		});
	}

	// Visibility Alerts
	if (data.visibility < 1000) {
		alerts.push({
			type: 'Visibility',
			level: 'warning',
			message: 'Poor visibility conditions. Drive carefully.',
		});
	}

	return alerts;
};

export const processWeeklyForecast = (forecastData) => {
	if (!forecastData) return [];

	const dailyForecasts = forecastData.list.reduce((acc, forecast) => {
		const date = new Date(forecast.dt * 1000);
		const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });

		if (!acc.find((day) => day.day === dayOfWeek)) {
			acc.push({
				day: dayOfWeek,
				date: date,
				highTemp: forecast.main.temp_max,
				lowTemp: forecast.main.temp_min,
				feelsLike: forecast.main.feels_like,
				description: forecast.weather[0].main,
				icon: forecast.weather[0].icon,
				precipitation: forecast.pop * 100,
				windSpeed: forecast.wind.speed,
			});
		}

		return acc;
	}, []);

	return dailyForecasts.slice(0, 7); // Ensure we only return 7 days
};

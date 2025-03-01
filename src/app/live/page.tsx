import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { SearchBar } from "../components/SearchBar"
import { CurrentConditions } from "../components/climate/CurrentConditions"
import { DetailedStats } from "../components/climate/DetailedStats"
import { WeatherTrends } from "../components/climate/WeatherTrends"
import { WeatherAlerts } from "../components/climate/WeatherAlerts"
import { AdvancedMetrics } from "../components/climate/AdvancedMetrics"
import { AirQualityDetails } from "../components/climate/AirQualityDetails"
import { DailyForecast } from "../components/climate/DailyForecast"
import { WeeklyForecast } from "../components/climate/WeeklyForecast"
import { useWeatherData, getWeatherAlertLevel } from "../services/weatherApi"
import type { ForecastItem } from "../components/climate/DailyForecast"

export function Live() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isLoadingLocation, setIsLoadingLocation] = useState(true)
    const [userLocation, setUserLocation] = useState("Bengaluru") // Default to Bengaluru

    useEffect(() => {
        const detectLocation = async () => {
            if ("geolocation" in navigator) {
                try {
                    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject, {
                            enableHighAccuracy: true,
                            timeout: 5000,
                            maximumAge: 0
                        })
                    })

                    try {
                        const response = await fetch(
                            `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
                        )
                        const [data] = await response.json()
                        const locationName = data.name
                        setSearchParams({ location: locationName })
                        setUserLocation(locationName)
                    } catch (error) {
                        console.error("Error getting location name:", error)
                        setSearchParams({ location: "Bengaluru" })
                        setUserLocation("Bengaluru")
                    }
                } catch (error) {
                    console.error("Geolocation error:", error)
                    setSearchParams({ location: "Bengaluru" })
                    setUserLocation("Bengaluru")
                }
            } else {
                setSearchParams({ location: "Bengaluru" })
                setUserLocation("Bengaluru")
            }
            setIsLoadingLocation(false)
        }

        if (!searchParams.get("location")) {
            detectLocation()
        } else {
            setUserLocation(searchParams.get("location") || "Bengaluru")
            setIsLoadingLocation(false)
        }
    }, [searchParams, setSearchParams])

    const location = searchParams.get("location") || userLocation
    const { currentWeather, forecast, airQuality, loading, error } = useWeatherData(location)

    const formatDate = () => {
        const selectedDate = searchParams.get("date")
        const selectedTime = searchParams.get("time")

        let date = new Date()

        if (selectedDate) {
            date = new Date(selectedDate)
            if (selectedTime) {
                const [hours, minutes] = selectedTime.split(":")
                date.setHours(parseInt(hours, 10), parseInt(minutes, 10))
            }
        }

        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const generateHourlyForecast = (forecastList: any[]): ForecastItem[] => {
        const hourlyForecast: ForecastItem[] = []
        const now = new Date()
        now.setMinutes(0, 0, 0)

        for (let i = 0; i < 24; i++) {
            const forecastTime = new Date(now.getTime() + i * 60 * 60 * 1000)
            const hour = forecastTime.getHours().toString().padStart(2, "0")
            const time = `${hour}:00`

            const closestForecast = forecastList.reduce((prev, curr) => {
                const prevDiff = Math.abs(new Date(prev.dt * 1000).getTime() - forecastTime.getTime())
                const currDiff = Math.abs(new Date(curr.dt * 1000).getTime() - forecastTime.getTime())
                return prevDiff < currDiff ? prev : curr
            })

            hourlyForecast.push({
                time,
                temp: closestForecast.main.temp,
                weather: {
                    main: closestForecast.weather[0].main,
                    icon: closestForecast.weather[0].icon,
                    description: closestForecast.weather[0].description,
                },
            })
        }
        return hourlyForecast
    }

    if (isLoadingLocation || loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-lg">{isLoadingLocation ? "Detecting your location..." : "Loading weather data..."}</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div
                className="h-[300px] relative bg-cover bg-center"
                style={{
                    backgroundImage:
                        'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80")',
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <Navbar />

                <div className="relative pt-32 px-4">
                    <div className="container mx-auto">
                        <div className="max-w-xl mx-auto">
                            <SearchBar />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {currentWeather && forecast && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow-lg p-6 -mt-20 relative z-10">
                            <h2 className="text-2xl font-bold mb-2">
                                {currentWeather.name}, {currentWeather.sys.country}
                            </h2>
                            <p className="text-gray-600 mb-6">{formatDate()}</p>
                            <CurrentConditions
                                temperature={Math.round(currentWeather.main.temp)}
                                feelsLike={Math.round(currentWeather.main.feels_like)}
                                humidity={currentWeather.main.humidity}
                                windSpeed={Math.round(currentWeather.wind.speed * 3.6)}
                                pressure={currentWeather.main.pressure}
                                visibility={currentWeather.visibility / 1000}
                                weatherIcon={currentWeather.weather[0].icon}
                                description={currentWeather.weather[0].description}
                            />
                        </div>

                        <div className="flex space-x-6 mt-6">
                            <DetailedStats current={currentWeather} forecast={forecast} />
                            <div className="flex space-x-5 mt-5 px-[-100px] py-[-100px]">
                                <WeeklyForecast location={location} />
                                <div className="absolute top-[950px] left-0 w-[575px] p-4">
                                    <WeatherAlerts alerts={getWeatherAlertLevel(currentWeather)} />
                                </div>
                            </div>
                        </div>

                        <DailyForecast data={generateHourlyForecast(forecast.list)} />
                        <WeatherTrends data={forecast.list} />
                        <AdvancedMetrics data={currentWeather} />
                        {airQuality && <AirQualityDetails data={airQuality.list[0]} />}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}
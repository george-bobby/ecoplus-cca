import {
  Cloud,
  Sun,
  Droplets,
  Wind,
  Thermometer,
  ThermometerSun,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { useWeatherData, processWeeklyForecast } from "../../services/weatherApi"

interface WeeklyForecastProps {
  location: string;
}

export function WeeklyForecast({ location }: WeeklyForecastProps) {
  const { forecast, loading, error } = useWeatherData(location)
  const weeklyForecast = processWeeklyForecast(forecast)

  const getWeatherIcon = (description: string) => {
    switch (description.toLowerCase()) {
      case "clear":
        return Sun
      case "clouds":
        return Cloud
      case "rain":
        return CloudRain
      case "snow":
        return CloudSnow
      case "thunderstorm":
        return CloudLightning
      default:
        return Cloud
    }
  }

  if (loading) return (
    <Card className="w-[350px] max-w-md bg-white shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading forecast data...</div>
        </div>
      </CardContent>
    </Card>
  )

  if (error) return (
    <Card className="w-[350px] max-w-md bg-white shadow-md">
      <CardContent className="p-6">
        <div className="text-red-500 text-center">{error}</div>
      </CardContent>
    </Card>
  )

  return (
    <Card className="w-[350px] max-w-md bg-white shadow-md">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-2xl font-bold text-center text-gray-800">7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="divide-y divide-gray-200">
          {weeklyForecast.map((day) => {
            const WeatherIcon = getWeatherIcon(day.description)

            return (
              <div key={day.day} className="flex items-center py-2 first:pt-0 last:pb-0">
                <span className="text-base font-medium text-gray-800 w-12">{day.day}</span>
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <WeatherIcon className="w-8 h-8 text-gray-500" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">{day.description}</span>
                      <div className="flex items-center">
                        <ThermometerSun className="w-4 h-4 text-red-500 mr-1" />
                        <span className="text-lg font-semibold text-gray-900">{Math.round(day.highTemp)}°</span>
                        <span className="text-sm text-gray-600 ml-1">/ {Math.round(day.lowTemp)}°</span>
                      </div>
                      <div className="flex items-center">
                        <Thermometer className="w-4 h-4 text-orange-400 mr-1" />
                        <span className="text-xs text-gray-600">Feels like {Math.round(day.feelsLike)}°</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-sm text-gray-700">
                      <Droplets className="w-4 h-4 text-gray-500 mr-1" />
                      <span>{Math.round(day.precipitation)}%</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <Wind className="w-4 h-4 text-blue-400 mr-1" />
                      <span>{Math.round(day.windSpeed)} mph</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
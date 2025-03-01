import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, useMap, ZoomControl } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import "leaflet.heat"

declare module "leaflet" {
  export function heatLayer(latlngs: Array<[number, number, number]>, options?: any): L.Layer
}

interface HeatMapProps {
  center: [number, number]
  zoom?: number
  apiKey: string
}

interface TemperaturePoint {
  lat: number
  lon: number
  temp: number
}

async function fetchTemperatures(points: [number, number][], apiKey: string): Promise<TemperaturePoint[]> {
  const chunkSize = 20
  const chunks = []
  for (let i = 0; i < points.length; i += chunkSize) {
    chunks.push(points.slice(i, i + chunkSize))
  }

  const results = await Promise.all(
    chunks.map(async (chunk) => {
      const params = chunk.map(([lat, lon]) => `lat=${lat}&lon=${lon}`).join("&")
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/find?${params}&cnt=${chunkSize}&appid=${apiKey}&units=metric`,
      )
      const data = await response.json()
      return data.list.map((item: any) => ({
        lat: item.coord.lat,
        lon: item.coord.lon,
        temp: item.main.temp,
      }))
    }),
  )

  return results.flat()
}

function MapUpdater({
  center,
  apiKey,
}: {
  center: [number, number]
  apiKey: string
}) {
  const map = useMap()
  const [temperaturePoints, setTemperaturePoints] = useState<Array<[number, number, number]>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    map.setView(center)

    async function generateTemperatureGrid() {
      try {
        setIsLoading(true)
        setError(null)
        const bounds = map.getBounds()
        const padding = 0.1 // Add padding to cover areas slightly outside the visible map
        const latStep = (bounds.getNorth() - bounds.getSouth()) / 10
        const lonStep = (bounds.getEast() - bounds.getWest()) / 10

        const gridPoints: [number, number][] = []
        for (let lat = bounds.getSouth() - padding; lat <= bounds.getNorth() + padding; lat += latStep) {
          for (let lon = bounds.getWest() - padding; lon <= bounds.getEast() + padding; lon += lonStep) {
            gridPoints.push([lat, lon])
          }
        }

        const temperatures = await fetchTemperatures(gridPoints, apiKey)

        const temps = temperatures.map((t) => t.temp)
        const minTemp = Math.min(...temps)
        const maxTemp = Math.max(...temps)
        const tempRange = maxTemp - minTemp

        const points = temperatures.map(({ lat, lon, temp }) => {
          const intensity = (temp - minTemp) / tempRange
          return [lat, lon, intensity] as [number, number, number]
        })

        setTemperaturePoints(points)
      } catch (err) {
        console.error("Error fetching temperature data:", err)
        setError("Failed to load temperature data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    generateTemperatureGrid()
  }, [center, map, apiKey])

  useEffect(() => {
    if (temperaturePoints.length > 0) {
      const heat = L.heatLayer(temperaturePoints, {
        radius: 25,
        blur: 15,
        maxZoom: 18,
        gradient: {
          0.0: "rgba(0, 0, 255, 0.5)", // Cold (blue)
          0.2: "rgba(0, 255, 255, 0.6)", // Very cool (cyan)
          0.4: "rgba(0, 255, 0, 0.7)", // Cool (green)
          0.6: "rgba(255, 255, 0, 0.8)", // Warm (yellow)
          0.8: "rgba(255, 128, 0, 0.9)", // Hot (orange)
          1.0: "rgba(255, 0, 0, 1)", // Very hot (red)
        },
        minOpacity: 0.3,
      }).addTo(map)

      return () => {
        map.removeLayer(heat)
      }
    }
  }, [map, temperaturePoints])

  if (isLoading) {
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-75 flex items-center justify-center z-[1000]">
        <div className="text-lg font-semibold">Loading temperature data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-75 flex items-center justify-center z-[1000]">
        <div className="text-lg font-semibold text-red-500">{error}</div>
      </div>
    )
  }

  return null
}

export function HeatMap({ center, zoom = 13, apiKey }: HeatMapProps) {
  if (!apiKey) {
    console.error("API key is required for the weather layer.")
    return (
      <div className="w-full h-[500px] flex justify-center items-center text-red-500">
        API key is required to display the weather overlay.
      </div>
    )
  }

  return (
    <div className="w-[450px] h-[500px] rounded-lg overflow-hidden relative">
      <MapContainer center={center} zoom={zoom} className="h-full w-full" zoomControl={false} scrollWheelZoom={true}>
        <ZoomControl position="topleft" />
        <MapUpdater center={center} apiKey={apiKey} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  )
}

export default HeatMap


"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const ZoomControl = dynamic(() => import("react-leaflet").then((mod) => mod.ZoomControl), { ssr: false })

import "leaflet/dist/leaflet.css"

interface HeatMapProps {
  center: [number, number]
  zoom?: number
  apiKey: string
}

export function HeatMap({ center, zoom = 13, apiKey }: HeatMapProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null // Ensure no SSR issues

  return (
    <div className="w-[450px] h-[500px] rounded-lg overflow-hidden relative">
      {/* <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <ZoomControl position="topleft" />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer> */}
    </div>
  )
}

export default HeatMap

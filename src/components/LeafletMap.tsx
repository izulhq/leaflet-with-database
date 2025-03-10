"use client";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@/styles/styles.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface Marker {
  geocode: [number, number];
  popUp: string;
}

interface IconDefault extends L.Icon.Default {
  _getIconUrl?: string;
}

const LeafletMap = ({ markers }: { markers: Marker[] }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Fix Leaflet default marker icons
      delete (L.Icon.Default.prototype as IconDefault)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x.src,
        iconUrl: markerIcon.src,
        shadowUrl: markerShadow.src,
      });

      // Initialize map with attribution control disabled
      const map = L.map("map", { attributionControl: false }).setView(
        [-7.566, 110.828],
        13
      );
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

      const customIcon = L.icon({
        iconUrl: "/marker.png",
        iconSize: [25, 25],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      markers.forEach((marker) => {
        const popupContent = `${marker.popUp}
          <div class="flex justify-center">
          </div>
        `;

        L.marker(marker.geocode, { icon: customIcon })
          .addTo(map)
          .bindPopup(popupContent, {
            className: "custom-popup",
            closeButton: false,
          });
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [markers]);

  return <div id="map" className="h-full w-full" />;
};

export default LeafletMap;

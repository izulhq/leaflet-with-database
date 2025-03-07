"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

interface Marker {
  geocode: [number, number];
  popUp: string;
}

const LeafletMap = dynamic(() => import("@/components/LeafletMap"), {
  ssr: false,
});

export default function MapPage() {
  const [view, setView] = useState("map");
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    fetch("/api/locations")
      .then((response) => response.json())
      .then((data) => {
        setMarkers(data);
      })
      .catch((error) => console.error("Error fetching markers:", error));
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col relative">
      <main className="flex-1">
        <LeafletMap markers={markers} />
      </main>
    </div>
  );
}

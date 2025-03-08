"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";

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
    <div className="relative h-screen w-full flex items-center justify-center">
      <LeafletMap markers={markers} />
      <NavBar view={view} setView={setView} />
    </div>
  );
}

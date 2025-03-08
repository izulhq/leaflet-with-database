"use client";

// import LeafletMap from "@/components/LeafletMap";
import TabsFloating from "@/components/TabsFloating";
// import { useState } from "react";

export default function SinglePageApp() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center">
      {/* Map as background */}
      <TabsFloating />
      {/* Navigation at bottom */}
    </div>
  );
}

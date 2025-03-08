"use client";

import LeafletMap from "@/components/LeafletMap";
import NavBar from "@/components/NavBar";
import TabsFloating from "@/components/TabsFloating";
import { Tabs } from "@radix-ui/react-tabs";
import { useState } from "react";

export default function SinglePageApp() {
  const [view, setView] = useState("default");

  return (
    <div className="relative h-screen w-full flex items-center justify-center">
      <TabsFloating view={view} setView={setView} isVisible />
    </div>
  );
}

"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Database, FileText, Home } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import SubmitForm from "./SubmitForm";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Entry } from "@/lib/types";
import DataTable from "./DataTable";
import { cn } from "@/lib/utils";

interface FormData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  createdAt: Date;
}

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg px-1",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-gradient-to-tl data-[state=active]:from-blue-500 data-[state=active]:to-blue-700 data-[state=active]:text-white hover:text-black focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

interface TabsFloatingProps {
  isVisible: boolean;
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  defaultTab?: string;
}

export default function TabsFloating({
  isVisible,
  view,
  setView,
  defaultTab = "home",
}: TabsFloatingProps) {
  // State for form data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // State for submitted data
  const [submittedData, setSubmittedData] = useState<FormData[]>([]);
  const [data, setData] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Fetch data from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/submit");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newData: FormData = {
      id: Date.now(),
      name: title,
      description: description,
      latitude: 0,
      longitude: 0,
      createdAt: new Date(),
    };

    setSubmittedData([...submittedData, newData]);
    setTitle("");
    setDescription("");
  };

  if (!isVisible) return null;

  return (
    <div className="w-full">
      <Tabs
        defaultValue={defaultTab}
        className="w-full mx-auto items-center border border-md rounded-lg p-4 pb-0 bg-white shadow-xl"
      >
        <div className="flex items-center justify-center gap-4"></div>
        {/* [ Home - Submit Data - View Data ] */}
        <TabsList className="grid grid-cols-3 mb-4 gap-4 shadow-md border-t">
          <TabsTrigger value="home" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </TabsTrigger>
          <TabsTrigger value="submit" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Submit Data</span>
          </TabsTrigger>
          <TabsTrigger value="view" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">View Data</span>
          </TabsTrigger>
        </TabsList>

        {/* Consistent height container for all tab content */}
        <div className="min-h-[465px]">
          <TabsContent value="home">
            <Card className="bg-transparent">
              <CardHeader>
                <CardTitle className="text-black">
                  Welcome to our Application
                </CardTitle>
                <CardDescription className="text-black">
                  This is a simple single-page application with three sections.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-black">
                    Use the tabs above to navigate between different sections:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-black">
                    <li>
                      <strong className="font-400">Home:</strong> This welcome
                      page
                    </li>
                    <li>
                      <strong>Submit Data:</strong> Add new entries to our
                      database
                    </li>
                    <li>
                      <strong>View Data:</strong> See all submitted entries
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submit">
            <Card className="bg-transparent">
              <CardHeader>
                <CardTitle className="text-black">Submit New Data</CardTitle>
                <CardDescription className="text-black">
                  Fill out the form below to add a new entry<br></br>Copy
                  coordinate from Google Maps and paste it here
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SubmitForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="view">
            <Card className="bg-transparent">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="pb-2 text-black">
                    View Submitted Data
                  </CardTitle>
                  <CardDescription className="text-black">
                    All entries that have been submitted.
                  </CardDescription>
                </div>
                <Button
                  className="shadow-md hover:bg-gradient-to-br from-blue-400 to-blue-700 hover:text-white"
                  onClick={() => window.open("/maps", "_blank")}
                  variant="outline"
                  size="sm"
                >
                  Open Map ↗
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="p-8 text-black">Loading...</div>
                ) : error ? (
                  <div className="p-8 text-red-500">{error}</div>
                ) : (
                  <DataTable data={data} />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

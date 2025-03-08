"use client";

import React, { useEffect, useState } from "react";
import SubmitForm from "@/components/SubmitForm";
import DataTable from "@/components/DataTable";
import { Entry } from "@/lib/types";

const CombinedPage = () => {
  const [data, setData] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Submit and View Data</h1>
      <SubmitForm />
      {loading ? (
        <div className="p-8">Loading...</div>
      ) : error ? (
        <div className="p-8 text-red-500">{error}</div>
      ) : (
        <div className="p-8 w-full">
          <h2 className="text-xl font-bold mb-4">Submitted Data</h2>
          <DataTable data={data} />
        </div>
      )}
    </div>
  );
};

export default CombinedPage;

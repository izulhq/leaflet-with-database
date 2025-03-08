"use client";

import React, { useState, FormEvent } from "react";

interface FormData {
  name: string;
  latitude: string;
  longitude: string;
  description: string;
}

const SubmitForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    latitude: "",
    longitude: "",
    description: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          latitude: parseFloat(formData.latitude),
          longitude: parseFloat(formData.longitude),
        }),
      });

      if (response.ok) {
        setSuccess("Data submitted successfully!");
        setFormData({
          name: "",
          latitude: "",
          longitude: "",
          description: "",
        });
      } else {
        const data = await response.json();
        setError(data.error || "Failed to submit data");
      }
    } catch (err) {
      setError("An error occurred while submitting the data");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 rounded text-sm"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border p-2 rounded text-sm"
            rows={4}
          />
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="number"
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
            step="any"
            className="border p-2 rounded text-sm"
          />
          <input
            type="number"
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
            step="any"
            className="border p-2 rounded text-sm"
          />
          <p className="text-xs mx-1 text-gray-500">
            Don't forget to use <strong>dot ( . )</strong>
            <br></br>instead of comma for Lat and Long<br></br>for example{" "}
            <strong>[ -7.57151, 110.83089 ]</strong>
          </p>
        </div>
        <button
          type="submit"
          className="col-span-2 bg-gradient-to-tl from-blue-500 to-blue-700 text-white font-medium p-2 rounded hover:bg-gradient-to-br focus:outline-none transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitForm;

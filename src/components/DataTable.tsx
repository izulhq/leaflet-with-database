import React from "react";
import { Entry } from "@/lib/types";

interface DataTableProps {
  data: Entry[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Latitude</th>
            <th className="border border-gray-300 p-2">Longitude</th>
            <th className="border border-gray-300 p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td className="border border-gray-300 p-2">{entry.name}</td>
              <td className="border border-gray-300 p-2">{entry.latitude}</td>
              <td className="border border-gray-300 p-2">{entry.longitude}</td>
              <td className="border border-gray-300 p-2">
                {entry.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

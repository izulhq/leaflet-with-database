import React, { useState, useEffect } from "react";
import { Entry } from "@/lib/types";

interface DataTableProps {
  data: Entry[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = isMobile ? 2 : 5;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="min-w-full">
          <thead className="hidden md:table-header-group">
            <tr className="bg-gradient-to-t from-blue-500 to-blue-700 text-white">
              <th className="border-b border-r border-gray-300 py-2 px-4 text-left first:rounded-tl-lg">
                Name
              </th>
              <th className="border-b border-r border-gray-300 p-2">
                Latitude
              </th>
              <th className="border-b border-r border-gray-300 p-2">
                Longitude
              </th>
              <th className="border-b border-gray-300 py-2 px-4 text-left last:rounded-tr-lg">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {selectedData.map((entry) => (
              <tr
                key={entry.id}
                className="block md:table-row border-b border-gray-300"
              >
                <td className="block md:table-cell border-r border-gray-300 py-2 px-4">
                  <span className="font-bold md:hidden">Name: </span>
                  {entry.name}
                </td>
                <td className="block md:table-cell border-r border-gray-300 py-2 px-4">
                  <span className="font-bold md:hidden">Latitude: </span>
                  {entry.latitude.toFixed(5)}
                </td>
                <td className="block md:table-cell border-r border-gray-300 py-2 px-4">
                  <span className="font-bold md:hidden">Longitude: </span>
                  {entry.longitude.toFixed(5)}
                </td>
                <td className="block md:table-cell border-gray-300 py-2 px-4">
                  <span className="font-bold md:hidden">Description: </span>
                  {entry.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-4 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gradient-to-tl from-blue-500 to-blue-700 hover:text-white"
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          className="flex items-center justify-center px-4 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gradient-to-tl from-blue-500 to-blue-700 hover:text-white"
        >
          Next
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DataTable;

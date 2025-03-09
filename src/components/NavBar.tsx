import React, { useState } from "react";
import Image from "next/image";
import { MapIcon, TableIcon, ChevronUp, ArrowDownUp, X } from "lucide-react";
import Dropdown from "./Dropdown";
import TabsFloating from "./TabsFloating";

export default function NavBar({
  view,
  setView,
}: {
  view: string;
  setView: any;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showTabs, setShowTabs] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleTabs = () => {
    setShowTabs(!showTabs);
  };

  return (
    <>
      <div className="fixed z-[9999] w-auto min-w-[320px] h-20 md:h-16 -translate-x-1/2 backdrop-blur-lg bg-[#f5f5f5]/40 border-[1px] border-gray-400 rounded-[12px] bottom-4 left-1/2 shadow-xl">
        <div className="h-full px-6 flex flex-col items-center justify-between">
          <div className="flex flex-auto items-center justify-between w-full">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={100}
                height={40}
                className="w-30 h-auto md:w-20 md:h-auto"
              />
            </div>

            <div className="flex items-center gap-2 ml-6">
              <button
                data-tooltip-target="tooltip-map"
                onClick={() => setView("map")}
                className={`p-3 md:p-2 rounded-full shadow-md ${
                  view === "map"
                    ? "bg-gradient-to-r from-blue-500 to-blue-700"
                    : "bg-gray-600"
                } hover:bg-gradient-to-br focus:outline-none`}
              >
                <MapIcon
                  className={`w-6 h-6 md:w-5 md:h-5 ${
                    view === "map" ? "text-white" : "text-gray-200"
                  }`}
                />
              </button>
              <div
                id="tooltip-map"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700"
              >
                Map View
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>

              {/* ArrowDownUp/X button with slide animation */}
              <div className="relative">
                <button
                  onClick={toggleTabs}
                  className={`p-3 md:p-2 rounded-full shadow-md overflow-hidden ${
                    showTabs
                      ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-l"
                      : "bg-gradient-to-r from-gray-500 to-gray-700 hover:bg-gradient-to-l"
                  } focus:outline-none`}
                >
                  {/* First icon that slides out */}
                  <span
                    className={`absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 ease-out transition-all ${
                      showTabs
                        ? "translate-y-full opacity-0"
                        : "translate-y-0 opacity-100 text-gray-200"
                    }`}
                  >
                    <ArrowDownUp className="w-6 h-6 md:w-5 md:h-5" />
                  </span>

                  {/* Second icon that slides in */}
                  <span
                    className={`absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 ease-out transition-all ${
                      showTabs
                        ? "translate-y-0 opacity-100"
                        : "translate-y-full opacity-0"
                    }`}
                  >
                    <X className="w-6 h-6 md:w-5 md:h-5" />
                  </span>

                  {/* Invisible span for maintaining button dimensions */}
                  <span className="relative invisible">
                    <ArrowDownUp className="w-6 h-6 md:w-5 md:h-5" />
                  </span>
                </button>
              </div>

              {/* ChevronUp button */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className={`p-3 md:p-2 rounded-full shadow-md ${
                    isDropdownOpen
                      ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:bg-gradient-to-l"
                      : "bg-gradient-to-r from-gray-500 to-gray-700 hover:bg-gradient-to-l"
                  } hover:bg-gradient-to-br focus:outline-none`}
                >
                  <ChevronUp
                    className={`w-6 h-6 md:w-5 md:h-5 ${
                      isDropdownOpen ? "text-white" : "text-gray-200"
                    } ${
                      isDropdownOpen ? "rotate-180" : ""
                    } transition-transform`}
                  />
                </button>
                <Dropdown isVisible={isDropdownOpen} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showTabs && (
        <div className="fixed inset-0 flex items-center justify-center z-[9998]">
          <div className="max-w-4xl w-full px-14 transform -translate-y-6">
            <TabsFloating isVisible={true} view={view} setView={setView} />
          </div>
        </div>
      )}
    </>
  );
}

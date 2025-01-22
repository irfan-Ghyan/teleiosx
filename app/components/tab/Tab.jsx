"use client";

import React, { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("normal"); 

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Content for each tab
  const renderTabContent = () => {
    if (activeTab === "normal") {
      return (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-2xl opacity-35">
          <h2 className="text-2xl font-bold text-[#063828]">Normal Tab Content</h2>
          <p className="text-lg">This is the content for the Normal tab.</p>
        </div>
      );
    } else if (activeTab === "vip") {
      return (
        <div className="p-4">
          <h2 className="text-2xl font-bold text-[#063828]">VIP Tab Content</h2>
          <p className="text-lg">This is the content for the VIP tab.</p>
        </div>
      );
    } else if (activeTab === "suite") {
      return (
        <div className="p-4">
          <h2 className="text-2xl font-bold text-[#063828]">Suite Tab Content</h2>
          <p className="text-lg">This is the content for the Suite tab.</p>
        </div>
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
 
      <div className="flex justify-center space-x-8">
        <button
          onClick={() => handleTabChange("normal")}
          className={`px-6 py-3 rounded-t-lg text-white font-semibold ${
            activeTab === "normal"
              ? "bg-[#c09e5f] border-b-4 border-[#063828]"
              : "bg-[#063828] hover:bg-[#c09e5f] transition duration-300"
          }`}
        >
          Normal
        </button>
        <button
          onClick={() => handleTabChange("vip")}
          className={`px-6 py-3 rounded-t-lg text-white font-semibold ${
            activeTab === "vip"
              ? "bg-[#c09e5f] border-b-4 border-[#063828]"
              : "bg-[#063828] hover:bg-[#c09e5f] transition duration-300"
          }`}
        >
          VIP
        </button>
        <button
          onClick={() => handleTabChange("suite")}
          className={`px-6 py-3 rounded-t-lg text-white font-semibold ${
            activeTab === "suite"
              ? "bg-[#c09e5f] border-b-4 border-[#063828]"
              : "bg-[#063828] hover:bg-[#c09e5f] transition duration-300"
          }`}
        >
          Suite
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Tabs;

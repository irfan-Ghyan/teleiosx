"use client";

import React, { useState } from "react";
import Cards from "../components/cards/Cards";

const Page = () => {
  const [activeTab, setActiveTab] = useState("normal");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
    <Cards />

    </div>
  );
};

export default Page;

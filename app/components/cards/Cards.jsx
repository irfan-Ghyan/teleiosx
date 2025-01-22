"use client";

import React, { useState } from "react";
import BookNow from "../booknow/BookNow";
import PlanSelector from "../planselector/PlanSelector";
import PlanSelectorVip from "../planselectorvip/PlanSelectorVip.jsx"
import PlanSelectorSuite from "../planselctorsuite/PlanSelectorSuite.jsx";

const Cards = () => {
  const [activeCard, setActiveCard] = useState(""); // Track the active card

  const handleCardClick = (cardType) => {
    setActiveCard(cardType); // Set the active card when clicked
  };

  // Content for the selected card
  const renderCardDetails = () => {
    if (activeCard === "normal") {
      return (
        <div className="mt-6 w-[800px] p-5 bg-white bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
            <PlanSelector />
        </div>

      );
    } else if (activeCard === "vip") {
      return (
        <div className="mt-6 w-[800px] p-5 bg-white bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">

            <PlanSelectorVip />
        </div>
      );
    } else if (activeCard === "suite") {
      return (
        <div className="mt-6 w-[800px] p-5 bg-white bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
            <PlanSelectorSuite />
        </div>
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 my-40">
      {/* Card Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div
          onClick={() => handleCardClick("normal")}
          className="bg-white p-5 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-2xl opacity-100 w-[300px] h-[300px] bg-opacity-20 flex flex-col justify-between"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Normal</h2>
          <p className="text-lg text-white mb-4">
            Choose a first-class VIP room where two simulators offer a premium experience.
          </p>
          <BookNow />
        </div>

        {/* VIP Card */}
        <div
          onClick={() => handleCardClick("vip")}
          className="bg-white p-5 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-2xl opacity-100 w-[300px] h-[300px] bg-opacity-20 flex flex-col justify-between"
        >
          <h2 className="text-2xl font-bold text-white mb-4">VIP</h2>
          <p className="text-lg text-white mb-4">
            Choose a first-class VIP room where two simulators offer a premium experience.
          </p>
          <BookNow />
        </div>

        {/* Suite Card */}
        <div
          onClick={() => handleCardClick("suite")}
          className="bg-white p-5 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-2xl opacity-100 w-[300px] h-[300px] bg-opacity-20 flex flex-col justify-between"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Suite</h2>
          <p className="text-lg text-white mb-4">
            Indulge in a luxurious lounge room with premium features and ambiance for you and your friends.
          </p>
          <BookNow />
        </div>
        
      </div>

      {/* Render details of the selected card */}
      {activeCard && renderCardDetails()}
    </div>
  );
};

export default Cards;

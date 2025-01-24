



"use client";

import React, { useState } from "react";
import BookNow from "../booknow/BookNow";


const Cards = () => {
  const [activeCard, setActiveCard] = useState("");
  const [count, setCount] = useState(1);
  const [generalError, setGeneralError] = useState("");
  const [bookingErrors, setBookingErrors] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [bookingDetails, setBookingDetails] = useState([
    { key: "no_of_people", title: "Participants", description: "1" },
    { key: "duration", title: "Duration", description: "" },
    { key: "price", title: "Price", description: "" },
    { key: "date", title: "Date", description: "" },
    { key: "time", title: "Time", description: "" },
  ]);

  const handleApplyCoupon = () => {
    if (couponCode === "LEAP25") {
      setDiscountMessage(
        "Enjoy 50% off all services during Leap Nights, valid only on February 6 and 7. The discount will be applied."
      );

      setBookingDetails((prevDetails) =>
        prevDetails.map((detail) =>
          detail.key === "price"
            ? {
                ...detail,
                description: getPrice(
                  activeCard,
                  bookingDetails.find((d) => d.key === "duration")?.description.split(" ")[0],
                  couponCode
                ),
              }
            : detail
        )
      );
    } else {
      setDiscountMessage("Invalid coupon code. Please try again.");
    }
  };
  
  const times = [
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
    "12:00 AM",
    "1:00 AM",
  ];
  const priceMapping = {
    normal: { 20: 95, 60: 170, 90: 250 },
    vip: { 60: 400, 90: 500, 120: 650 },
    suite: { 60: 800, 90: 1000, 120: 1200 },
  };

  const getPrice = (activeCard, duration, coupon) => {

    
    const _price_mapping = {
      normal: { 20: 95, 60: 170, 90: 250 },
      vip: { 60: 400, 90: 500, 120: 650 },
      suite: { 60: 800, 90: 1000, 120: 1200 },
    };
    const originalPrice = _price_mapping[activeCard]?.[duration];
    debugger;
    if (!originalPrice) {
      return "No price here";
    }
  
    if (coupon === "LEAP25") {
      const discountedPrice = originalPrice / 2;
      return `${originalPrice} ${discountedPrice} SAR (50% off, VAT Inclusive)`;
    }
  
    return `${originalPrice} SAR (VAT Inclusive)`;
  };
  
  
  

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  

  const handleCardClick = (cardType) => {
    setActiveCard(cardType);
    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.key === "price"
          ? { ...detail, description: "" } 
          : detail
      )
    );
  };

  const handleDurationSelect = (selectedDuration) => {
  
    const updatedBookingDetails = bookingDetails.map((detail) =>
      detail.key === "duration"
        ? { ...detail, description: `${selectedDuration} Mins` }
        : detail.key === "price"
        ? {
            ...detail,
            description: getPrice(activeCard, selectedDuration, couponCode),
          }
        : detail
    );
    console.log("Updated Booking Details:", updatedBookingDetails);
    setBookingDetails(updatedBookingDetails);
  };
  


  const handleDateSelect = (selectedDate) => {
    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.key === "date"
          ? { ...detail, description: selectedDate }
          : detail
      )
    );
  };

  const handleTimeSelect = (selectedTime) => {
    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.key === "time"
          ? { ...detail, description: selectedTime }
          : detail
      )
    );
  };

  const handleDurationSelectVip = (selectedDuration) => {
    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.key === "duration" ? { ...detail, description: `${selectedDuration} Mins` } : detail
      )
    );
  };

  const handleDurationSelectSuite = (selectedDuration) => {
    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.key === "duration" ? { ...detail, description: `${selectedDuration} Mins` } : detail
      )
    );
  };
  
  
  const increaseCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.key === "no_of_people"
          ? { ...detail, description: newCount.toString() }
          : detail
      )
    );
  };

  const decreaseCount = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      setBookingDetails((prevDetails) =>
        prevDetails.map((detail) =>
          detail.key === "no_of_people"
            ? { ...detail, description: newCount.toString() }
            : detail
        )
      );
    }
  };

  

  const handleCouponCode = () => {
    if (couponCode === "LEAP25") {
      setDiscountMessage("Enjoy 50% off all services during Leap Nights, valid only on February 6 and 7. The discount will be applied once you select your sessions.");
    } else {
      setDiscountMessage("Invalid coupon code. Please try again.");
    }
  };
  

  const handleSeatChange = (newCount) => {
    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.key === "no_of_people" ? { ...detail, description: newCount.toString() } : detail
      )
    );
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
  
    if (!formData.firstName) errors.firstName = 'First Name is required.';
    if (!formData.lastName) errors.lastName = 'Last Name is required.';
    if (
      !formData.email ||
      !/^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i.test(formData.email)
    ) {
      errors.email = 'Please enter a valid email.';
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number (10 digits).';
    }
  
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      const emailData = {
        customerEmail: formData.email,
        companyEmail: 'irfanghyann@gmail.com', // Your email
        formData,
        bookingDetails,
      };
  
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });
  
        if (response.ok) {
          console.log('Emails sent successfully!');
          alert('Booking confirmed! Check your email for details.');
        } else {
          console.error('Failed to send emails');
          alert('Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };
  

  const handleContinue = () => {
    const incompleteFields = bookingDetails.filter(
      (detail) => !detail.description
    );
    if (incompleteFields.length > 0) {
      setGeneralError("Please complete all booking details before continuing.");
      return;
    }
    setGeneralError("");
    setShowBookingDetails(true);
  };


  const renderCardDetails = () => {
    if (!activeCard) return <div>Select a booking type to see details.</div>;
 
        if (showBookingDetails) {
      return (
        <div className="flex">
        <div className="mt-6 w-[800px] p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-sm">{formErrors.firstName}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-sm">{formErrors.lastName}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
              />
              {formErrors.phone && (
                <p className="text-red-500 text-sm">{formErrors.phone}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-[50px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px] border-opacity-30 border-[#063828] font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 hover:border-0"
            >
              Submit Booking
            </button>
          </form>
        </div>

      <div className="mt-6 ml-4 w-[310px] p-5 bg-white bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
      <h2 className="text-[30px] text-[#cccccc] font-black font-orbitron mb-[24px]">
        Booking Details
      </h2>
      {bookingDetails
        .filter((detail) => detail.key !== "booking_type")
        .map((detail) => (
          <div
            className="border-b-[0.5px] border-opacity-[50%] border-[#063828] py-[12px]"
            key={detail.key}
          >
          <div className="flex justify-between"><h3 className="text-[14px] text-[#cccccc] font-bold">
              {detail.title}
            </h3>
            <p className="text-[14px] text-[#cccccc]">
              {detail.key === "price" ? getPrice() : detail.description}
            </p></div> 
          </div>
        ))}
        </div>
      </div>
      );
    }

    if (activeCard === "normal" ) {
      return (
        
        <div className="flex ">
          <div>
            <div className="mt-6 w-[800px] p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-[#ccc]">Select Your Seats</h1>
                </div>
                <div className="flex items-center justify-center mb-4 ">
                  <button
                    onClick={decreaseCount}
                    className=" bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
                  >
                    <span className=" text-[#063828] hover:text-[#e3ce90] font-jura text-[18px] font-bold">
                      -
                    </span>
                  </button>
                  <span className="px-8 py-2 text-[23px] text-[#e3ce90] font-jura font-bold">
                    {count}
                  </span>
                  <button
                    onClick={increaseCount}
                    className=" bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
                  >
                    <span className=" font-jura text-[18px] font-bold">+</span>
                  </button>
                </div>
              </div>
            </div>
            <div>
          <div className="mt-6 w-[800px] p-5 bg-white bg-opacity-10 rounded-lg shadow-md text-center mb-5">
            <h3>Select Your Duration</h3>
            <div className="flex mt-[27px] gap-x-2">
            {Object.keys(priceMapping[activeCard] || {}).map((duration) => (
              <button
                key={duration}
                onClick={() => handleDurationSelect(duration)}
                className={`w-[300px] h-[40px] px-[20px] py-[10px] ${
                  bookingDetails.find((d) => d.key === "duration")?.description.includes(`${duration}`)
                    ? "bg-gradient-to-r from-[#063828] to-[#002718] text-white font-bold"
                    : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-black"
                } rounded-lg`}
              >
                {duration} Mins
              </button>
              ))}
            </div>
          </div>
        </div>

            <div className="mt-6 w-[800px] p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
              <div className="flex flex-col space-y-4 ">
                <h1 className="text-[#ccc]">Select Date</h1>

                <div className="flex justify-between w-full max-w-1280px gap-2">
                  <button className="w-[400px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
                   onClick={() => handleDateSelect("6 Feb")}>
                    6 Feb
                  </button>
                  <button className="w-[400px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0" 
                   onClick={() => handleDateSelect("7 Feb")}>
                    7 Feb
                  </button>
                </div>

                <h1 className="mt-4 text-[#ccc]">Select Time</h1>

                <div className="flex flex-wrap justify-between w-full max-w-1280px gap-1">
                  {times.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => handleTimeSelect(time)} 
                      className="w-[110px] my-2 h-[40px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isFormVisible && (
            <div className="mt-6 w-[800px] p-5 bg-[#cccccc] bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-sm">{formErrors.firstName}</p>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
                  />
                  {formErrors.lastName && (
                    <p className="text-red-500 text-sm">{formErrors.lastName}</p>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm">{formErrors.phone}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full h-[50px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
                >
                  Submit Booking
                </button>
              </form>
            </div>
             )}
          </div>

          <div className="mt-6 ml-4 w-[310px] p-5 bg-white bg-opacity-10 rounded-lg shadow-md">
          <h2 className="text-[30px] text-[#cccccc] font-black">Booking Details</h2>
          {bookingDetails.map((detail) => (
            <div
              className="border-b-[0.5px] border-opacity-[50%] border-[#063828] py-[12px]"
              key={detail.key}
            >
              <div className="flex justify-between">
                <h3 className="text-[14px] text-[#cccccc] font-bold">
                  {detail.title}
                </h3>
                <p className="text-[14px] text-[#cccccc]">{detail.description}</p>
              </div>
            </div>
          ))}
          <div className="mt-6 flex">
          <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Coupon Code"
                  className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
                />
            <button
              onClick={handleApplyCoupon}
              className="w-[100px] h-[44px] rounded-lg bg-gradient-to-r from-[#C09E5D] to-[#FCE6A2] text-[#063828] ml-2"
            >
              Apply
            </button>
          </div>
          {discountMessage && (
                  <p className="text-[14px] mt-4 text-red-500 ">{discountMessage}</p>
                )}
            <div className="max-w-3xl mx-auto mt-20">
              {generalError && (
                <p className="text-red-500 text-md font-normal">
                  {generalError}
                </p>
              )}
              {bookingErrors.length > 0 && (
                <ul>
                  {bookingErrors.map((error, index) => (
                    <li
                      key={index}
                      className="text-red-500 text-md font-normal "
                    >
                      {error}
                    </li>
                  ))}
                </ul>
              )}
              <button
             onClick={handleContinue}
                className="w-full my-2 h-[40px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
              >
                <span className="py-2">CONTINUE</span>
              </button>
            </div>
        </div>
        
        </div>
      );
    } else if (activeCard === "vip") {
      return (
        <div className="flex">
          <div>
            <div className="mt-6 w-[800px] p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
            <h3>Select Your Duration</h3>
            <div className="flex mt-[27px] gap-x-2">
            {Object.keys(priceMapping[activeCard] || {}).map((duration) => (
              <button
                key={duration}
                onClick={() => handleDurationSelect(duration)}
                className={`w-[300px] h-[40px] px-[20px] py-[10px] ${
                  bookingDetails.find((d) => d.key === "duration")?.description.includes(`${duration}`)
                    ? "bg-gradient-to-r from-[#063828] to-[#002718] text-white font-bold"
                    : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-black"
                } rounded-lg`}
              >
                {duration} Mins
              </button>
              ))}
          </div>
            </div>
            <div className="mt-6 w-[800px] p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
              <div className="flex flex-col space-y-4 ">
                <h1 className="text-[#ccc]">Select Date</h1>

                <div className="flex justify-between w-full max-w-1280px gap-2">
                  <button className="w-[400px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
                   onClick={() => handleDateSelect("6 Feb")}>
                    6 Feb
                  </button>
                  <button className="w-[400px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
                   onClick={() => handleDateSelect("7 Feb")}>
                    7 Feb
                  </button>
                </div>

                <h1 className="text-[#ccc] mt-4">Select Time</h1>

                <div className="flex flex-wrap justify-between w-full max-w-1280px gap-1">
                  {times.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => handleTimeSelect(time)} 
                      className="w-[110px] my-2 h-[40px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isFormVisible && (
            <div className="mt-6 w-[800px] p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-sm">{formErrors.firstName}</p>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
                  />
                  {formErrors.lastName && (
                    <p className="text-red-500 text-sm">{formErrors.lastName}</p>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm">{formErrors.phone}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full h-[50px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
                >
                  Submit Booking
                </button>
              </form>
            </div>
              )}
          </div>
          <div className="mt-6 ml-4 w-[310px] p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
            <h2 className="text-[30px] text-[#cccccc] font-black font-orbitron mb-[24px]">
              Booking Details
            </h2>
            {bookingDetails
            .filter((detail) => detail.key !== "booking_type" && detail.key !== "no_of_people")
              .map((detail) => (
                <div
                  className="border-b-[0.5px] border-opacity-[50%] border-[#063828] py-[12px]"
                  key={detail.key}
                >
                 <div className="flex justify-between"><h3 className="text-[14px] text-[#cccccc] font-bold">
                    {detail.title}
                  </h3>
                  <p className="text-[14px] text-[#cccccc]">
                  {detail.key === "price" ? getPrice(activeCard, couponCode) : detail.description}
                  </p></div> 
                </div>
              ))}

              <div className="mt-6 flex">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Coupon Code"
                  className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
                />
                <button
                  onClick={handleCouponCode}
                  className="w-[100px] h-[44px] rounded-lg bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] font-jura text-[14px] cursor-pointer flex items-center justify-center p-2 border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 hover:border-0"
                >
                  Apply
                </button>
               
              </div>
              {discountMessage && (
                  <p className="text-[14px] mt-4 text-red-500 ">{discountMessage}</p>
                )}

            <div className="max-w-3xl mx-auto mt-20">
              {generalError && (
                <p className="text-red-500 text-md font-normal">
                  {generalError}
                </p>
              )}
              {bookingErrors.length > 0 && (
                <ul>
                  {bookingErrors.map((error, index) => (
                    <li
                      key={index}
                      className="text-red-500 text-md font-normal "
                    >
                      {error}
                    </li>
                  ))}
                </ul>
              )}
              <button
              onClick={handleContinue}
                className="w-full bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
              >
                <span className="py-2">CONTINUE</span>
              </button>
            </div>
          </div>
        </div>
      );
    } else if (activeCard === "suite") {
      return (
        <div className="flex">
          <div>
            <div className="mt-6 w-[800px] p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
              <div>
                <div>
                  <span className="text-[#ccc]">Select Your Duration</span>
                </div>
                <div className="flex mt-[27px] gap-x-2">
                {Object.keys(priceMapping[activeCard] || {}).map((duration) => (
                  <button
                    key={duration}
                    onClick={() => handleDurationSelect(duration)}
                    className={`w-[300px] h-[40px] px-[20px] py-[10px] ${
                      bookingDetails.find((d) => d.key === "duration")?.description.includes(`${duration}`)
                        ? "bg-gradient-to-r from-[#063828] to-[#002718] text-white font-bold"
                        : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-black"
                    } rounded-lg`}
                  >
                    {duration} Mins
                  </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 w-[800px] p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
              <div className="flex flex-col space-y-4 ">
                <h1 className="text-[#ccc]">Select Date</h1>

                <div className="flex justify-between w-full max-w-1280px gap-2">
                  <button className="w-[400px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
                   onClick={() => handleDateSelect("7 Feb")}>
                    6 Feb
                  </button>
                  <button className="w-[400px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
                   onClick={() => handleDateSelect("7 Feb")}>
                    7 Feb
                  </button>
                </div>

                <h1 className="mt-4 text-[#ccc]">Select Time</h1>

                <div className="flex flex-wrap justify-between w-full max-w-1280px gap-1">
                  {times.map((time, index) => (
                    <button
                      key={index}
                      onClick={() => handleTimeSelect(time)} 
                      className="w-[110px] my-2 h-[40px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
                    >
                      {time}
                    </button>
                  ))}
                </div>

                
              </div>
              
            </div>

            {isFormVisible && (
            <div className="mt-6 w-[800px] p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-sm">{formErrors.firstName}</p>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
                  />
                  {formErrors.lastName && (
                    <p className="text-red-500 text-sm">{formErrors.lastName}</p>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]]"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm">{formErrors.phone}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg h-[50px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] font-jura text-[14px] cursor-pointer flex items-center justify-center px-[20px] py-[8px] border-opacity-30 border-[#063828] font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 hover:border-0"
                >
                  Submit Booking
                </button>
              </form>
            </div>
            )}
          </div>

          <div className="mt-6 ml-4 w-[310px] p-5 bg-[#cccccc] bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
            <h2 className="text-[30px] text-[#cccccc] font-black font-orbitron mb-[24px]">
              Booking Details
            </h2>
            {bookingDetails
              .filter((detail) => detail.key !== "booking_type" && detail.key !== "no_of_people")
              .map((detail) => (
                <div
                  className="border-b-[0.5px] border-opacity-[50%] border-[#063828] py-[12px]"
                  key={detail.key}
                >
                 <div className="flex justify-between"><h3 className="text-[14px] text-[#cccccc] font-bold">
                    {detail.title}
                  </h3>
                  <p className="text-[14px] text-[#cccccc]">
                  {detail.key === "price" ? getPrice(activeCard, couponCode) : detail.description}
                  </p></div> 
                </div>
              ))}

            <div className="mt-6 flex">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter Coupon Code"
                  className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
                />
                <button
                  onClick={handleCouponCode}
                  className="w-[100px] h-[44px] rounded-lg bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] font-jura text-[14px] cursor-pointer flex items-center justify-center p-2 border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 hover:border-0"
                >
                  Apply
                </button>
               
              </div>
              {discountMessage && (
                  <p className="text-[14px] mt-4 text-red-500 ">{discountMessage}</p>
                )}
            <div className="max-w-3xl mx-auto mt-20">
              {generalError && (
                <p className="text-red-500 text-md font-normal">
                  {generalError}
                </p>
              )}
              {bookingErrors.length > 0 && (
                <ul>
                  {bookingErrors.map((error, index) => (
                    <li
                      key={index}
                      className="text-red-500 text-md font-normal "
                    >
                      {error}
                    </li>
                  ))}
                </ul>
              )}
              <button
             onClick={handleContinue}
                className="w-full my-2 h-[40px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
              >
                <span className="py-2">CONTINUE</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 my-20">
    {!showBookingDetails && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          onClick={() => handleCardClick("normal")}
          className="bg-[#ccc] p-5 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-2xl opacity-100 w-[320px] h-[218px] bg-opacity-20 flex flex-col justify-between"
        >
          <h2 className="text-[24px] font-bold text-[#cccccc] mb-4">Normal</h2>
          <p className="text-[14px] text-[#cccccc] mb-4">
            Choose a first-class VIP room where two simulators offer a premium
            experience.
          </p>
          <BookNow />
        </div>

        <div
          onClick={() => handleCardClick("vip")}
          className="bg-[#ccc] p-5 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-2xl opacity-100 w-[320px] h-[218px] bg-opacity-20 flex flex-col justify-between"
        >
          <h2 className="text-[24px] font-bold text-[#cccccc] mb-4">VIP</h2>
          <p className="text-[14px] text-[#cccccc] mb-4">
            Choose a first-class VIP room where two simulators offer a premium
            experience.
          </p>
          <BookNow />
        </div>

        <div
          onClick={() => handleCardClick("suite")}
          className="bg-[#ccc] p-5 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-2xl opacity-100 w-[320px] h-[218px] bg-opacity-20 flex flex-col justify-between"
        >
          <h2 className="text-[24px] font-bold text-[#cccccc] mb-4">Suite</h2>
          <p className="text-[14px] text-[#cccccc] mb-4">
            Indulge in a luxurious lounge room with premium features and
            ambiance for you and your friends.
          </p>
          <BookNow />
        </div>
      </div>
    )}

    {activeCard && renderCardDetails()}
  </div>
  );
};

export default Cards;



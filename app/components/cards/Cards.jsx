"use client";

import React, { useState } from "react";
import BookNow from "../booknow/BookNow";
import Link from "next/link";

const Cards = () => {
  const [activeCard, setActiveCard] = useState("");
  const [count, setCount] = useState(1);
  const [generalError, setGeneralError] = useState("");
  const [bookingErrors, setBookingErrors] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null); 
  const [bookingDetails, setBookingDetails] = useState([
    { key: "no_of_people", title: "Participants", description: "1" },
    { key: "duration", title: "Duration", description: "" },
    { key: "price", title: "Price", description: "" },
    { key: "date", title: "Date", description: "" },
    { key: "time", title: "Time", description: "" },
  ]);
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClose = () => {
    setMenuOpen(false);
  };
  const priceMapping = {
    normal: { 20: 95, 40: 170, 60: 250 },
    vip: { 60: 400, 90: 500, 120: 650 },
    suite: { 60: 800, 90: 1000, 120: 1200 },
  };

  const [bookingMessage, setBookingMessage] = useState("");
  const [activeDate, setActiveDate] = useState("");
  const [activeTime, setActiveTime] = useState("");


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

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setDiscountMessage("Invalid coupon code. Please try again.");
    }
  };


  const getPrice = (activeCard, duration, coupon, count = 1) => {
    const originalPrice = priceMapping[activeCard]?.[duration];
    if (!originalPrice) {
      return "";
    }

    let totalPrice = originalPrice * count;
    

    if (coupon === "LEAP25") {
      const discountedPrice = originalPrice / 2;
      return `${totalPrice} ${discountedPrice}   SAR (50% off, VAT Inc)`;
    }

    return `${totalPrice} SAR (VAT Inclusive)`;
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
    setActiveDate(selectedDate);
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
    setActiveTime(selectedTime);
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
          : detail.key === "price"
            ? {
              ...detail,
              description: getPrice(
                activeCard,
                prevDetails.find((d) => d.key === "duration")?.description.split(" ")[0],
                couponCode,
                newCount
              ),
            }
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
            : detail.key === "price"
              ? {
                ...detail,
                description: getPrice(
                  activeCard,
                  prevDetails.find((d) => d.key === "duration")?.description.split(" ")[0],
                  couponCode,
                  newCount
                ),
              }
              : detail
        )
      );
    }
  };

 
  const handleSeatChange = (newCount) => {
    setBookingDetails((prevDetails) =>
      prevDetails.map((detail) =>
        detail.key === "no_of_people" ? { ...detail, description: newCount.toString() } : detail
      )
    );
  };


  const handleCouponCode = () => {
    if (couponCode === "LEAP25") {
      setDiscountMessage("Enjoy 50% off all services during Leap Nights, valid only on February 6 and 7. The discount will be applied once you select your sessions.");
      setTimeout(() => {  setDiscountMessage(""); }, 3000)
    } else {
      setDiscountMessage("Invalid coupon code. Please try again.");
      setTimeout(() => {  setDiscountMessage(""); }, 3000)
    }
  };


  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const validateForm = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.phone) errors.phone = "Phone number is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      // setBookingMessage('Booking successfully submitted!');
      setFormErrors(errors);
    } else {
      setFormErrors({});
      setBookingMessage("Booking successfully submitted!"); 

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        duration : "",
        date : "",
        time : "",
        price : "",
      })
      

      // setTimeout(() => {
      //   setBookingMessage(""); 
      // }, 3000);

    }
 
    const customerEmail = formData.email;
    const companyEmail = "info@teleiosx.com";

    // https://leap.teleiosx.com/email/email.phpapi/send-email
    try {
      const response = await fetch("https://leap.teleiosx.com/email/email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail,
          companyEmail,
          formData,
          bookingDetails,
          name: `${formData.firstName} ${formData.lastName}`,
        }),
        
      });
    
  

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result.message);
        // setIsSuccess(true);

        // window.location.reload();
      } else {
        const error = await response.json();
        setBookingMessage("Failed to book. Please try again.");
       
       
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setBookingMessage("An error occurred while booking. Please try again.");
    
    }
  };


  const handleContinue = () => {
    const incompleteFields = bookingDetails.filter(
      (detail) => !detail.description
    );
    if (incompleteFields.length > 0) {
      setGeneralError("Please complete all booking details before continuing.");
      setTimeout(() => { setGeneralError(""); }, 3000)
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
                className="w-full  hover:translate-y-[-10px] h-[50px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px] border-opacity-30 border-[#063828] font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 hover:border-0"
              >
                Submit Booking
              </button>
            </form>

            {bookingMessage && (
        <div
          className={`bg-white p-6 rounded-md shadow-md text-center w-[300px] py-4 mt-4 `}
        >
          <p
            className={`font-normal mb-10 ${
              isSuccess ? "text-green-500" : "text-green-500"
            }`}
          >
            {bookingMessage}
          </p>

          <Link
            href="/"
            className={`mt-4 px-4 py-2 ${
              isSuccess ? "bg-green-500" : "bg-green-500"
            } text-white rounded-md`}
            onClick={handleClose}
          >
            Close
          </Link>
        </div>
      )}
          </div>

          <div className="mt-6 ml-4 w-[330px] p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
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
                    <p className="text-[14px] text-[#cccccc] ">
                      {detail.key === "price"
                        ? getPrice(
                          activeCard,
                          bookingDetails.find((d) => d.key === "duration")?.description.split(" ")[0],
                          couponCode,
                          count
                        )
                        : detail.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      );
    }

    if (activeCard === "normal") {
      return (

        <div className="xl:flex ">
          <div>
            <div className=" mt-6 w-auto p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md mb-5 transition-transform transition-shadow duration-300">
              <div className="flex-layout flex justify-between">
                <div>
                  <h1 className="text-[#ccc]">Select Your Seats</h1>
                </div>
                <div className="flex items-center justify-center mb-4 ">
                  <button
                    onClick={decreaseCount}
                    className=" bg-gradient-to-r  hover:translate-y-[-10px] from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
                  >
                    <span className=" text-[#063828] hover:text-[#e3ce90] font-jura text-[18px] font-bold">
                      -
                    </span>
                  </button>
                  <span className="px-8  hover:translate-y-[-10px] py-2 text-[23px] text-[#e3ce90] font-jura font-bold">
                    {count}
                  </span>
                  <button
                    onClick={increaseCount}
                    className=" bg-gradient-to-r  hover:translate-y-[-10px] from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
                  >
                    <span className=" font-jura text-[18px] font-bold">+</span>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="details-card mt-6 w-auto p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md mb-5">
                <h3 className="text-[#ccc]">Select Your Duration</h3>
                <div className="xl:flex mt-[27px] gap-x-2">
                  {Object.keys(priceMapping[activeCard] || {}).map((duration) => (
                    <button
                      key={duration}
                      onClick={() => handleDurationSelect(duration)}
                      className={`w-full hover:translate-y-[-10px] h-[40px] my-2 xl:my-0 px-[20px] py-[10px] ${bookingDetails.find((d) => d.key === "duration")?.description.includes(`${duration}`)
                        ? "bg-gradient-to-r from-[#063828] to-[#002718] text-[#ccc] font-bold "
                        : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-[#063828]"
                        } rounded-lg`}
                    >
                      {duration} Mins
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className=" details-card mt-6 w-auto p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md  mb-5 transition-transform transition-shadow duration-300">
              <div className="flex flex-col space-y-4 ">
                <h1 className="text-[#ccc]">Select Date</h1>

                <div className="flex justify-between w-full max-w-1280px gap-2">
                    <button
                        className={`w-full date-button hover:translate-y-[-10px] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px] ml-2 font-jura font-bold transition duration-300 ${
                            activeDate === "6 Feb"
                                  ? "bg-gradient-to-r from-[#063828] to-[#002718] text-[#ccc] font-bold "
                        : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-[#063828]"
                        }`}
                        onClick={() => handleDateSelect("6 Feb")}
                    >
                        6 Feb
                    </button>

                    <button
                        className={`w-full date-button hover:translate-y-[-10px] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px] ml-2 font-jura font-bold transition duration-300 ${
                            activeDate === "7 Feb"
                                ? "bg-gradient-to-r from-[#063828] to-[#002718] text-[#ccc] font-bold "
                        : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-[#063828]"
                        }`}
                        onClick={() => handleDateSelect("7 Feb")}
                    >
                        7 Feb
                    </button>
                  </div>

                <h1 className="mt-4 text-[#ccc]">Select Time</h1>

                <div className="flex flex-wrap w-full max-w-1280px gap-1">
                  {times.map((time, index) => (
                    <button
                    key={index}
                    onClick={() => handleTimeSelect(time)}
                    className={`w-[120px] hover:translate-y-[-10px] h-[40px] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px] font-jura font-bold transition duration-300 ${
                      activeTime === time
                        ? "bg-gradient-to-r from-[#063828] to-[#002718] text-[#ccc] font-bold "
                        : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-[#063828]"
                    }`}
                  >
                    {time}
                  </button>
                  ))}
                </div>
              </div>
            </div>

            {isFormVisible && (
              <div className="mt-6 w-auto p-5 bg-[#cccccc] bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
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
                    className="w-full hover:translate-y-[-10px] h-[50px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
                  >
                    Submit Booking
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="mt-6 xl:ml-4 w-[330px] p-5 text-[#ccc] bg-opacity-10 rounded-lg shadow-md">
            <h2 className="text-[30px] text-[#cccccc] font-black">Booking Details</h2>
            {bookingDetails.map((detail) => (
              <div
                className="border-b-[0.5px] border-opacity-[50%] border-[#063828] py-[12px]"
                key={detail.key}
              >
                <div className="flex justify-between"><h3 className="text-[14px] text-[#cccccc] font-bold">
                    {detail.title}
                  </h3>
                    <p className="text-[14px] text-[#cccccc] text-end">
                      {detail.key === "price"
                        ? getPrice(
                          activeCard,
                          bookingDetails.find((d) => d.key === "duration")?.description.split(" ")[0],
                          couponCode,
                          count

                        )
                        : detail.description}
                    </p>

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
                onClick={handleCouponCode}
                className="w-[100px]  hover:translate-y-[-10px] h-[44px] rounded-lg bg-gradient-to-r from-[#C09E5D] to-[#FCE6A2] text-[#063828] ml-2"
              >
                Apply
              </button>
            </div>
            {discountMessage && (
              <p className="text-[14px] mt-4 text-[#6ada2a] ">{discountMessage}</p>
            )}
            <div className="max-w-3xl mx-auto mt-20">
              {generalError && (
                <p className="text-[#6ada2a] text-md font-normal">
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
                className="w-full my-2  hover:translate-y-[-10px] h-[40px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
              >
                <span className="py-2">CONTINUE</span>
              </button>
            </div>
          </div>

        </div>
      );
    } else if (activeCard === "vip") {
      return (
        <div className="xl:flex">
          <div>
            <div className=" details-card mt-6 w-auto p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md  mb-5 transition-transform transition-shadow duration-300">
              <h3 className="text-[#ccc]"> Select Your Duration</h3>
              <div className="xl:flex mt-[27px] gap-x-2">
                {Object.keys(priceMapping[activeCard] || {}).map((duration) => (
                  <button
                    key={duration}
                    onClick={() => handleDurationSelect(duration)}
                    className={`w-full hover:translate-y-[-10px] h-[40px] my-2 xl:my-0 px-[20px] py-[10px] ${bookingDetails.find((d) => d.key === "duration")?.description.includes(`${duration}`)
                      ? "bg-gradient-to-r from-[#063828] to-[#002718] text-[#ccc] font-bold"
                      : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-[#063828]"
                      } rounded-lg`}
                  >
                    {duration} Mins
                  </button>
                ))}
              </div>
            </div>
            <div className="details-card mt-6 w-auto p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md mb-5 transition-transform transition-shadow duration-300">
              <div className="flex flex-col space-y-4 ">
                <h1 className="text-[#ccc]">Select Date</h1>

                <div className="flex justify-between w-full max-w-1280px gap-2">
                <button
                        className={`w-full date-button hover:translate-y-[-10px] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px] ml-2 font-jura font-bold transition duration-300 ${
                            activeDate === "6 Feb"
                                 ? "bg-gradient-to-r from-[#063828] to-[#002718] text-white font-bold "
                        : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-[#063828]"
                        }`}
                        onClick={() => handleDateSelect("6 Feb")}
                    >
                        6 Feb
                    </button>

                    <button
                        className={`w-full date-button hover:translate-y-[-10px] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px] ml-2 font-jura font-bold transition duration-300 ${
                            activeDate === "7 Feb"
                                 ? "bg-gradient-to-r from-[#063828] to-[#002718] text-white font-bold "
                        : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-[#063828]"
                        }`}
                        onClick={() => handleDateSelect("7 Feb")}
                    >
                        7 Feb
                    </button>
                </div>

                <h1 className="text-[#ccc] mt-4">Select Time</h1>

                <div className="flex flex-wrap w-full max-w-1280px gap-1">
                  {times.map((time, index) => (
                    <button
                    key={index}
                    onClick={() => handleTimeSelect(time)}
                    className={`w-[120px] hover:translate-y-[-10px] h-[40px] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px] font-jura font-bold transition duration-300 ${
                      activeTime === time
                         ? "bg-gradient-to-r from-[#063828] to-[#002718] text-white font-bold "
                        : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-[#063828]"
                    }`}
                  >
                    {time}
                  </button>
                  ))}
                </div>
              </div>
            </div>

            {isFormVisible && (
              <div className="mt-6 w-auto p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md mb-5 transition-transform transition-shadow duration-300">
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
                    className="w-full hover:translate-y-[-10px] h-[50px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
                  >
                    Submit Booking
                  </button>
                </form>
              </div>
            )}
          </div>
          <div className="mt-6 xl:ml-4 w-[330px] p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md mb-5 transition-transform transition-shadow duration-300">
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
                    <p className="text-[14px] text-[#cccccc] text-end">
                      {detail.key === "price"
                        ? getPrice(
                          activeCard,
                          bookingDetails.find((d) => d.key === "duration")?.description.split(" ")[0],
                          couponCode,

                        )
                        : detail.description}
                    </p>

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
                onClick={handleCouponCode}
                className="w-[100px] h-[44px]  hover:translate-y-[-10px] rounded-lg bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] font-jura text-[14px] cursor-pointer flex items-center justify-center p-2 border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 hover:border-0"
              >
                Apply
              </button>

            </div>
            {discountMessage && (
              <p className="text-[14px] mt-4 text-[#6ada2a] ">{discountMessage}</p>
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
                className="w-full my-2  hover:translate-y-[-10px] h-[40px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
              >
                <span className="py-2">CONTINUE</span>
              </button>
            </div>
          </div>
        </div>
      );
    } else if (activeCard === "suite") {
      return (
        <div className="xl:flex">
          <div>
            <div className="details-card mt-6 w-auto p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md mb-5 transition-transform transition-shadow duration-300">
              <div>
                <div>
                  <span className="text-[#ccc]">Select Your Duration</span>
                </div>
                <div className=" duration xl:flex mt-[27px] gap-x-2">
                  {Object.keys(priceMapping[activeCard] || {}).map((duration) => (
                    <button
                      key={duration}
                      onClick={() => handleDurationSelect(duration)}
                      className={`w-full hover:translate-y-[-10px] h-[40px] my-2 xl:my-0 px-[20px] py-[10px] ${bookingDetails.find((d) => d.key === "duration")?.description.includes(`${duration}`)
                        ? "bg-gradient-to-r from-[#063828] to-[#002718] text-[#ccc] font-bold"
                        : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-black"
                        } rounded-lg`}
                    >
                      {duration} Mins
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="details-card mt-6 w-auto p-5 bg-[#ccc] bg-opacity-10 rounded-lg shadow-md mb-5 transition-transform transition-shadow duration-300">
              <div className="flex flex-col space-y-4 ">
                <h1 className="text-[#ccc]">Select Date</h1>

                <div className="flex justify-between w-full max-w-1280px gap-2">
                <button
                        className={`w-full date-button hover:translate-y-[-10px] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px] ml-2 font-jura font-bold transition duration-300 ${
                            activeDate === "6 Feb"
                                 ? "bg-gradient-to-r from-[#063828] to-[#002718] text-[#ccc] font-bold "
                        : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-[#063828]"
                        }`}
                        onClick={() => handleDateSelect("6 Feb")}
                    >
                        6 Feb
                    </button>

                    <button
                        className={`w-full date-button hover:translate-y-[-10px] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px] ml-2 font-jura font-bold transition duration-300 ${
                            activeDate === "7 Feb"
                                 ? "bg-gradient-to-r from-[#063828] to-[#002718] text-[#ccc]font-bold "
                        : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-[#063828]"
                        }`}
                        onClick={() => handleDateSelect("7 Feb")}
                    >
                        7 Feb
                    </button>
                </div>

                <h1 className="mt-4 text-[#ccc]">Select Time</h1>

                <div className="flex flex-wrap w-full max-w-1280px gap-1">
                  {times.map((time, index) => (
                    <button
                    key={index}
                    onClick={() => handleTimeSelect(time)}
                    className={`w-[120px] hover:translate-y-[-10px] h-[40px] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px] font-jura font-bold transition duration-300 ${
                      activeTime === time
                         ? "bg-gradient-to-r from-[#063828] to-[#002718] text-[#ccc] font-bold "
                        : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-[#063828]"
                    }`}
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
                    className="w-full  hover:translate-y-[-10px] rounded-lg h-[50px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] font-jura text-[14px] cursor-pointer flex items-center justify-center px-[20px] py-[8px] border-opacity-30 border-[#063828] font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 hover:border-0"
                  >
                    Submit Booking
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="mt-6 xl:ml-4 w-[330px] p-5 bg-[#cccccc] bg-opacity-10 rounded-lg shadow-md mb-5 transition-transform transition-shadow duration-300">
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
                    <p className="text-[14px] text-[#cccccc] text-end">
                      {detail.key === "price"
                        ? getPrice(
                          activeCard,
                          bookingDetails.find((d) => d.key === "duration")?.description.split(" ")[0],
                          couponCode,

                        )
                        : detail.description}
                    </p>

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
                onClick={handleCouponCode}
                className="w-[100px] hover:translate-y-[-10px] h-[44px] rounded-lg bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] font-jura text-[14px] cursor-pointer flex items-center justify-center p-2 border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 hover:border-0"
              >
                Apply
              </button>

            </div>
            {discountMessage && (
              <p className="text-[14px] mt-4 text-[#6ada2a] ">{discountMessage}</p>
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
                className="w-full my-2  hover:translate-y-[-10px] h-[40px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
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
    <div className="max-w-7xl mx-auto p-2 my-10">
      {!showBookingDetails && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 direction-card ">
          <div
            onClick={() => handleCardClick("normal")}
            className={`p-5 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-2xl opacity-100 w-auto flex flex-col justify-between ${activeCard === "normal"
              ? "bg-[#063828] text-[#e3ce90]"
              : "bg-[#ccc] bg-opacity-20 text-[#cccccc]"
              }`}
          >
            <h2 className="text-[24px] font-bold mb-4">Normal</h2>
            <p className="text-[14px] mb-4">
              Choose a first-class VIP room where two simulators offer a premium
              experience.
            </p>
            <BookNow />
          </div>

          <div
            onClick={() => handleCardClick("vip")}
            className={`p-5 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-2xl opacity-100 w-auto flex flex-col justify-between ${activeCard === "vip"
              ? "bg-[#063828] text-[#e3ce90]"
              : "bg-[#ccc] bg-opacity-20 text-[#cccccc]"
              }`}
          >
            <h2 className="text-[24px] font-bold mb-4">VIP</h2>
            <p className="text-[14px] mb-4">
              Choose a first-class VIP room where two simulators offer a premium
              experience.
            </p>
            <BookNow />
          </div>

          <div
            onClick={() => handleCardClick("suite")}
            className={`p-5 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-2xl opacity-100 w-auto flex flex-col justify-between ${activeCard === "suite"
              ? "bg-[#063828] text-[#e3ce90]"
              : "bg-[#ccc] bg-opacity-20 text-[#cccccc]"
              }`}
          >
            <h2 className="text-[24px] font-bold mb-4">Suite</h2>
            <p className="text-[14px] mb-4">
              Indulge in a luxurious lounge room with premium features and ambiance
              for you and your friends.
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



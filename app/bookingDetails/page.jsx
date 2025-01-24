// "use client";

// import React, { useState } from "react";
// import BookNow from "../booknow/BookNow";

// const Page = ({ onPlanChange, onPlanChangeVip, onPlanChangeSuite }) => {
//   const [activeCard, setActiveCard] = useState("");
//   const [count, setCount] = useState(1);
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [selectedPlan, setSelectedPlan] = useState("bronze");
//   const [selectedPlanVip, setSelectedPlanVip] = useState("bronze");
//   const [selectedPlanSuite, setSelectedPlanSuite] = useState("bronze");
//   const [generalError, setGeneralError] = useState("");
//   const [bookingErrors, setBookingErrors] = useState([]);
//   const [couponCode, setCouponCode] = useState("");
//   const [discountMessage, setDiscountMessage] = useState("");



//   const handleCardClick = (cardType) => {
//     setActiveCard(cardType);
//   };

//   const handleDateSelect = (selectedDate) => {
//     setBookingDetails((prevDetails) =>
//       prevDetails.map((detail) =>
//         detail.key === "date" ? { ...detail, description: selectedDate } : detail
//       )
//     );
//   };

//   const handleDurationSelect = (selectedDuration) => {
//     setBookingDetails((prevDetails) =>
//       prevDetails.map((detail) =>
//         detail.key === "duration" ? { ...detail, description: `${selectedDuration} Mins` } : detail
//       )
//     );
//   };
  

//   const handleDurationSelectVip = (selectedDuration) => {
//     setBookingDetails((prevDetails) =>
//       prevDetails.map((detail) =>
//         detail.key === "duration" ? { ...detail, description: `${selectedDuration} Mins` } : detail
//       )
//     );
//   };

//   const handleDurationSelectSuite = (selectedDuration) => {
//     setBookingDetails((prevDetails) =>
//       prevDetails.map((detail) =>
//         detail.key === "duration" ? { ...detail, description: `${selectedDuration} Mins` } : detail
//       )
//     );
//   };
  
  
//   const handleCouponCode = () => {
//     if (couponCode === "LEAP25") {
//       setDiscountMessage("Enjoy 50% off all services during Leap Nights, valid only on February 6 and 7. The discount will be applied once you select your sessions.");
//     } else {
//       setDiscountMessage("Invalid coupon code. Please try again.");
//     }
//   };
  

//   const times = [
//     "2:00 PM",
//     "3:00 PM",
//     "4:00 PM",
//     "5:00 PM",
//     "6:00 PM",
//     "7:00 PM",
//     "8:00 PM",
//     "9:00 PM",
//     "10:00 PM",
//     "11:00 PM",
//     "12:00 AM",
//     "1:00 AM",
//   ];



//   const [bookingDetails, setBookingDetails] = useState([
//     // { key: "name", title: "Name", description: "" },
//     { key: "no_of_people", title: "Participants", description: "1" },
//     { key: "duration", title: "Duration", description: "" },
//     // { key: "date", title: "Date", description: new Date().toLocaleDateString("en-CA") },
//     { key: "date", title: "Date", description: "" },
//     { key: "time", title: "Time", description: "" },
//     { key: "booking_type", title: "Booking Type", description: "Normal" },
//     { key: "price", title: "Price", description: "95 47.5 SAR (50% off, VAT Inclusive)" },
//   ]);
  

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//   });
  
//   const [formErrors, setFormErrors] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//   });
  

//   const handleTimeSelect = (selectedTime) => {
//     setBookingDetails((prevDetails) =>
//       prevDetails.map((detail) =>
//         detail.key === "time" ? { ...detail, description: selectedTime } : detail
//       )
//     );
//   };


//   const increaseCount = () => {
//     const newCount = count + 1;
//     setCount(newCount);
//     handleSeatChange(newCount);
//   };
  
//   const decreaseCount = () => {
//     if (count > 1) {
//       const newCount = count - 1;
//       setCount(newCount); 
//       handleSeatChange(newCount);
//     }
//   };
//   const handleSeatChange = (newCount) => {
//     setBookingDetails((prevDetails) =>
//       prevDetails.map((detail) =>
//         detail.key === "no_of_people" ? { ...detail, description: newCount.toString() } : detail
//       )
//     );
//   };
  

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
  

//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     const errors = {};
  

//     if (!formData.firstName) {
//       errors.firstName = 'First Name is required.';
//     }
  

//     if (!formData.lastName) {
//       errors.lastName = 'Last Name is required.';
//     }
  

//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     if (!formData.email || !emailRegex.test(formData.email)) {
//       errors.email = 'Please enter a valid email.';
//     }
  
//     const phoneRegex = /^\d{10}$/;
//     if (!formData.phone || !phoneRegex.test(formData.phone)) {
//       errors.phone = 'Please enter a valid phone number (10 digits).';
//     }
  
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//     } else {

//       console.log('Form submitted successfully', formData);
//     }
//   };
  

  

//   const renderCardDetails = () => {

//     const getPrice = () => {
//       if (activeCard === "normal") {
//         return "95 47.5 SAR (50% off, VAT Inclusive)";
//       } else if (activeCard === "vip" || activeCard === "suite") {
//         return "1000 500 SAR (50% off, VAT Inclusive)";
//       }
//       return "95 47.5 SAR (50% off, VAT Inclusive)"; 
//     };

//     if (activeCard === "normal") {
//       return (
//         <div className="flex ">
//           <div>
        
//             <div className="mt-6 w-[800px] p-5 bg-white bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     placeholder="First Name"
//                     className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
//                   />
//                   {formErrors.firstName && (
//                     <p className="text-red-500 text-sm">{formErrors.firstName}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     placeholder="Last Name"
//                     className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
//                   />
//                   {formErrors.lastName && (
//                     <p className="text-red-500 text-sm">{formErrors.lastName}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="Email"
//                     className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
//                   />
//                   {formErrors.email && (
//                     <p className="text-red-500 text-sm">{formErrors.email}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <input
//                     type="text"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="Phone Number"
//                     className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
//                   />
//                   {formErrors.phone && (
//                     <p className="text-red-500 text-sm">{formErrors.phone}</p>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full h-[50px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
//                 >
//                   Submit Booking
//                 </button>
//               </form>
//             </div>
//           </div>

//           <div className="mt-6 ml-4 w-[310px] p-5 bg-white bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
//             <h2 className="text-[30px] text-[#cccccc] font-black font-orbitron mb-[24px]">
//               Booking Details
//             </h2>
//             {bookingDetails
//               .filter((detail) => detail.key !== "booking_type" && detail.key !== "no_of_people")
//               .map((detail, index) => (
//                 <div
//                   className="border-b-[0.5px] border-opacity-[50%] border-[#063828] py-[12px]"
//                   key={detail.key}
//                 >
//                  <div className="flex justify-between"><h3 className="text-[14px] text-[#cccccc] font-bold">
//                     {detail.title}
//                   </h3>
//                   <p className="text-[14px] text-[#cccccc]">
//                     {detail.key === "price" ? getPrice() : detail.description}
//                   </p></div> 
//                 </div>
//               ))}

  

//             <div className="mt-6 flex">
//                 <input
//                   type="text"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                   placeholder="Enter Coupon Code"
//                   className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
//                 />
//                 <button
//                   onClick={handleCouponCode}
//                   className="w-[100px] h-[44px] rounded-lg bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] font-jura text-[14px] cursor-pointer flex items-center justify-center p-2 border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 hover:border-0"
//                 >
//                   Apply
//                 </button>
               
//               </div>
//               {discountMessage && (
//                   <p className="text-[14px] mt-4 text-red-500 ">{discountMessage}</p>
//                 )}


              

//             <div className="max-w-3xl mx-auto mt-20">
//               {generalError && (
//                 <p className="text-red-500 text-md font-normal">
//                   {generalError}
//                 </p>
//               )}
//               {bookingErrors.length > 0 && (
//                 <ul>
//                   {bookingErrors.map((error, index) => (
//                     <li
//                       key={index}
//                       className="text-red-500 text-md font-normal "
//                     >
//                       {error}
//                     </li>
//                   ))}
//                 </ul>
//               )}



//               <button
//                 onClick={() => handleTabChange(2)}
//                 className="w-full my-2 h-[40px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
//               >
//                 <span className="py-2">CONTINUE</span>
//               </button>

//             </div>
//           </div>
//         </div>
//       );
//     } else if (activeCard === "vip") {
//       return (
//         <div className="flex">
//           <div>
//             <div className="mt-6 w-[800px] p-5 bg-white bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
//               <div>
//                 <div>
//                   <span>Select Your Duration</span>
//                 </div>
//                 <div className="flex mt-[27px] gap-x-2">
//                 {["60", "90", "120"].map((duration) => (
//                     <button
//                     key={duration}
//                     onClick={() => handleDurationSelectVip(duration)}
//                     className={`w-[300px] h-[40px] px-[20px] py-[10px] font-jura text-[16px] cursor-pointer 
//                       ${
//                         bookingDetails.find((detail) => detail.key === "duration").description === `${duration} Mins`
//                           ? "bg-gradient-to-r from-[#063828] to-[#002718] text-[#ccc] font-bold rounded-lg"
//                           : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-[#063828] rounded-[8px] border-none transition-all duration-300"
//                       }
//                     `}
//                     >
//                       <span className="font-jura font-normal md:font-bold">{duration} Mins</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="mt-6 w-[800px] p-5 bg-white bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
//               <div className="flex flex-col space-y-4 ">
//                 <h1 className="">Select Date</h1>

//                 <div className="flex justify-between w-full max-w-1280px gap-2">
//                   <button className="w-[400px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
//                    onClick={() => handleDateSelect("6 Feb")}>
//                     6 Feb
//                   </button>
//                   <button className="w-[400px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
//                    onClick={() => handleDateSelect("7 Feb")}>
//                     7 Feb
//                   </button>
//                 </div>

//                 <h1 className="mt-4">Select Time</h1>

//                 <div className="flex flex-wrap justify-between w-full max-w-1280px gap-1">
//                   {times.map((time, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleTimeSelect(time)} 
//                       className="w-[110px] my-2 h-[40px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
//                     >
//                       {time}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 w-[800px] p-5 bg-white bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     placeholder="First Name"
//                     className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
//                   />
//                   {formErrors.firstName && (
//                     <p className="text-red-500 text-sm">{formErrors.firstName}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     placeholder="Last Name"
//                     className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
//                   />
//                   {formErrors.lastName && (
//                     <p className="text-red-500 text-sm">{formErrors.lastName}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="Email"
//                     className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
//                   />
//                   {formErrors.email && (
//                     <p className="text-red-500 text-sm">{formErrors.email}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <input
//                     type="text"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="Phone Number"
//                     className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
//                   />
//                   {formErrors.phone && (
//                     <p className="text-red-500 text-sm">{formErrors.phone}</p>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full h-[50px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
//                 >
//                   Submit Booking
//                 </button>
//               </form>
//             </div>
//           </div>
//           <div className="mt-6 ml-4 w-[310px] p-5 bg-white bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
//             <h2 className="text-[30px] text-[#cccccc] font-black font-orbitron mb-[24px]">
//               Booking Details
//             </h2>
//             {bookingDetails
//               .filter((detail) => detail.key !== "booking_type" && detail.key !== "no_of_people")
//               .map((detail, index) => (
//                 <div
//                   className="border-b-[0.5px] border-opacity-[50%] border-[#063828] py-[12px]"
//                   key={detail.key}
//                 >
//                  <div className="flex justify-between"><h3 className="text-[14px] text-[#cccccc] font-bold">
//                     {detail.title}
//                   </h3>
//                   <p className="text-[14px] text-[#cccccc]">
//                   {detail.key === "price" ? getPrice() : detail.description}
//                   </p></div> 
//                 </div>
//               ))}

//               <div className="mt-6 flex">
//                 <input
//                   type="text"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                   placeholder="Enter Coupon Code"
//                   className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
//                 />
//                 <button
//                   onClick={handleCouponCode}
//                   className="w-[100px] h-[44px] rounded-lg bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] font-jura text-[14px] cursor-pointer flex items-center justify-center p-2 border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 hover:border-0"
//                 >
//                   Apply
//                 </button>
               
//               </div>
//               {discountMessage && (
//                   <p className="text-[14px] mt-4 text-red-500 ">{discountMessage}</p>
//                 )}

//             <div className="max-w-3xl mx-auto mt-20">
//               {generalError && (
//                 <p className="text-red-500 text-md font-normal">
//                   {generalError}
//                 </p>
//               )}
//               {bookingErrors.length > 0 && (
//                 <ul>
//                   {bookingErrors.map((error, index) => (
//                     <li
//                       key={index}
//                       className="text-red-500 text-md font-normal "
//                     >
//                       {error}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               <button
//                 onClick={() => handleTabChange(2)}
//                 className="w-full bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
//               >
//                 <span className="py-2">CONTINUE</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//     } else if (activeCard === "suite") {
//       return (
//         <div className="flex">
//           <div>
//             <div className="mt-6 w-[800px] p-5 bg-white bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
//               <div>
//                 <div>
//                   <span>Select Your Duration</span>
//                 </div>
//                 <div className="flex mt-[27px] gap-x-2">
//                 {["60", "90", "120"].map((duration) => (
//                     <button
//                     key={duration}
//                     onClick={() => handleDurationSelectVip(duration)}
//                     className={`w-[300px] h-[40px] px-[20px] py-[10px] font-jura text-[16px] cursor-pointer 
//                       ${
//                         bookingDetails.find((detail) => detail.key === "duration").description === `${duration} Mins`
//                           ? "bg-gradient-to-r from-[#063828] to-[#002718] text-[#ccc] rounded-lg"
//                           : "bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-[#063828] rounded-[8px] border-none transition-all duration-300"
//                       }
//                     `}
//                     >
//                       <span className="font-jura font-normal md:font-bold">{duration} Mins</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="mt-6 w-[800px] p-5 bg-white bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
//               <div className="flex flex-col space-y-4 ">
//                 <h1 className="">Select Date</h1>

//                 <div className="flex justify-between w-full max-w-1280px gap-2">
//                   <button className="w-[400px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
//                    onClick={() => handleDateSelect("7 Feb")}>
//                     6 Feb
//                   </button>
//                   <button className="w-[400px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
//                    onClick={() => handleDateSelect("7 Feb")}>
//                     7 Feb
//                   </button>
//                 </div>

//                 <h1 className="mt-4">Select Time</h1>

//                 <div className="flex flex-wrap justify-between w-full max-w-1280px gap-1">
//                   {times.map((time, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleTimeSelect(time)} 
//                       className="w-[110px] my-2 h-[40px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
//                     >
//                       {time}
//                     </button>
//                   ))}
//                 </div>

                
//               </div>
              
//             </div>

//             <div className="mt-6 w-[800px] p-5 bg-white bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleInputChange}
//                     placeholder="First Name"
//                     className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
//                   />
//                   {formErrors.firstName && (
//                     <p className="text-red-500 text-sm">{formErrors.firstName}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleInputChange}
//                     placeholder="Last Name"
//                     className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
//                   />
//                   {formErrors.lastName && (
//                     <p className="text-red-500 text-sm">{formErrors.lastName}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     placeholder="Email"
//                     className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]]"
//                   />
//                   {formErrors.email && (
//                     <p className="text-red-500 text-sm">{formErrors.email}</p>
//                   )}
//                 </div>

//                 <div className="mb-4">
//                   <input
//                     type="text"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     placeholder="Phone Number"
//                     className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
//                   />
//                   {formErrors.phone && (
//                     <p className="text-red-500 text-sm">{formErrors.phone}</p>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full rounded-lg h-[50px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] font-jura text-[14px] cursor-pointer flex items-center justify-center px-[20px] py-[8px] border-opacity-30 border-[#063828] font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 hover:border-0"
//                 >
//                   Submit Booking
//                 </button>
//               </form>
//             </div>
//           </div>

//           <div className="mt-6 ml-4 w-[310px] p-5 bg-[#cccccc] bg-opacity-10 rounded-lg shadow-md text-center mb-5 transition-transform transition-shadow duration-300">
//             <h2 className="text-[30px] text-[#cccccc] font-black font-orbitron mb-[24px]">
//               Booking Details
//             </h2>
//             {bookingDetails
//               .filter((detail) => detail.key !== "booking_type" && detail.key !== "no_of_people")
//               .map((detail, index) => (
//                 <div
//                   className="border-b-[0.5px] border-opacity-[50%] border-[#063828] py-[12px]"
//                   key={detail.key}
//                 >
//                  <div className="flex justify-between"><h3 className="text-[14px] text-[#cccccc] font-bold">
//                     {detail.title}
//                   </h3>
//                   <p className="text-[14px] text-[#cccccc]">
//                   {detail.key === "price" ? getPrice() : detail.description}
//                   </p></div> 
//                 </div>
//               ))}

//             <div className="mt-6 flex">
//                 <input
//                   type="text"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                   placeholder="Enter Coupon Code"
//                   className="w-full p-2.5 border border-[#ccc] rounded-md mb-2.5 bg-white/20 text-[#ccc]"
//                 />
//                 <button
//                   onClick={handleCouponCode}
//                   className="w-[100px] h-[44px] rounded-lg bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] font-jura text-[14px] cursor-pointer flex items-center justify-center p-2 border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300 hover:border-0"
//                 >
//                   Apply
//                 </button>
               
//               </div>
//               {discountMessage && (
//                   <p className="text-[14px] mt-4 text-red-500 ">{discountMessage}</p>
//                 )}
//             <div className="max-w-3xl mx-auto mt-20">
//               {generalError && (
//                 <p className="text-red-500 text-md font-normal">
//                   {generalError}
//                 </p>
//               )}
//               {bookingErrors.length > 0 && (
//                 <ul>
//                   {bookingErrors.map((error, index) => (
//                     <li
//                       key={index}
//                       className="text-red-500 text-md font-normal "
//                     >
//                       {error}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//               <button
//                 onClick={() => handleTabChange(2)}
//                 className="w-full my-2 h-[40px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
//               >
//                 <span className="py-2">CONTINUE</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//     }
//   };

// }

// export default Page;


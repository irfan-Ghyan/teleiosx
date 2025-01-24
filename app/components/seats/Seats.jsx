import { useState } from "react";

const Seats = () => {
  const [count, setCount] = useState(1);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const increaseCount = async () => {
    const newCount = count + 1;


      setCount(newCount);


    } 
  
  const decreaseCount = async () => {

      const newCount = count - 1;
      setCount(newCount);

  };

  return (
    <div className="flex justify-between">
      <div>
        <h1>Select Your Seats</h1>
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
        <span className="px-8 py-2 text-[23px] text-[#063828] font-jura font-black">
          {count}
        </span>
        <button
          onClick={increaseCount}
          className=" bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
        >
          <span className=" font-jura text-[18px] font-bold">
            +
          </span>
        </button>
      </div>
    </div>
  );
};

export default Seats;

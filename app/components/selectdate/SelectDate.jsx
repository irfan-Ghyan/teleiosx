const SelectDate = () => {
  const times = [
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", 
    "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM", 
    "12:00 AM", "1:00 AM"
  ];

  return (
    <div className="flex flex-col space-y-4 ">
      <h1 className="">Select Date</h1>
      
      <div className="flex justify-between w-full max-w-1280px gap-2">
        <button className="w-[400px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0">6 Feb</button>
        <button className="w-[400px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[18px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0">7 Feb</button>
      </div>

      <h1 className="mt-4">Select Time</h1>

      <div className="flex flex-wrap justify-between w-full max-w-1280px gap-1">
        {times.map((time, index) => (
          <button
            key={index}
            className="w-[110px] my-2 h-[40px] bg-gradient-to-r from-[#C09E5D] via-[#FCE6A2] to-[#C09E5D] text-[#063828] text-[14px] cursor-pointer flex items-center rounded-lg justify-center px-[20px] py-[8px]  border-opacity-30 border-[#063828] ml-2 font-jura font-bold hover:text-[#e3ce90] hover:bg-gradient-to-r hover:from-[#063828] hover:to-[#002718] transition duration-300  hover:border-0"
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectDate;

import { useState } from 'react';

const PlanSelector = ({ onPlanChange }) => {
  const [selectedPlan, setSelectedPlan] = useState('bronze');

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
    let duration = 20;

    switch (plan) {
      case 'bronze':
        duration = 20;
        break;
      case 'silver':
        duration = 40;
        break;
      case 'gold':
        duration = 60;
        break;
      default:
        duration = 20;
    }

    onPlanChange(duration);
  };

  return (
    <div>
        <div><span>Select Your Duration</span></div>
      <div className="flex mt-[27px] gap-x-2">
        {['bronze', 'silver', 'gold'].map((plan) => (
          <button
            key={plan}
            onClick={() => handlePlanChange(plan)}
            className={`w-[300px] h-[30px] px-[20px] py-[10px] font-jura text-[16px] cursor-pointer 
              ${selectedPlan === plan
                ? 'bg-gradient-to-r from-[#063828] to-[#002718] text-[#ccc] font-bold rounded-lg'
                : 'bg-gradient-to-r from-[#c09e5f] to-[#fce6a2] text-[#063828] rounded-[8px] border-none transition-all duration-300'}
            `}
          >
            <span className="font-jura font-normal md:font-bold">
              {plan === 'bronze' ? '20 Mins' : plan === 'silver' ? '40 Mins' : '60 Mins'}
            </span>
          </button>
        ))}

      </div>
    </div>
  );
};

export default PlanSelector;

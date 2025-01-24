import BookNow from "../booknow/BookNow";

// components/Content.jsx
const Content = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto p-6">
        <div className="pt-[80px] ">
          <h1 className="text-2xl font-bold text-center text-[#C09E5D] mb-4">
            Experience the Thrill of TeleiosX During LEAP 2025
          </h1>
          <p className="text-[#C09E5D] leading-relaxed mb-8 tetext-[14px] ">
            Enter TeleiosX, Riyadh’s hybrid venue where racing,
            entertainment,luxury and innovation come together. For LEAP 2025
            attendees, we are opening our doors to deliver an experience that
            will leave you breathless.
          </p>

          <div className="my-2">
            <h3 className="text-xl font-bold text-[#C09E5D] mb-1">
              Race Like a Pro:{" "}
            </h3>
            <p className="text-[#C09E5D] leading-relaxed mb-4 text-[14px]">
              Step into the driver’s seat of TeleiosX simulators, designed for
              precision and realism. Feel the rush as you drive iconic tracks,
              pushing the limits of your skills and speed.
            </p>
            <h3 className="text-xl font-bold  text-[#C09E5D] mb-1">
              Racing Action:
            </h3>
            <p className="text-[#C09E5D] leading-relaxed mb-4 text-[14px]">
              {" "}
              Watch, compete, or challenge friends in exhilarating racing
              competitions broadcast on our massive screens. From seasoned
              racers to first timers,the immersive visuals and powerful sound
              effects will make every moment truly memorable.
            </p>
            <h3 className="text-xl font-bold text-[#C09E5D] mb-1">
              Relax and Refuel:
            </h3>
            <p className="text-[#C09E5D] leading-relaxed mb-4 text-[14px]">
              {" "}
              Take a break at our stylish bar, offering a menu of premium
              drinks, specialty coffee, and more. It is the perfect spot to
              unwind or network with fellow tech enthusiasts.
            </p>
            <h3 className="text-xl font-bold text-[#C09E5D] mb-1">
              VIP Treatment:
            </h3>{" "}
            <p className="text-[#C09E5D] leading-relaxed mb-4 text-[14px]">
              Looking for exclusivity? Our VIP lounge offers privacy and luxury,
              making it an ideal setting for intimate gatherings, private
              conversations or simply enjoying the experience in style.
            </p>
            <h3 className="text-xl font-bold text-[#C09E5D] mb-1">
              LEAP Specials:
            </h3>{" "}
            <p className="text-[#C09E5D] leading-relaxed mb-4 text-[14px]">
              During LEAP nights, enjoy exclusive packages, surprises, and
              extended hours to keep the excitement going long after the
              exhibition.
            </p>
            <p className="text-[#C09E5D] leading-relaxed mb-4 text-[14px]">
              Whether you are here to network, unwind, or unleash your
              competitive spirit, TeleiosX promises an unforgettable adventure
              during LEAP 2025. Don’t miss the chance to be part of this high
              tech racing revolution!
            </p>
            <h3 className="text-xl font-bold text-[#C09E5D] mb-1">Location</h3>{" "}
            <p className="text-[#C09E5D] leading-relaxed mb-4 text-[14px]">
              Anas Bin Malik Road, Al Yasmine Riyadh – just a short drive from
              the LEAP 2025 venue.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center py-6">
          <BookNow />
        </div>
      </div>
    </>
  );
};

export default Content;

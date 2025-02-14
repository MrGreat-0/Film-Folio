import React, { useState } from "react";

const ToggleSwitch = ({ switchData, setToggle }) => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = (value, secVal) => {
    // console.log("isOn:", value, "secVal:", secVal);
    if (isOn !== value) {
      setIsOn(value);
    }
    if (secVal === "Today") {
      setToggle("day");
    } else if (secVal === "Week") {
      setToggle("week");
    } else if (secVal === "Movies") {
      setToggle("movie");
    } else {
      setToggle("tv");
    }
  };

  return (
    <div className="toggle-switch h-8 w-40 md:w-48 md:h-9 lg:h-10 lg:w-56 bg-zinc-800 rounded-full relative flex justify-between items-center p-2 text-zinc-100 cursor-pointer select-none">
      <div
        style={{
          transition: "left 0.4s cubic-bezier(0.88, -0.35, 0.565, 1.35)",
        }}
        className={`toggle-bg absolute top-[2px] bg-zinc-700 h-7 w-20 md:w-24 md:h-8 lg:h-9 lg:w-28 rounded-full z-0 ${
          isOn ? "left-[77.5px] md:left-[93px] lg:left-[109px]" : "left-[2px]"
        } `}
      ></div>
      <div className="w-full h-full z-10 flex items-center justify-between">
        <span
          onClick={() => handleToggle(false, switchData.switchOne)}
          style={{
            transition: "color 0.4s cubic-bezier(0.88, -0.35, 0.565, 1.35)",
          }}
          className={`py-1 pl-2 md:pl-2 md:pr-2 lg:pl-4 lg:pr-6 lg:py-2 flex-shrink-0 capitalize whitespace-nowrap text-sm md:text-base ${
            isOn ? "text-zinc-400" : "text-zinc-100"
          }`}
        >
          {switchData.switchOne}
        </span>
        <span
          onClick={() => handleToggle(true, switchData.switchTwo)}
          style={{
            transition: "color 0.4s cubic-bezier(0.88, -0.35, 0.565, 1.35)",
          }}
          className={`py-1 pr-2 md:pr-2 md:pl-2 lg:pr-4 lg:pl-6 lg:py-2 flex-shrink-0 capitalize whitespace-nowrap text-sm md:text-base ${
            isOn ? "text-zinc-100" : "text-zinc-400"
          }`}
        >
          {switchData.switchTwo}
        </span>
      </div>
    </div>
  );
};

export default ToggleSwitch;

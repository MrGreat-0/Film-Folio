import React from "react";
import ToggleSwitch from "./ToggleSwitch";

const ContentTitle = ({
  title,
  switchData,
  setToggleTime,
  setToggleType,
  toggleSwitchCount,
}) => {
  return (
    <div className="switch-wrapper flex flex-col xs:flex-row justify-between items-center shrink-0 gap-4 xs:gap-0 pt-8 px-2">
      <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-zinc-100 whitespace-nowrap capitalize">
        {title}
      </h1>
      {toggleSwitchCount === 1 && (
        <ToggleSwitch
          switchData={switchData}
          setToggle={setToggleTime || setToggleType}
        />
      )}
      {toggleSwitchCount === 2 && (
        <div className="flex gap-4 flex-col sm:flex-row">
          <ToggleSwitch switchData={switchData[0]} setToggle={setToggleTime} />
          <ToggleSwitch switchData={switchData[1]} setToggle={setToggleType} />
        </div>
      )}
    </div>
  );
};

export default ContentTitle;

import React from "react";
import Card from "./Card";
import ToggleSwitch from "./ToggleSwitch";

const Content = ({
  title,
  switchData,
  setToggle,
  setToggleDayWeek,
  setToggleMoviesTV,
  cardData,
  toggleSwitchCount,
}) => {
  return (
    <section className="content-wrapper w-full min-h-[80vh] pt-8 px-2 relative">
      <div className="flex flex-col xs:flex-row justify-between items-center shrink-0 gap-4 xs:gap-0">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-zinc-100 whitespace-nowrap capitalize">
          {title}
        </h1>
        {toggleSwitchCount === 1 && (
          <ToggleSwitch switchData={switchData} setToggle={setToggle} />
        )}
        {toggleSwitchCount === 2 && (
          <div className="flex gap-4 flex-col sm:flex-row">
            <ToggleSwitch
              switchData={switchData[0]}
              setToggle={setToggleDayWeek}
            />
            <ToggleSwitch
              switchData={switchData[1]}
              setToggle={setToggleMoviesTV}
            />
          </div>
        )}
      </div>
      <div className="w-full h-full pt-10 md:pt-14 lg:pt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 relative">
        {cardData.map((data, ind) => (
          <Card key={ind} data={data} />
        ))}
      </div>
    </section>
  );
};

export default Content;

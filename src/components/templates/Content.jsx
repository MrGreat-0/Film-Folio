import React from "react";
import Card from "./Card";

const Content = ({ cardData, title }) => {
  // console.log(title);

  return (
    <section className="content-wrapper w-full min-h-[80vh] px-2 relative">
      <div className="card-wrapper w-full h-full pt-10 md:pt-14 lg:pt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 relative">
        {cardData.map((data, ind) => (
          <Card key={ind} data={data} title={title} />
        ))}
      </div>
    </section>
  );
};

export default Content;

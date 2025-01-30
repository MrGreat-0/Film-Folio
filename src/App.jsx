import React from "react";
import Routing from "./utils/Routing";
import Nav from "./components/templates/Header/Nav";

const App = () => {
  return (
    <main className="w-full h-full bg-[#1F1E24] text-zinc-200 relative">
      <Nav />
      <Routing />
    </main>
  );
};

export default App;

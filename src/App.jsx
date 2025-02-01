import React from "react";
import Routing from "./utils/Routing";
import Nav from "./components/templates/Header/Nav";
import Footer from "./components/templates/Footer/Footer";

const App = () => {
  return (
    <main className="w-full h-full bg-[#1F1E24] text-zinc-200 relative">
      <Nav />
      <Routing />
      <Footer />
    </main>
  );
};

export default App;

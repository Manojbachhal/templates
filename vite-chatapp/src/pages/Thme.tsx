import React from "react";
import Home from "./Home";

function Thme() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };
  return (
    <div className="bg-white h-screen dark:bg-black">
      <button
        className="bg-black text-white p-2.5 absolute right-0"
        onClick={toggleTheme}
      >
        Button
      </button>

      <div className="flex items-center text-blue-400 justify-center my-auto dark:text-white ">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
        consequuntur ut velit delectus? Quia odit voluptas temporibus rem
        corrupti deserunt.
      </div>
    </div>
  );
}

export default Thme;

import React from "react";

type Props = {};

function FullScreenLoader({}: Props) {
  return (
    <div className="h-screen w-screen bg-white flex flex-col justify-center items-center">
      <div className="flex items-center justify-center space-x-2 animate-bounce ">
        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
        <div className="w-8 h-8 bg-green-400 rounded-full"></div>
        <div className="w-8 h-8 bg-black rounded-full"></div>
      </div>
    </div>
  );
}

export default FullScreenLoader;

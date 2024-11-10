
import React from "react";

const CardLoader = () => {
    return (
        <div className="flex justify-center items-center py-10">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 bg-transparent border-4 border-gray-300 rounded-full border-t-red-600 animate-spin"></div>
            <div className="absolute inset-0 bg-transparent border-4 border-gray-600 rounded-full border-t-[#E50914] animate-spin-slow"></div>
          </div>
        </div>
      );
};

export default CardLoader;

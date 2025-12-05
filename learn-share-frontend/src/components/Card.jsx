import React from "react";

function Card({ image, title, onClick }) {
  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transform transition"
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-32 sm:h-40 object-cover"
      />
      <div className="absolute bottom-0 bg-black bg-opacity-50 w-full text-white text-center py-1.5 sm:py-2 font-semibold text-sm sm:text-base">
        {title}
      </div>
    </div>
  );
}

export default Card;

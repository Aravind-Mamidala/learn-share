import React from "react";
import { ReactTyped } from "react-typed";
import { useAuth } from "../context/AuthContext";

const Welcome = ({ userName, profileImage }) => {
  const { user } = useAuth();
  const displayName = user?.name || userName || "Guest";

  return (
    <div className="flex items-start justify-center gap-3 sm:gap-4 bg-gray-100 p-3 sm:p-4 rounded-xl shadow-md w-[95%] sm:w-[90%] mx-auto mt-4 sm:mt-5">
      <img
        src={profileImage}
        alt="Profile"
        className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-gray-300 flex-shrink-0"
      />
      <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 pt-1 sm:pt-2">
        Welcome back,{" "}
        <ReactTyped
          strings={[
            displayName,
            "Let's start learning!",
            "Explore new courses!",
          ]}
          typeSpeed={60}
          backSpeed={40}
          loop
        />
      </h1>
    </div>
  );
};

export default Welcome;

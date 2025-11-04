import React from "react";

const Logo = ({ size = 28 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="inline-block"
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#FF7A18" />
          <stop offset="100%" stopColor="#FF5C00" />
        </linearGradient>
      </defs>
      <path
        d="M12 2C12 2 8 6 8 10.5C8 13.5 10 15 10 15C10 15 9 13 11 12C13 11 13 13 13 13C15 13 17 11.5 17 9C17 5 12 2 12 2Z"
        fill="url(#g1)"
      />
      <path
        d="M7.5 12.5C7.5 12.5 6 14 6 16C6 19 8 21 12 21C16 21 18 19 18 16C18 14.5 16.8 13 16.8 13C15.2 14 14 15 12 15C10 15 7.5 12.5 7.5 12.5Z"
        fill="#FF8A3D"
        opacity="0.9"
      />
    </svg>
  );
};

export default Logo;

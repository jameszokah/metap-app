import React from "react";


function SemiFullIcon({ className }: { className?: string}) {
    return (
      <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="30"
      fill="none"
      viewBox="0 0 27 30"
    >
      <g filter="url(#filter0_d_12_149)">
        <circle cx="8.5" cy="17.5" r="4" stroke="#fff"></circle>
        <circle cx="18.5" cy="17.5" r="4" stroke="#fff"></circle>
        <rect width="18" height="7" x="4" y="1" fill="#FFFDFD" className={className} rx="2"></rect>
      </g>
      <defs>
        <filter
          id="filter0_d_12_149"
          width="32"
          height="32"
          x="-3"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          ></feColorMatrix>
          <feOffset dy="4"></feOffset>
          <feGaussianBlur stdDeviation="2"></feGaussianBlur>
          <feComposite in2="hardAlpha" operator="out"></feComposite>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_12_149"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_12_149"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default SemiFullIcon;

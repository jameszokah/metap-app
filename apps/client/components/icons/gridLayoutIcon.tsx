import React from "react";


function FullLayoutIcon({ className }: { className?: string}) {
  return (
    <svg

      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="28"
      fill="none"
      viewBox="0 0 26 28"
    >
      <g filter="url(#filter0_d_13_155)">
        <path
          fill="#fff"
          className={className}
          d="M8.3 10.35a4.05 4.05 0 110-8.101 4.05 4.05 0 010 8.101zm0 9a4.05 4.05 0 110-8.1 4.05 4.05 0 010 8.1zm9-9a4.05 4.05 0 110-8.101 4.05 4.05 0 010 8.101zm0 9a4.05 4.05 0 110-8.1 4.05 4.05 0 010 8.1z"
        ></path>
      </g>
      <defs>
        <filter
          id="filter0_d_13_155"
          width="25.1"
          height="25.1"
          x="0.25"
          y="2.25"
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
            result="effect1_dropShadow_13_155"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_13_155"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default FullLayoutIcon;

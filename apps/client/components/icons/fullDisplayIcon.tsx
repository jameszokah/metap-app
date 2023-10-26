import React from "react";

function FullDisplayIcon({ className }: { className?: string}) {
  return (
    <svg

      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"

    >
      <g filter="url(#filter0_d_12_148)">
        <rect width="24" height="24" x="4" fill="#fff" className={className} rx="5"></rect>
      </g>
      <defs>
        <filter
          id="filter0_d_12_148"
          width="32"
          height="32"
          x="0"
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
            result="effect1_dropShadow_12_148"
          ></feBlend>
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_12_148"
            result="shape"
          ></feBlend>
        </filter>
      </defs>
    </svg>
  );
}

export default FullDisplayIcon;

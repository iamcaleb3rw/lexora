import React from "react";

const LoadingLine: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 64 48"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className="size-20"
    >
      <style>
        {`
          :is(#back2087, #front2087) {
            fill: none;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
          }

          #back2087 {
            fill: none;
            stroke: purple;
            opacity: 0.1;
          }

          #front2087 {
            fill: none;
            stroke: orange;
            stroke-dasharray: 48, 144;
            stroke-dashoffset: 192;
            animation: dash_682 1s linear infinite;
          }

          @keyframes dash_682 {
            72.5% {
              opacity: 0;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
      <polyline
        points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
        id="back2087"
      />
      <polyline
        points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
        id="front2087"
      />
    </svg>
  );
};

export default LoadingLine;

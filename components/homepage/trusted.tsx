import React from "react";
import HarvardLogo from "@/public/harvard_logo-removebg-preview.png";
import CambridgeLogo from "@/public/cambridge-logo.svg";
import StanfordLogo from "@/public/stanford-logo.svg";
import URLogo from "@/public/ur-removebg-preview.png";
import Image from "next/image";

const logos = [
  {
    id: 1,
    src: HarvardLogo,
  },
  {
    id: 2,
    src: CambridgeLogo,
  },
  {
    id: 3,
    src: StanfordLogo,
  },
  {
    id: 4,
    src: URLogo,
  },
];

const Trusted = () => {
  return (
    <div className="flex items-center my-4 flex-col gap-8 px-16">
      <p className="font-medium text-muted-foreground ">
        Trusted by 1,200+ students and hirers
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {logos.map((logo) => (
          <Image
            src={logo.src}
            key={logo.id}
            alt="Trustee companies"
            className="grayscale-75 object-scale-down"
            width={120}
          />
        ))}
      </div>
    </div>
  );
};

export default Trusted;

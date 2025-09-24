import React from "react";
import NoviceSVG from "@/public/novice.svg";
import IntermediateSVG from "@/public/intermediate.svg";
import ExpertSVG from "@/public/expert.svg";
import Image from "next/image";
export const Rank = ({
  rank,
}: {
  rank: "novice" | "intermediate" | "expert";
}) => {
  let src;
  if (rank === "novice") src = NoviceSVG;
  if (rank === "intermediate") src = IntermediateSVG;
  if (rank === "expert") src = ExpertSVG;

  return <Image src={src} alt={rank} width={20} height={20} />;
};

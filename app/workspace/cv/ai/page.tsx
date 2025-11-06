"use client";
import React from "react";
import Lottie from "lottie-react";
import cvanimation from "@/public/cvanalysislottie.json";

const Analysis = () => {
  return (
    <div>
      <Lottie animationData={cvanimation} />
    </div>
  );
};

export default Analysis;

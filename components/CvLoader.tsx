"use client";
import React from "react";
import CVIllustration from "@/public/cvanalysislottie.json";
import Lottie from "lottie-react";

const CvLoader = () => {
  return <Lottie animationData={CVIllustration} />;
};

export default CvLoader;

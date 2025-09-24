"use client";
import React, { useState, useEffect } from "react";

interface ScrollProgressProps {
  contentId: string; // id of the element to track scroll
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ contentId }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById(contentId);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress: how much of content is scrolled
      const totalHeight = el.scrollHeight - windowHeight;
      const scrolled = window.scrollY - el.offsetTop + windowHeight;
      const progressPercent = Math.min(
        Math.max((scrolled / el.scrollHeight) * 100, 0),
        100
      );

      setProgress(progressPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [contentId]);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-gray-200 z-[99999]">
      <div
        className="h-[2px] bg-orange-500"
        style={{ width: `${progress}%`, transition: "width 0.2s" }}
      />
    </div>
  );
};

export default ScrollProgress;

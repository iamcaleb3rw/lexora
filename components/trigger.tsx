"use client";
import React from "react";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";

const Trigger = () => {
  const { state } = useSidebar();
  return (
    <div className="absolute top-4 left-4">
      {state === "collapsed" && <SidebarTrigger />}
    </div>
  );
};

export default Trigger;

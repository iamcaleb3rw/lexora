import { EmptyDemo } from "@/components/EmptyCV";
import { SidebarTrigger } from "@/components/TriggerButton";
import React from "react";

const CV = () => {
  return (
    <div className="px-6">
      <SidebarTrigger />
      <EmptyDemo />
    </div>
  );
};

export default CV;

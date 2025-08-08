"use client";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import React from "react";

const Workspace = () => {
  const { state } = useSidebar();
  return (
    <div>
      <div className="flex items-center p-2 gap-2">
        {state === "collapsed" && <SidebarTrigger />}
        <p>My workspace</p>
      </div>
    </div>
  );
};

export default Workspace;

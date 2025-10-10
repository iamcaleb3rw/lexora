"use client";

import LearningPath from "@/components/learning-path";
import LessonButton from "@/components/LessonButton";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import React from "react";

const Workspace = () => {
  const { state } = useSidebar();
  return (
    <div>
      <div className="flex border-2 justify-center items-center p-2 gap-2">
        <div className="fixed top-2 left-2 z-[999]">
          {state === "collapsed" && <SidebarTrigger />}
        </div>
        <LearningPath />
      </div>
    </div>
  );
};

export default Workspace;

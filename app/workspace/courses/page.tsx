import { SidebarTrigger } from "@/components/TriggerButton";
import React from "react";

const Courses = () => {
  return (
    <div className="relative">
      <SidebarTrigger />
      <aside className="fixed top-12 w-40 z-20 bg-amber-400 left-52 h-screen border-r">
        Yooo
      </aside>
      <main className="ml-48">
        {Array.from({ length: 50 }).map((_, idx) => (
          <div key={idx} className="p-4 border bg-gray-100 mb-2">
            Scrollable content {idx + 1}
          </div>
        ))}
      </main>
    </div>
  );
};

export default Courses;

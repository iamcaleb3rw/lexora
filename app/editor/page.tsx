import { AppSidebar } from "@/components/app-sidebar-company";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const Editor = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="h-screen w-[15rem] border p-3 space-y-4">
        {/* Shimmering logo placeholder */}
        <div className="h-5 w-32 rounded bg-gray-300 animate-pulse"></div>

        {/* Menu items placeholders */}
        <div className="space-y-3 mt-4">
          <div className="h-5 w-full rounded-sm bg-gray-300 animate-pulse"></div>
          <div className="h-5 w-full rounded-sm bg-gray-300 animate-pulse"></div>
          <div className="h-5 w-full rounded-sm bg-gray-300 animate-pulse"></div>
          <div className="h-5 w-full rounded-sm bg-gray-300 animate-pulse"></div>
          <div className="h-5 w-full rounded-sm bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Editor;

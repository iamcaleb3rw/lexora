"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronsLeft, PanelRight } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
// adjust the path

interface SidebarTriggerProps extends React.ComponentProps<typeof Button> {}

export const SidebarTrigger: React.FC<SidebarTriggerProps> = ({
  className,
  ...props
}) => {
  const { isMobile, state, openMobile, toggleSidebar } = useSidebar();

  // Determine if the button should be visible
  const shouldShow = isMobile || state === "collapsed";

  // Always call hooks, conditional logic only affects rendering
  if (!shouldShow) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className ?? "fixed top-2  bg-white left-2 z-[99999]"}
      onClick={toggleSidebar}
      {...props}
    >
      {isMobile ? (
        openMobile ? (
          <ChevronsLeft />
        ) : (
          <PanelRight />
        )
      ) : (
        <PanelRight />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

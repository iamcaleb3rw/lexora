"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ChevronsLeft } from "lucide-react";
import { Separator } from "./ui/separator";
import CatergoryFilter from "./CatergoryFilter";
import { CategoriesInfo } from "@/app/actions/getCategories";

const CourseSidebar = ({ categories }: { categories: CategoriesInfo }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = (newState: boolean) => {
    console.log("[Sidebar] Collapsed state changing to:", newState);
    setCollapsed(newState);
  };
  return (
    <aside
      style={{
        width: collapsed ? "0px" : "260px",
        borderRightWidth: collapsed ? "0px" : "1px",
        transition: "width 300ms ease-out, border-width 300ms ease-out",
      }}
      className="bg-white border-r border-gray-200 sticky top-[3rem] h-[calc(100vh-3rem)] flex flex-col overflow-hidden"
    >
      <div
        style={{
          opacity: collapsed ? 0 : 1,
          transition: "opacity 300ms ease-out",
        }}
        className={`flex flex-col p-4 ${collapsed ? "pointer-events-none" : ""}`}
      >
        <Button
          variant="outline"
          className="w-full text-base text-muted-foreground flex items-center justify-between font-medium rounded-md bg-transparent"
          onClick={() => handleToggle(true)}
        >
          Hide Filters
          <ChevronsLeft className="size-4" />
        </Button>

        <Separator className="mb-4" />

        <CatergoryFilter categories={categories} />
      </div>
    </aside>
  );
};

export default CourseSidebar;

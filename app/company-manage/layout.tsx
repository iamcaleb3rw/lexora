import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { ThreeDButton } from "@/components/ThreeDButton";
import { AppSidebar } from "@/components/app-sidebar-company";
import Link from "next/link";
import { CompanyContext } from "@/context";
import Trigger from "@/components/trigger";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full">
        <div className="relative">
          <Trigger />
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}

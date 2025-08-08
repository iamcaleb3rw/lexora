import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { ThreeDButton } from "@/components/ThreeDButton";
import { AppSidebar } from "@/components/app-sidebar-company";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="border-b py-2 bg-white flex justify-end px-4  sticky top-0">
          <ThreeDButton text="Create a course" className="h-8 self-end" />
        </div>

        <div className="">{children}</div>
      </main>
    </SidebarProvider>
  );
}

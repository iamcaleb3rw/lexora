import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { ThreeDButton } from "@/components/ThreeDButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  const username = session.user.name;
  const email = session.user.email;
  return (
    <SidebarProvider>
      <AppSidebar username={username} email={email} />
      <main className="w-full">
        <div className="border-b z-40  py-2 bg-transparent flex justify-end px-4  sticky top-0">
          <ThreeDButton text="New case" className="h-8 self-end" />
        </div>

        <div className="">{children}</div>
      </main>
    </SidebarProvider>
  );
}

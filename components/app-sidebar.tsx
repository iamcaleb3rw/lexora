"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import {
  Bookmark,
  ChevronDown,
  FolderOpen,
  Home,
  Layers,
  LayoutList,
  LogOut,
  ScrollText,
  Search,
  Settings,
  Sun,
} from "lucide-react";
import { Progress } from "./ui/progress";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import SpotlightSearch from "./Spotlight";
import Link from "next/link";

type AppSidebarProps = {
  username: string;
  email: string;
};

export function AppSidebar({ username, email }: AppSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const logOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/workspace" },
    { icon: Search, label: "Search", isSearch: true },
    { icon: FolderOpen, label: "Courses", path: "/workspace/courses" },
    { icon: Bookmark, label: "Bookmarks", path: "/workspace/bookmarks" },
  ];

  const jobItems = [
    { icon: LayoutList, label: "Job Board", path: "/workspace/jobs" },
    { icon: Layers, label: "My Applications", path: "/workspace/applications" },
    { icon: ScrollText, label: "Resumé", path: "/workspace/cv" },
  ];

  const isActive = (path: string | undefined) => {
    if (!path) return false;

    if (path === "/workspace") {
      return pathname === "/workspace";
    }

    // For other routes, match exact or nested paths
    return pathname === path || pathname?.startsWith(`${path}/`);
  };
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="w-full flex-1 flex items-center justify-between font-semibold text-sm px-2 py-1 h-fit"
              variant="ghost"
            >
              {username}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-(--radix-dropdown-menu-trigger-width)">
            <DropdownMenuGroup className="px-2 font-medium text-sm">
              <p>{username}</p>
              <p className="text-muted-foreground">{email}</p>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="font-medium">
              <DropdownMenuItem>
                <Settings className="size-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Sun className="size-4" />
                Themes
                <span className="bg-muted rounded-sm text-orange-400 text-xs p-1">
                  COMING SOON
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logOut}>
                <LogOut className="size-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <SidebarTrigger className="h-8 w-8" />
      </SidebarHeader>

      <SidebarContent>
        {/* Learning Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-medium text-xs p-0 m-0 text-orange-500">
            Learning
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item, i) => (
                <SidebarMenuItem key={i}>
                  {item.isSearch ? (
                    <div className="flex items-center gap-2 px-2 py-1 rounded-sm text-sm font-medium">
                      <item.icon className="size-4" />
                      <SpotlightSearch />
                    </div>
                  ) : (
                    <Link
                      href={item.path!}
                      className={`flex items-center gap-2 px-2 py-1 rounded-sm text-sm font-medium hover:bg-muted
                        ${
                          isActive(item.path)
                            ? "bg-muted text-orange-500"
                            : "text-foreground"
                        }`}
                    >
                      <item.icon
                        className={`size-4 ${
                          isActive(item.path) ? "stroke-orange-500" : ""
                        }`}
                      />
                      {item.label}
                    </Link>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Job Seeking Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-medium text-xs p-0 m-0 text-orange-500">
            Job Seeking
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {jobItems.map((item, i) => (
                <SidebarMenuItem key={i}>
                  <Link
                    href={item.path!}
                    className={`flex items-center gap-2 px-2 py-1 rounded-sm text-sm font-medium hover:bg-muted
        ${
          isActive(item.path) ? "bg-muted text-orange-500" : "text-foreground"
        }`}
                  >
                    <item.icon
                      className={`size-4 ${
                        isActive(item.path) ? "stroke-orange-500" : ""
                      }`}
                    />
                    {item.label}
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="border p-2 shadow-xs rounded-xl">
          <h1 className="font-medium tracking-tight">Credits usage</h1>
          <p className="text-sm font-medium text-muted-foreground">
            2 out of 5 free case files
          </p>
          <Progress value={40} />
          <Button className="text-sm w-full mt-2" size={"sm"}>
            Upgrade for more files
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

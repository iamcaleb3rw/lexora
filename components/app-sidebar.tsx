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
  Archive,
  Bookmark,
  ChevronDown,
  FolderOpen,
  Home,
  Layers,
  LayoutList,
  LogOut,
  NotebookText,
  Paperclip,
  ScrollText,
  Search,
  Settings,
  Sun,
} from "lucide-react";
import { Progress } from "./ui/progress";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SpotlightSearch from "./Spotlight";
type AppSidebarProps = {
  username: string;
  email: string;
};
export function AppSidebar({ username, email }: AppSidebarProps) {
  const router = useRouter();

  const logOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
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
        <SidebarGroup>
          <SidebarGroupLabel className="font-medium text-xs p-0 m-0 text-orange-500">
            Learning
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-muted text-sm font-medium">
                <Home className="size-4" />
                Home
              </SidebarMenuItem>
              <SidebarMenuItem className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-muted text-sm font-medium">
                <Search className="size-4" />
                <SpotlightSearch />
              </SidebarMenuItem>
              <SidebarMenuItem className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-muted text-sm font-medium">
                <FolderOpen className="size-4" />
                Courses
              </SidebarMenuItem>

              <SidebarMenuItem className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-muted text-sm font-medium">
                <Bookmark className="size-4" />
                Bookmarks
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="font-medium text-xs p-0 m-0 text-orange-500">
            Job Seeking
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-muted text-sm font-medium">
              <LayoutList className="size-4" />
              Job Board
            </SidebarMenuItem>
            <SidebarMenuItem className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-muted text-sm font-medium">
              <Layers className="size-4" />
              My Applications
            </SidebarMenuItem>
            <SidebarMenuItem className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-muted text-sm font-medium">
              <ScrollText className="size-4" />
              Resumé
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
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
        <div></div>
      </SidebarFooter>
    </Sidebar>
  );
}

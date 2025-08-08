import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
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
  ChevronDown,
  FolderOpen,
  Home,
  LogOut,
  NotebookText,
  Search,
  Settings,
  Sun,
} from "lucide-react";
import { Progress } from "./ui/progress";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="w-full flex-1 flex items-center justify-between font-semibold text-sm px-2 py-1 h-fit"
              variant="ghost"
            >
              Caleb Ishimwe
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="min-w-(--radix-dropdown-menu-trigger-width)">
            <DropdownMenuGroup className="px-2 font-medium text-sm">
              <p>Caleb Ishimwe</p>
              <p className="text-muted-foreground">icaleb130@gmail.com</p>
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
              <DropdownMenuItem>
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
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-muted text-sm font-medium">
              <Home className="size-4" />
              Home
            </SidebarMenuItem>
            <SidebarMenuItem className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-muted text-sm font-medium">
              <FolderOpen className="size-4" />
              Courses
            </SidebarMenuItem>
            <SidebarMenuItem className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-muted text-sm font-medium">
              <NotebookText className="size-4" />
              Talents
            </SidebarMenuItem>
            <SidebarMenuItem className="flex items-center gap-2 px-2 py-1 rounded-sm hover:bg-muted text-sm font-medium">
              <Search className="size-4" />
              Search
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

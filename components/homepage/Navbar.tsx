"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Spinner from "@/components/spinner";
import Logo from "../logo";
import UserMenu from "../user-menu";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/companies", label: "For companies" },
  { href: "/team", label: "Team" },
  { href: "/changelog", label: "Changelog" },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const userImage = session?.user.image;
  const userEmail = session?.user.email;
  const userName = session?.user.name;

  const [isActive, setIsActive] = useState<number | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    router.push("/workspace");
  };

  // Right-side actions: loading, signed-in, signed-out
  const RightActions = () => {
    if (isPending) {
      return (
        <div className="flex gap-2 items-center">
          <Skeleton className="h-9 bg-muted-foreground/30 w-28 rounded-md" />{" "}
          {/* Button placeholder */}
          <Skeleton className="h-9 w-9 bg-muted-foreground/30 rounded-full" />{" "}
          {/* Avatar placeholder */}
        </div>
      );
    }

    if (session) {
      return (
        <div className="flex gap-2 items-center">
          <Link href="/workspace">
            <Button
              className="
                bg-zinc-100
                text-zinc-900
                text-sm
                border
                hover:bg-zinc-200
                border-zinc-300
                rounded-md
                shadow-[0_4px_0_0_#d4d4d4]
                active:translate-y-[2px]
                active:shadow-[0_1px_0_0_#d4d4d4]
                transition-transform
                duration-200
              "
              onClick={handleClick}
            >
              {isClicked && <Spinner />}
              My Workspace
            </Button>
          </Link>
          <UserMenu
            userImage={userImage}
            userEmail={userEmail}
            userName={userName}
          />
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm" className="text-sm">
          <Link href="/login">Sign In</Link>
        </Button>
        <Button asChild size="sm" className="text-sm">
          <Link href="/login">Get Started</Link>
        </Button>
      </div>
    );
  };

  return (
    <header className="border-b px-4 md:px-16">
      <div className="flex h-13 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem
                      key={index}
                      className={cn(
                        `py-1.5`,
                        isActive === index && "bg-purple-400"
                      )}
                      onClick={() => setIsActive(index)}
                    >
                      <Link href={link.href} className="py-1.5">
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="#" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
          </div>
        </div>

        {/* Desktop navigation menu */}
        <NavigationMenu className="max-md:hidden">
          <NavigationMenuList className="gap-2">
            {navigationLinks.map((link, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  href={link.href}
                  className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                >
                  {link.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right-side actions */}
        <RightActions />
      </div>
    </header>
  );
}

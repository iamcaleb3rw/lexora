"use client";

import StatisticCard13 from "@/components/statistic-card-13";
import StatisticCard3 from "@/components/statistic-card-3";
import { SidebarTrigger } from "@/components/TriggerButton";

import { useSidebar } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

import { CourseCarouselSkeleton } from "@/components/course-carousel-skeleton";
import CourseCarousel from "@/components/course-carousel";

export const WorkspaceClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session, isPending } = authClient.useSession();
  const { state, isMobile, openMobile, setOpenMobile, toggleSidebar } =
    useSidebar();
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.push("/login");
    }
  }, [session, router, isPending]);
  console.log(state);

  return (
    <div className="p-2">
      <SidebarTrigger />
      <div>
        <div className="md:mx-14 my-2 flex gap-1 items-center text-lg font-medium">
          Welcome,{" "}
          {session ? (
            <span>{session?.user.name}</span>
          ) : (
            <div className="h-5 w-40 animate-pulse bg-muted-foreground/10 rounded-full" />
          )}
        </div>
      </div>
      <div>
        <p className="md:mx-14 text-base font-medium">
          You&apos;re almost there
        </p>
        <p className="md:mx-14 font-medium text-muted-foreground text-sm">
          Keep the momentum going and complete your remaining courses
        </p>
        <hr className="md:mx-14 max-w-4xl mb-4" />
        <div className="md:ml-12">
          <Suspense fallback={<CourseCarouselSkeleton />}>{children}</Suspense>
        </div>
        <hr className="my-2" />
        <div>
          <div>
            <p className="md:mx-14 mt-4 text-base font-medium">Job profile</p>
            <p className="md:mx-14 font-medium text-muted-foreground text-sm">
              Job profile & Employability metrics
            </p>
          </div>
          <hr className="md:mx-14 max-w-4xl mb-4" />
          <div className="grid md:mx-12 gap-3 grid-cols-8">
            <StatisticCard13 />
            <StatisticCard3 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceClient;

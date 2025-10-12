"use client";
import StatisticCard13 from "@/components/statistic-card-13";
import StatisticCard3 from "@/components/statistic-card-3";
import { CourseCarousel } from "@/components/ui/course-carousel";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

const Workspace = () => {
  const { data: session } = authClient.useSession();
  const { state } = useSidebar();
  const router = useRouter();
  if (!session) {
    router.push("/login");
  }
  return (
    <div className="">
      {state === "collapsed" && (
        <SidebarTrigger className="fixed top-2 left-2 z-[99999]" />
      )}
      <div>
        <p className="md:mx-14 my-2 text-lg font-medium">
          Welcome, {session?.user.name}
        </p>
      </div>
      <div>
        <p className="md:mx-14 text-base font-medium">
          You&apos;re almost there
        </p>
        <p className="md:mx-14 font-medium text-muted-foreground text-sm">
          Keep the momentum going and complete your remaining courses
        </p>
        <hr className="md:mx-14 max-w-4xl" />
        <div className="lg:ml-12">
          <CourseCarousel />
        </div>
        <hr className="my-2" />
        <div>
          <div>
            <p className="md:mx-14 text-base font-medium">
              Job profile & Employability metrics
            </p>
            <p className="md:mx-14 font-medium text-muted-foreground text-sm">
              Job profile & Employability metrics
            </p>
          </div>
          <div className="grid md:mx-12 gap-3 grid-cols-8">
            <StatisticCard13 />
            <StatisticCard3 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;

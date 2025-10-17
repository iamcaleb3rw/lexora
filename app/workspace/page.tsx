"use client";
import StatisticCard13 from "@/components/statistic-card-13";
import StatisticCard3 from "@/components/statistic-card-3";
import { CourseCarousel } from "@/components/ui/course-carousel";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Workspace = () => {
  const { data: session, isPending } = authClient.useSession();
  const { state } = useSidebar();
  const router = useRouter();
  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.push("/login");
    }
  }, [session, router, isPending]);
  console.log(state);

  return (
    <div className="">
      {state === "collapsed" && (
        <SidebarTrigger className="fixed top-2 left-1 md:left-2 z-40" />
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
        <hr className="md:mx-14 max-w-4xl mb-4" />
        <div className="md:ml-12">
          <CourseCarousel />
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

export default Workspace;

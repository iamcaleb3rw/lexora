"use client";
import { CourseCarousel } from "@/components/ui/course-carousel";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

const Workspace = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  if (!session) {
    router.push("/login");
  }
  return (
    <div className="">
      <div>
        <p className="md:mx-14 text-lg font-medium">
          Welcome, {session?.user.name}
        </p>
      </div>
      <div className="lg:ml-12">
        <CourseCarousel />
      </div>
    </div>
  );
};

export default Workspace;

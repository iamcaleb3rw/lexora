import { Casestudies2 } from "@/components/casestudies2";
import { ThreeDButton } from "@/components/ThreeDButton";
import Link from "next/link";
import React from "react";

const Companies = () => {
  return (
    <div className="">
      <div className="min-h-[500px] border gap-3 flex flex-col items-center justify-center">
        <div className="max-w-[640px] text-center">
          <h1 className="text-5xl font-medium">
            Train Job-Ready Talent Before You Hire
          </h1>
          <p className="tracking-tight text-muted-foreground font-medium">
            Create hands-on courses tailored to your company&apos;s needs. Build
            a talent pipeline filled with learners already trained in your
            tools, workflows, and expectations.
          </p>
        </div>
        <Link href="/create-company" className="cursor-pointer">
          <ThreeDButton text="Train talent now   →" />
        </Link>
      </div>
      <Casestudies2 />
    </div>
  );
};

export default Companies;

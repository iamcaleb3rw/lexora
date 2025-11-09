import { getResumes } from "@/app/actions/get-resumes";
import { EmptyDemo } from "@/components/EmptyCV";
import ResumeCards from "@/components/ResumeCards";
import { SidebarTrigger } from "@/components/TriggerButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Activity } from "react";

const CV = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/login");
  }
  const userId = session.user.id;
  const resumes = await getResumes(userId);
  return (
    <div className="px-6">
      <SidebarTrigger />
      {resumes ? <ResumeCards resumes={resumes} /> : <EmptyDemo />}
    </div>
  );
};

export default CV;

import CourseForm from "@/components/CourseCreateForm";
import React from "react";

const CourseCreationPage = async ({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const companyId = (await params).companyId;
  await delay(5000);
  const cleanId = Number(companyId);
  return (
    <div className="">
      <CourseForm companyId={cleanId} />
    </div>
  );
};

export default CourseCreationPage;

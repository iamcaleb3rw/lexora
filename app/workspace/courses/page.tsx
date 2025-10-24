import { getCoursesInfo } from "@/app/actions/get-courses-metadata";

import CoursesClient from "@/components/CoursesClient";
import React from "react";

const Courses = async () => {
  const courses = await getCoursesInfo();
  return <CoursesClient courses={courses} />;
};

export default Courses;

import { getCoursesInfo } from "@/app/actions/get-courses-metadata";

import type { SearchParams } from "nuqs/server";

import CoursesClient from "@/components/CoursesClient";
import React from "react";
import { loadSearchParams } from "./searchParams";
type PageProps = {
  searchParams: Promise<SearchParams>;
};

const Courses = async ({ searchParams }: PageProps) => {
  const { search, category } = await loadSearchParams(searchParams);
  const courses = await getCoursesInfo();
  return <CoursesClient courses={courses} />;
};

export default Courses;

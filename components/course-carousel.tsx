import { getCourses } from "@/app/actions/getCourses";
import CarouselClient from "./CarouselClient";

const CourseCarousel = async () => {
  const courses = await getCourses();
  return <CarouselClient courses={courses} />;
};

export default CourseCarousel;

import { useQuery } from "@tanstack/react-query";
import { getCourses } from "services/apiCourses";

export function useCourses() {
  const {
    data: courses,
    isLoading: loadingCourses,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  return { courses, loadingCourses, error };
}

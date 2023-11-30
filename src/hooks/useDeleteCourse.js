import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCourse } from "services/apiCourses";

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteCourseAPI,
    isLoading,
    error,
  } = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });
      toast.success("Course deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
      s;
    },
  });

  return { deleteCourseAPI, isLoading, error };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCourse } from "services/apiCourses";

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  const {
    mutate: updatingCourse,
    isLoading,
    error,
  } = useMutation({
    mutationFn: updateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });

      toast.success("Course updated successfully");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return { updatingCourse, isLoading, error };
}

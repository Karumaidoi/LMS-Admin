import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCourse } from "services/apiCourses";

export function useCreateCourse() {
  const queryClient = useQueryClient();

  const { mutate: createCourseApi, isLoading } = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });

      toast.success("Course created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createCourseApi, isLoading };
}

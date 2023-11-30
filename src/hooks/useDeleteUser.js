import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteUser } from "services/apiUsers";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteUserAPI,
    isLoading,
    error,
  } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteUserAPI, isLoading, error };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { logOut } from "services/apiUsers";

export function useLogOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: logOutUser,
    isLoading,
    error,
  } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("User logged out successfully");
      navigate("/authentication/sign-up");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { logOutUser, isLoading };
}

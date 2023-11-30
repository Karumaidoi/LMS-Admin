import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { logIn } from "services/apiUsers";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: isLoginIn,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => logIn({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);

      toast.success("Log in successfull");
      navigate("/dashbaord");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return { isLoginIn, isLoading, error };
}

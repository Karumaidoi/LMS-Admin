import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { registerUser } from "services/apiUsers";

export function useSignUp() {
  const navigate = useNavigate();
  const {
    mutate: isSigningUp,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: () => {
      toast.success("User created successfull");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isSigningUp, isLoading, error };
}

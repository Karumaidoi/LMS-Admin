import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "services/apiUsers";

export function useCurrentUser() {
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryFn: getCurrentUser,
  });

  console.log(currentUser);

  return {
    currentUser,
    isLoading,
    error,
    isAuthenticated: currentUser?.user?.role === "authenticated",
  };
}

import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "services/apiUsers";

export function useUsers() {
  const {
    data: users,
    isLoading: isLoadingUsers,
    error,
  } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
  });

  return { users, isLoadingUsers, error };
}

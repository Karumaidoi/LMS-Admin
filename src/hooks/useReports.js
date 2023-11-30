import { useQuery } from "@tanstack/react-query";
import { getReports } from "services/apiReports";

export function useReports() {
  const {
    data: reports,
    isLoading: loadingReports,
    error,
  } = useQuery({
    queryFn: getReports,
    queryKey: ["reports"],
  });

  return { reports, loadingReports, error };
}

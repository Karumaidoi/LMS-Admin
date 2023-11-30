import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createReport } from "services/apiReports";

export function useCreateReport() {
  const queryClient = useQueryClient();
  const {
    mutate: createReportAPI,
    isLoading,
    error,
  } = useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
      toast.success("Report created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createReportAPI, isLoading, error };
}

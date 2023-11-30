import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteReport } from "services/apiReports";

export function useDeleteReport() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteReportAPI,
    isLoading: isDeletingReport,
    error,
  } = useMutation({
    mutationFn: deleteReport,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
      toast.success("Report deleted successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteReportAPI, isDeletingReport, error };
}

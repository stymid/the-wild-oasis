import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deletCabinAPI } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: deleteCabin, isPending: isDeleting } = useMutation({
    mutationFn: deletCabinAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
  });
  return { deleteCabin, isDeleting };
}

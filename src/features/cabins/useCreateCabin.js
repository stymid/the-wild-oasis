import { useQueryClient, useMutation } from "@tanstack/react-query";
import createEditCabin from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationKey: ["createCabin"],
    mutationFn: createEditCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (e) => {
      console.log(e);
    },
  });

  return { isCreating, createCabin };
}

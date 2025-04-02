import { useMutation, useQueryClient } from "@tanstack/react-query";
import createEditCabin from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationKey: ["editCabin"],
    mutationFn: ({ newCabinData, editId }) =>
      createEditCabin(newCabinData, editId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return { isEditing, editCabin };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSetting as updateSettingAPI } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isPending, mutate: updateSetting } = useMutation({
    mutationKey: ["editCabin"],
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["setting"] });
    },
    onError: (e) => {
      console.log(e);
    },
  });
  return { isPending, updateSetting };
}

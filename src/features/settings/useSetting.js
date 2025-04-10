import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export default function useSetting() {
  const {
    data: setting,
    error,
    isPending: isLoadingSetting,
  } = useQuery({
    queryKey: ["setting"],
    queryFn: getSettings,
  });
  return { setting, isLoadingSetting, error };
}

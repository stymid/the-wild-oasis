import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useGetCabins() {
  const { isPending: isGetCabins, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { isGetCabins, cabins };
}

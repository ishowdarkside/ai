import { useQuery } from "@tanstack/react-query";
import { getSavedImages } from "../services/images";
export function useGetSavedImages() {
  const { data, isLoading } = useQuery({
    queryKey: ["savedImages"],
    queryFn: getSavedImages,
  });

  return { data, isLoading };
}

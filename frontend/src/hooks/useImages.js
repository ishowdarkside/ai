import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSavedImages, saveImage } from "../services/images";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function useGetSavedImages() {
  const { data, isLoading } = useQuery({
    queryKey: ["savedImages"],
    queryFn: getSavedImages,
  });

  return { data, isLoading };
}

export function useSaveImages() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => saveImage(data),
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success(res.message);
        queryClient.fetchQuery({
          queryKey: ["savedImages"],
          queryFn: getSavedImages,
        });

        queryClient.invalidateQueries(["savedImages"]);
        setTimeout(() => {
          navigate("/myImages");
        }, 1000);
      }
    },
  });

  return { mutate, isLoading };
}

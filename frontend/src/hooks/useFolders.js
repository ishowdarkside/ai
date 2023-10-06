import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFolder,
  deleteFolder,
  getAllFolders,
  updateFolder,
} from "../services/folders";
import { toast } from "react-hot-toast";
export function useGetFolders() {
  const {
    isLoading,
    data: folders,
    error,
  } = useQuery({
    queryKey: ["folders"],
    queryFn: getAllFolders,
  });

  return { isLoading, folders, error };
}

export function useCreateFolder() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (formData) => createFolder(formData),
    onSuccess: (res) => {
      if (res.status === "success")
        return queryClient.invalidateQueries(["folders"]);
      if (res.status !== "success") return toast.error(res.message);
    },
    onError: (err) => {
      toast.error(err.message || "Something went really wrong");
    },
  });

  return { mutate, isLoading };
}

export function useDeleteFolder() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id) => deleteFolder(id),
    onSuccess: () => queryClient.invalidateQueries(["folders"]),
    onError: (err) => {
      toast.error(err.message || "Something went really wrong");
    },
  });

  return { mutate, isLoading };
}

export function useUpdateFolder() {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ id, formData }) => updateFolder(id, formData),
    onSuccess: () => queryClient.invalidateQueries(["folders"]),
    onError: (err) => {
      toast.error(err.message || "Something went really wrong");
    },
  });

  return { mutate, isLoading };
}

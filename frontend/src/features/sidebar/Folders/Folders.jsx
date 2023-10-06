import { useState } from "react";
import FolderCard from "../FolderCard/FolderCard";
import { useDeleteFolder, useGetFolders } from "../../../hooks/useFolders";
import Spinner from "../../../utilities/Spinner/Spinner";
import styles from "./Folders.module.scss";

export default function Folders() {
  const { isLoading, folders } = useGetFolders();
  const { mutate, isLoading: loading } = useDeleteFolder();

  async function handleFolderDelete(folderId) {
    mutate({ id: folderId }, {
      onSuccess: res => {
        if(res.status === 'success') console.log(`Folder with id: ${folderId} is deleted`)
      }
    })
  }

  if (isLoading || loading) return <Spinner />;
  return (
    <div className={styles.foldersWrapper}>
      {folders.map((data, i) => (
        <FolderCard data={data} handleFolderDelete={handleFolderDelete} key={i} />
      ))}
    </div>
  );
}

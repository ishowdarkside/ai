import FolderCard from "../FolderCard/FolderCard";
import { useDeleteFolder, useGetFolders } from "../../../hooks/useFolders";
import Spinner from "../../../utilities/Spinner/Spinner";
import styles from "./Folders.module.scss";

export default function Folders() {
  const { isLoading, folders } = useGetFolders();
  const { isLoading: loading } = useDeleteFolder();

  if (isLoading || loading) return <Spinner />;
  return (
    <div className={styles.foldersWrapper}>
      {folders.map((data, i) => (
        <FolderCard data={data} key={i} />
      ))}
    </div>
  );
}

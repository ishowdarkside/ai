import styles from "./Folders.module.scss";
import FolderCard from "../FolderCard/FolderCard";
import { useGetFolders } from "../../../hooks/useFolders";

export default function Folders() {
  const { isLoading, folders } = useGetFolders();
  if (isLoading) return <h1>...LOADING...</h1>;
  return (
    <div className={styles.foldersWrapper}>
      {folders.map((data, i) => (
        <FolderCard data={data} key={i} />
      ))}
    </div>
  );
}

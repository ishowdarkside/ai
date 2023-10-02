import styles from "./Folders.module.scss";
import FolderCard from "../FolderCard/FolderCard";
import { useGetFolders } from "../../../hooks/useFolders";
import Spinner from "../../../utilities/Spinner/Spinner";

export default function Folders() {
  const { isLoading, folders } = useGetFolders();
  if (isLoading) return <Spinner />;
  return (
    <div className={styles.foldersWrapper}>
      {folders.map((data, i) => (
        <FolderCard data={data} key={i} />
      ))}
    </div>
  );
}

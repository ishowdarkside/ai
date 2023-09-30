import styles from "./Folders.module.scss";
import FolderCard from "../FolderCard/FolderCard";

export default function Folders({ setIsOpenFolder, testdata }) {
  return (
    <div className={styles.foldersWrapper}>
      {testdata.map((data, i) => (
        <FolderCard data={data} key={i} setIsOpenFolder={setIsOpenFolder} />
      ))}
    </div>
  );
}

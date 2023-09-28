import styles from "./Folders.module.scss";
import testdata from "../../../utilities/testdata.json";
import FolderCard from "../FolderCard/FolderCard";

export default function Folders() {
  return (
    <div className={styles.foldersWrapper}>
      {testdata.map((data, i) => (
        <FolderCard data={data} key={i} />
      ))}
    </div>
  );
}

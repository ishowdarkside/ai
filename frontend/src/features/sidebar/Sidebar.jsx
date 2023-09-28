import AddFolder from "./AddFolder/AddFolder";
import Folders from "./Folders/Folders";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <AddFolder />
      <Folders />
    </aside>
  );
}

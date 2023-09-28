import { BsFillPlusSquareFill } from "react-icons/bs";
import styles from "./AddFolder.module.scss";
export default function AddFolder() {
  return (
    <button className={styles.addFolder}>
      <BsFillPlusSquareFill />
      <span>Add folder</span>
    </button>
  );
}

/* eslint-disable react/prop-types */
import { BsFillPlusSquareFill } from "react-icons/bs";
import styles from "./AddFolder.module.scss";
export default function AddFolder({ onOpenPanel }) {
  return (
    <button className={styles.addFolder} onClick={() => onOpenPanel(true)}>
      <BsFillPlusSquareFill />
      <span>Add folder</span>
    </button>
  );
}

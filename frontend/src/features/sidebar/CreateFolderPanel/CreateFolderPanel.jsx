/* eslint-disable react/prop-types */
import styles from "./CreateFolderPanel.module.scss";
import { FaTimes } from "react-icons/fa";
export default function CreateFolderPanel({ onClosePanel }) {
  return (
    <div className={styles.createFolderPanel}>
      <button className={styles.closePanel} onClick={() => onClosePanel(false)}>
        <FaTimes />
      </button>

      <form className={styles.creationPanel}>
        <label htmlFor="folderName">Folder name</label>
        <input type="text" id="folderName" name="folderName" placeholder="Enter folder name..." />
        <input
          type="file"
          name="images"
          id="images"
          multiple
          className={styles.hideInput}
        />

        <button>Create</button>
      </form>
    </div>
  );
}

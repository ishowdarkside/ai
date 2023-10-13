/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./CreateFolderPanel.module.scss";
import { FaTimes } from "react-icons/fa";
import { useCreateFolder } from "../../../hooks/useFolders";
import Spinner from "../../../utilities/Spinner/Spinner";
export default function CreateFolderPanel({ onClosePanel }) {
  const [files, setFiles] = useState([]);
  const [folderName, setFolderName] = useState("");

  const { mutate, isLoading } = useCreateFolder();
  function handleChange(e) {
    setFiles(e.target.files);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    const photoArr = Array.from(files);
    photoArr.forEach((f) => formData.append("photos", f));
    formData.append("folderName", folderName);
    mutate(formData, {
      onSuccess: (res) => {
        if (res) onClosePanel(false);
      },
      onError: (err) => console.log(err.message),
    });
  }

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.createFolderPanel}>
      <button className={styles.closePanel} onClick={() => onClosePanel(false)}>
        <FaTimes />
      </button>

      <form className={styles.creationPanel} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="folderName">Folder name</label>
        <input
          type="text"
          id="folderName"
          name="folderName"
          placeholder="Enter folder name..."
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <input
          type="file"
          name="photos"
          id="images"
          multiple
          className={styles.hideInput}
          onChange={(e) => handleChange(e)}
        />
        <button>Create</button>
      </form>
    </div>
  );
}

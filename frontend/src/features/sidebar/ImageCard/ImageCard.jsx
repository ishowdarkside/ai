/* eslint-disable react/prop-types */
import { useState } from "react";
import { useFileContext } from "../../../context/fileContext";
import styles from "./ImageCard.module.scss";
import { renameImage } from "../../../services/folders";

export default function ImageCard({ data, folderId }) {
  const { setSelectedBackground } = useFileContext();
  const [editImageName, setEditImageName] = useState(false);
  const [imageName, setImageName] = useState(data);

  function handleSaveFolder() {
    if (!imageName) return;
    setEditImageName(false);
    renameImage(folderId, data, imageName);
    // Send data that is edited to backend
  }

  console.log(data)

  return (
    <div className={styles.image}>
      <img
        src={`http://127.0.0.1:3000/${data}`}
        alt="folder img"
        onClick={() => setSelectedBackground(data)}
      />
      <div className={styles.content}>
        {editImageName ? (
          <>
            <input
              type="text"
              className={styles.imageNameInput}
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
            />
            <button className={styles.editImageName} onClick={handleSaveFolder}>
              Save
            </button>
          </>
        ) : (
          <>
            <p>
              {imageName.length > 10
                ? imageName.slice(0, 10) + "..."
                : imageName}
            </p>
            <button
              className={styles.editImageName}
              onClick={() => setEditImageName(true)}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

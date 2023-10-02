/* eslint-disable react/prop-types */
import ImageCard from "../ImageCard/ImageCard";
import { BsArrowLeftShort, BsPlusLg } from "react-icons/bs";
import styles from "./FolderLayout.module.scss";
import { useFolderContext } from "../../../context/FolderContext";
import { useUpdateFolder } from "../../../hooks/useFolders";
import { useState } from "react";
import Spinner from "../../../utilities/Spinner/Spinner";
export default function FolderLayout() {
  const { activeFolder, setActiveFolder } = useFolderContext();
  const [files, setFiles] = useState([]);
  const { mutate, isLoading } = useUpdateFolder();
  function handleChange(e) {
    setFiles(e.target.files);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    const photoArr = Array.from(files);
    photoArr.forEach((f) => formData.append("photos", f));
    mutate(
      { id: activeFolder._id, formData },
      {
        onSuccess: (res) => {
          if (res.status === "success") setActiveFolder(null);
        },
      }
    );
  }

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.folder}>
      <button onClick={() => setActiveFolder(null)}>
        <BsArrowLeftShort />
      </button>
      {activeFolder.images.length === 0 && (
        <span className={styles.emptySpan}>
          Empty folder. Start adding images
        </span>
      )}
      <div className={styles.folder_layout}>
        {activeFolder.images.map((item, index) => (
          <ImageCard data={item} key={index} />
        ))}
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="photos" className={styles.add_image}>
          <BsPlusLg />
        </label>
        <input
          type="file"
          id="photos"
          name="photos"
          onChange={(e) => handleChange(e)}
          className={styles.hide_input}
          multiple
        />
        {files.length > 0 && (
          <span>Add +{files.length} photos to this collection</span>
        )}
        {files.length > 0 && <button className={styles.saveBtn}>Save</button>}
      </form>
    </div>
  );
}

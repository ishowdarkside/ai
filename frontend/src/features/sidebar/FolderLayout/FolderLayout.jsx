/* eslint-disable react/prop-types */
import ImageCard from "../ImageCard/ImageCard";
import { BsArrowLeftShort, BsPlusLg } from "react-icons/bs";
import styles from "./FolderLayout.module.scss";
import { useFolderContext } from "../../../context/FolderContext";
export default function FolderLayout() {
  const { activeFolder, setActiveFolder } = useFolderContext();
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
      <form>
        <label htmlFor="add_image" className={styles.add_image}>
          <BsPlusLg />
        </label>
        <input
          type="file"
          id="add_image"
          className={styles.hide_input}
          multiple
        />
      </form>
    </div>
  );
}

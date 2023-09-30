/* eslint-disable react/prop-types */
import { useFolderContext } from "../../../context/FolderContext";
import styles from "./FolderCard.module.scss";
import { AiFillFolderOpen } from "react-icons/ai";
export default function FolderCard({ data }) {
  const { setActiveFolder } = useFolderContext();
  return (
    <div className={styles.folder} onClick={() => setActiveFolder(data)}>
      <div className={styles.second_box}></div>
      <div className={styles.first_box}></div>
      {data.images.length > 0 && (
        <img src={`http://127.0.0.1:3000/${data.images[0]}`} alt="photo" />
      )}
      {data.images.length === 0 && <AiFillFolderOpen />}
      <div>
        <span>{data.name}</span>
        <span>{data.images.length}</span>
      </div>
    </div>
  );
}

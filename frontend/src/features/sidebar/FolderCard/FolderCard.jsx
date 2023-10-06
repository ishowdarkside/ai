/* eslint-disable react/prop-types */
import { useFolderContext } from "../../../context/FolderContext";
import { AiFillFolderOpen } from "react-icons/ai";
import { FaTimes } from 'react-icons/fa';
import styles from "./FolderCard.module.scss";
export default function FolderCard({ data, handleFolderDelete }) {
  const { setActiveFolder } = useFolderContext();
  return (
    <div className={styles.folder}>
      <div className={styles.second_box}></div>
      <div className={styles.first_box}></div>
      <span className={styles.deleteFolderIcon} onClick={() => handleFolderDelete(data._id)}><FaTimes /></span>
      {data.images.length > 0 ? (
        <img onClick={() => setActiveFolder(data)} src={`http://127.0.0.1:3000/${data.images[0]}`} alt="photo" />
      ): <div onClick={() => setActiveFolder(data)} className={styles.noImage}><AiFillFolderOpen className={styles.folderIcon} /></div>}
      <div>
        <span>{data.name}</span>
        <span>{data.images.length}</span>
      </div>
    </div>
  );
}

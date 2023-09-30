/* eslint-disable react/prop-types */
import styles from "./FolderCard.module.scss";
export default function FolderCard({ data, setIsOpenFolder }) {
  return (
    <div className={styles.folder} onClick={() => setIsOpenFolder(data.name)}>
      <div className={styles.second_box}></div>
      <div className={styles.first_box}></div>
      <img src={`http://127.0.0.1:3000/${data.images[0]}`} alt="photo" />
      <div>
        <span>{data.name}</span>
        <span>{data.images.length}</span>
      </div>
    </div>
  );
}

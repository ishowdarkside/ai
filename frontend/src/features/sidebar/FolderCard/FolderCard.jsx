/* eslint-disable react/prop-types */
import styles from "./FolderCard.module.scss";
export default function FolderCard({ data, setIsOpenFolder }) {
  return (
    <div className={styles.folder} onClick={() => setIsOpenFolder(data.title)}>
      <div className={styles.second_box}></div>
      <div className={styles.first_box}></div>
      <img src={data.background_image} alt="photo" />
      <div>
        <span>{data.title}</span>
        <span>{data.item_length}</span>
      </div>
    </div>
  );
}

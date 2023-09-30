/* eslint-disable react/prop-types */
import styles from "./ImageCard.module.scss";
export default function ImageCard({ data }) {
  return (
    <div className={styles.image}>
      <img src={`http://127.0.0.1:3000/${data}`} alt="folder img" />
    </div>
  );
}

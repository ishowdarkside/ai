/* eslint-disable react/prop-types */
import { useFileContext } from "../../../context/fileContext";
import styles from "./ImageCard.module.scss";
export default function ImageCard({ data }) {
  const { setSelectedBackground } = useFileContext();
  return (
    <div className={styles.image} onClick={() => setSelectedBackground(data)}>
      <img src={`http://127.0.0.1:3000/${data}`} alt="folder img" />
    </div>
  );
}

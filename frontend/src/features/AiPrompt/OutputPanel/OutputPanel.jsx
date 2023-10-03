import { usePromptContext } from "../../../context/PromptContext";
import styles from "./OutputPanel.module.scss";

export default function OutputPanel() {
  const { imgLink } = usePromptContext();
  return (
    <div className={styles.outputWrapper}>
      {imgLink && (
        <a href={imgLink}>
          <img src={imgLink} />
        </a>
      )}
    </div>
  );
}

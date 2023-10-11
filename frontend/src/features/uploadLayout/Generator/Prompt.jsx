import { useFileContext } from "../../../context/fileContext";
import styles from "./Generator.module.scss";
import Draggable from "./PromptComponents/Draggable";
import ImageSizing from "./PromptComponents/ImageSizing";
import { resizeProduct } from "./resizeProduct";

export default function Prompt() {
  const {
    setFile,
    boxRef,
    positions: { x, y },
    file,
  } = useFileContext();

  return (
    <div className={styles.promptWrapper}>
      <button onClick={() => setFile(null)} className={styles.chooseFile}>
        Choose product
      </button>
      <Draggable />
      <ImageSizing />
      <button
        className={styles.generateBtn}
        onClick={() => {
          resizeProduct(boxRef, file);
        }}
      >
        Generate
      </button>
    </div>
  );
}

import { useFileContext } from "../../../context/fileContext";
import styles from "./Generator.module.scss";
import Draggable from "./PromptComponents/Draggable";
import ImageSizing from "./PromptComponents/ImageSizing";
import { handleCompose } from "../../../services/handleCompose";
import { useGeneratorContext } from "../../../context/GeneratorContext";

export default function Prompt() {
  const {
    setFile,
    boxRef,
    positions: { x, y },
    file,
    selectedBackground,
  } = useFileContext();

  const { backgroundByte, selectedSize, setResizedImage, resizedImage } =
    useGeneratorContext();

  console.log(x, y);
  return (
    <div className={styles.promptWrapper}>
      <button onClick={() => setFile(null)} className={styles.chooseFile}>
        Choose product
      </button>
      <Draggable />
      <ImageSizing />
      <button
        className={styles.generateBtn}
        onClick={async () => {
          const res = await handleCompose(
            boxRef,
            file,
            selectedBackground,
            selectedSize,
            x,
            y
          );
          setResizedImage(res);
        }}
      >
        Generate
      </button>
    </div>
  );
}

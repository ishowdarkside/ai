import { useFileContext } from "../../../context/fileContext";
import styles from "./Generator.module.scss";
import Draggable from "./PromptComponents/Draggable";
import ImageSizing from "./PromptComponents/ImageSizing";
import { handleCompose } from "../../../services/handleCompose";
import { useGeneratorContext } from "../../../context/GeneratorContext";
import { useRef } from "react";
import transparentBG from "../../../assets/transparent_image_bg.jpg";

export default function Prompt() {
  const { setFile, positions, file, selectedBackground, productSize } =
    useFileContext();

  const { selectedSize, setResizedImage } = useGeneratorContext();
  const containerRef = useRef(null);

  return (
    <div
      className={styles.promptWrapper}
      style={
        selectedBackground
          ? {
              backgroundImage: `url(http://127.0.0.1:3000/${selectedBackground})`,
            }
          : { backgroundImage: `url(${transparentBG})` }
      }
      ref={containerRef}
    >
      <button onClick={() => setFile(null)} className={styles.chooseFile}>
        Choose product
      </button>
      <Draggable containerRef={containerRef} />
      <ImageSizing />
      <button
        className={styles.generateBtn}
        onClick={async () => {
          const res = await handleCompose(
            productSize,
            file,
            selectedBackground,
            selectedSize,
            positions
          );
          setResizedImage(res);
        }}
      >
        Generate
      </button>
    </div>
  );
}

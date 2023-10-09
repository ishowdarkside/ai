import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableBox from "../DraggableBox/DraggableBox";
import { BsArrowsMove } from "react-icons/bs";
import { IoMdResize } from "react-icons/io";
import { useGeneratorContext } from "../../../context/GeneratorContext";
import { useFileContext } from "../../../context/fileContext";
import { handleCompose } from "./handleCompose";
import { useState } from "react";
import styles from "./Generator.module.scss";
import { convertByte } from "./convertByte";

export default function Prompt() {
  const {
    isMoving,
    setIsMoving,
    setSelectedSize,
    selectedSize,
    isCustom,
    setIsOpenModal,
    setIsCustom,
    setResizedImage,
    setIsSaved,
    setBackgroundByte,
  } = useGeneratorContext();
  const {
    image,
    setFile,
    boxRef,
    file,
    positions: { x, y },
    selectedBackground,
  } = useFileContext();
  const [isGenerating, setIsGenerating] = useState(false);

  const backgroundURL =
    selectedBackground && selectedBackground.includes("google")
      ? selectedBackground
      : `http://127.0.0.1:3000/` + selectedBackground;

  return (
    <div className={styles.promptWrapper}>
      <button onClick={() => setFile(null)} className={styles.chooseFile}>
        Choose product
      </button>
      <DndProvider backend={HTML5Backend}>
        <div
          className={styles.image}
          style={
            backgroundURL && {
              backgroundImage: `url(${backgroundURL})`,
            }
          }
        >
          <DraggableBox
            id="box1"
            left={50}
            top={50}
            image={image}
            isMoving={isMoving}
          />
        </div>
      </DndProvider>

      <button
        onClick={() => setIsMoving((curr) => !curr)}
        className={styles.toggleBtn}
      >
        {isMoving ? (
          <div className={styles.resizeIcon}>
            <IoMdResize />
          </div>
        ) : (
          <div className={styles.moveIcon}>
            <BsArrowsMove />
          </div>
        )}
      </button>
      <div className={styles.sizePanelWrapper}>
        <span>Choose size</span>
        <div
          onClick={() => {
            setSelectedSize({ width: 1080, height: 1920 });
            setIsCustom(false);
          }}
          className={
            (selectedSize.width === 1080 &&
              selectedSize.height === 1920 &&
              !isCustom &&
              styles.selected) ||
            ""
          }
        >
          9:16
        </div>
        <div
          onClick={() => {
            setIsCustom(false);
            setSelectedSize({ width: 1080, height: 1350 });
          }}
          className={
            (selectedSize.width === 1080 &&
              selectedSize.height === 1350 &&
              !isCustom &&
              styles.selected) ||
            ""
          }
        >
          4:5
        </div>
        <div
          onClick={() => {
            setIsCustom(false);
            setSelectedSize({ width: 800, height: 800 });
          }}
          className={
            (selectedSize.width === 800 &&
              selectedSize.height === 800 &&
              !isCustom &&
              styles.selected) ||
            ""
          }
        >
          4:3
        </div>
        <div
          className={isCustom ? styles.isCustom : ""}
          onClick={() => {
            setIsCustom(true);
            setIsOpenModal(true);
          }}
        >
          Custom
        </div>
      </div>
      <button
        disabled={selectedBackground || !isGenerating ? false : true}
        onClick={async () => {
          if (!selectedBackground) return;
          setIsGenerating(true);
          const base64 = await convertByte(selectedBackground);
          setBackgroundByte(base64);
          await handleCompose(
            boxRef,
            file,
            base64,
            selectedSize,
            x,
            y,
            setResizedImage,
            selectedBackground,
            setBackgroundByte
          );
          setIsSaved(false);
          setIsGenerating(false);
        }}
        className={`${styles.generateBtn} ${
          isGenerating ? styles.disabledBtn : ""
        }`}
      >
        {!isGenerating ? "Generate" : "Generating..."}
      </button>
    </div>
  );
}

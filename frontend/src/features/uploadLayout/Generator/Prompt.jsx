import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableBox from "../DraggableBox/DraggableBox";
import { BsArrowsMove } from "react-icons/bs";
import styles from "./Generator.module.scss";
import { IoMdResize } from "react-icons/io";
import { useGeneratorContext } from "../../../context/GeneratorContext";
import { useFileContext } from "../../../context/fileContext";
import { handleCompose } from "./handleCompose";

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
    backgroundByte,
    setIsSaved,
  } = useGeneratorContext();
  const {
    image,
    setFile,
    boxRef,
    file,
    positions: { x, y },
    selectedBackground,
  } = useFileContext();

  return (
    <div className={styles.promptWrapper}>
      <button onClick={() => setFile(null)} className={styles.chooseFile}>
        Choose product
      </button>
      <DndProvider backend={HTML5Backend}>
        <div
          className={styles.image}
          style={
            backgroundByte && {
              backgroundImage: `url(${backgroundByte})`,
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
        disabled={selectedBackground ? false : true}
        onClick={() => {
          handleCompose(
            boxRef,
            file,
            backgroundByte,
            selectedSize,
            x,
            y,
            setResizedImage,
            selectedBackground
          );
          setIsSaved(false);
        }}
        className={styles.generateBtn}
      >
        Generate
      </button>
    </div>
  );
}

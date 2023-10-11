import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableBox from "../../DraggableBox/DraggableBox";
import { BsArrowsMove } from "react-icons/bs";
import styles from "../Generator.module.scss";
import { IoMdResize } from "react-icons/io";
import { useGeneratorContext } from "../../../../context/GeneratorContext";
import { useFileContext } from "../../../../context/fileContext";

export default function Draggable() {
  const { isMoving, setIsMoving } = useGeneratorContext();
  const { selectedBackground, image } = useFileContext();
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div
          className={styles.image}
          style={
            selectedBackground && {
              backgroundImage: `url(${selectedBackground})`,
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
    </>
  );
}

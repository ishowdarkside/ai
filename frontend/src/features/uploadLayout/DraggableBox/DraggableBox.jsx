import { useRef } from "react";
import Draggable from "react-draggable";
import styles from "./DraggableBox.module.scss";
import { useFileContext } from "../../../context/fileContext";

// eslint-disable-next-line react/prop-types
const DraggableBox = ({ left, top, children, image }) => {
  const boxRef = useRef(null);
  const { setPositions } = useFileContext();

  const handleDrag = (e, ui) => {
    const { x, y } = ui;
    setPositions({ x, y });
  };
  return (
    <Draggable
      defaultPosition={{ x: left, y: top }}
      bounds="parent"
      nodeRef={boxRef}
      onDrag={handleDrag}
    >
      <div
        ref={boxRef}
        className={styles.draggableImage}
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableBox;

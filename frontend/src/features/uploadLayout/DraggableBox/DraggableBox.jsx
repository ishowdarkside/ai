import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import styles from "./DraggableBox.module.scss";
import { useFileContext } from "../../../context/fileContext";

// eslint-disable-next-line react/prop-types
const DraggableBox = ({ left, top, children, image, isMoving }) => {
  const [dimensions, setDimensions] = useState({ width: 200, height: 200 });
  const [isResizing, setResizing] = useState(false);

  const { setPositions, boxRef } = useFileContext();

  const handleDrag = (e, ui) => {
    if (!isMoving) return;
    const { x, y } = ui;
    setPositions({ x, y });
  };

  const startResize = () => {
    // setIsMoving(false);
    setResizing(true);
  };

  const stopResize = () => {
    // setIsMoving(true);
    setResizing(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResize);
    };

    function resize(e) {
      if (isResizing && !isMoving) {
        const newWidth =
          e.clientX - boxRef.current.getBoundingClientRect().left;
        const newHeight =
          e.clientY - boxRef.current.getBoundingClientRect().top;

        if (newWidth > 500 || newHeight > 500) return;
        setDimensions({ width: newWidth, height: newHeight });
      }
    }
  }, [isResizing, isMoving, boxRef]);

  return (
    <Draggable
      defaultPosition={{ x: left, y: top }}
      bounds="parent"
      nodeRef={boxRef}
      onDrag={handleDrag}
      disabled={!isMoving}
    >
      <div
        ref={boxRef}
        className={styles.draggableImage}
        style={{
          backgroundImage: `url(${image})`,
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        <div
          className={`${styles.resizeSe} ${styles.resizer}`}
          onMouseDown={startResize}
          style={isMoving ? { display: "none" } : {}}
        ></div>{" "}
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableBox;

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableBox from "../DraggableBox/DraggableBox";
import { useFileContext } from "../../../context/fileContext";
import styles from "./Generator.module.scss";
import mergeImages from "merge-images";
import { useEffect, useState } from "react";
import { resizeProduct } from "../../../services/images";
import { BsFillImageFill } from "react-icons/bs";

export default function Generator() {
  const {
    image,
    setFile,
    positions: { x, y },
    selectedBackground,
  } = useFileContext();

  const [backgroundByte, setBackgroundByte] = useState(null);
  const [processedProduct, setProcessedProduct] = useState(null);

  useEffect(() => {
    if (!selectedBackground) return;
    async function convertByte() {
      const response = await fetch(
        `http://127.0.0.1:3000/${selectedBackground}`
      );
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        setBackgroundByte(reader.result);
      };
    }
    convertByte();
  }, [selectedBackground]);
  async function handleCompose() {
    const resizedProduct = await resizeProduct(image);

    mergeImages([
      backgroundByte,
      { src: resizedProduct, x: x * 2, y: y * 2 },
    ]).then((b64) => setProcessedProduct(b64));
  }
  return (
    <div className={styles.generator}>
      <div className={styles.panelsWrapper}>
        <div className={styles.promptWrapper}>
          <button onClick={() => setFile(null)} className={styles.chooseFile}>
            Choose product
          </button>
          <DndProvider backend={HTML5Backend}>
            <div
              className={styles.image}
              style={
                selectedBackground && {
                  backgroundImage: `url(http://127.0.0.1:3000/${selectedBackground})`,
                }
              }
            >
              <DraggableBox
                id="box1"
                left={50}
                top={50}
                image={image}
              ></DraggableBox>
            </div>
          </DndProvider>

          <button
            disabled={selectedBackground ? false : true}
            onClick={handleCompose}
            className={styles.generateBtn}
          >
            Generate
          </button>
        </div>
        {processedProduct ? (
          <a href={processedProduct} download className={styles.outputLink}>
            <div className={styles.outputOverlay}>
              <span>CLICK TO DOWNLOAD IMAGE</span>
            </div>
            <div
              style={{ backgroundImage: `url(${processedProduct})` }}
              className={styles.outputWrapper}
            ></div>
          </a>
        ) : (
          <div className={styles.fillPlaceholder}>
            <BsFillImageFill />
          </div>
        )}
      </div>
    </div>
  );
}

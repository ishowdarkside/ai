import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableBox from "../DraggableBox/DraggableBox";
import { useFileContext } from "../../../context/fileContext";
import styles from "./Generator.module.scss";
import mergeImages from "merge-images";
import { useEffect, useState } from "react";
import { resizeProduct } from "../../../services/images";

export default function Generator() {
  const {
    image,
    setFile,
    positions: { x, y },
  } = useFileContext();
  const { selectedBackground } = useFileContext();
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
      { src: resizedProduct, x: x * 1.8, y: y * 1.4 },
    ]).then((b64) => setProcessedProduct(b64));
  }
  return (
    <div className={styles.generator}>
      <span onClick={() => setFile(null)}>Choose product</span>
      <div className={styles.promptWrapper}>
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
        <div className={styles.form}>
          {selectedBackground && (
            <button onClick={handleCompose}>Generate</button>
          )}
        </div>
      </div>
      {processedProduct && <img src={processedProduct} />}
    </div>
  );
}

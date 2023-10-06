import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableBox from "../DraggableBox/DraggableBox";
import { useFileContext } from "../../../context/fileContext";
import mergeImages from "merge-images";
import { useEffect, useState } from "react";
import { resizeProduct } from "../../../services/images";
import { BsFillImageFill, BsArrowsMove } from "react-icons/bs";
import { IoMdResize } from 'react-icons/io';
import styles from "./Generator.module.scss";

export default function Generator() {
  const {
    image,
    setFile,
    file,
    positions: { x, y },
    selectedBackground,
    boxRef,
  } = useFileContext();

  const [backgroundByte, setBackgroundByte] = useState(null);
  const [processedProduct, setProcessedProduct] = useState(null);
  const [isMoving, setIsMoving] = useState(true);

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
    const productWidth = boxRef.current.getBoundingClientRect().width;
    const productHeight = boxRef.current.getBoundingClientRect().height;

    const formData = new FormData();
    formData.append("product", file, file.name);
    formData.append("width", productWidth);
    formData.append("height", productHeight);
    const resizedProduct = await resizeProduct(
      formData,
      productWidth,
      productHeight
    );

    mergeImages([
      backgroundByte,
      { src: resizedProduct, x: x * 1.5, y: y * 1.5 },
    ])
      .then((b64) => setProcessedProduct(b64))
      .catch((err) => {
        console.log(err);
      });
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
                isMoving={isMoving}
              ></DraggableBox>
            </div>
          </DndProvider>

          <button
            onClick={() => setIsMoving((curr) => !curr)}
            className={styles.toggleBtn}
          >
            {isMoving ? <div className={styles.resizeIcon}><IoMdResize /></div> : <div className={styles.moveIcon}><BsArrowsMove /></div>}
          </button>
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

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableBox from "../DraggableBox/DraggableBox";
import { useFileContext } from "../../../context/fileContext";
import mergeImages from "merge-images";
import { useEffect, useState } from "react";
import { resizeImage, resizeProduct } from "../../../services/images";
import { BsFillImageFill, BsArrowsMove } from "react-icons/bs";
import { IoMdResize } from "react-icons/io";
import styles from "./Generator.module.scss";

import Modal from "../../../utilities/Modal/Modal";

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
  const [isMoving, setIsMoving] = useState(true);
  const [selectedSize, setSelectedSize] = useState({ width: 800, height: 800 });
  const [resizedImage, setResizedImage] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
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

    const b64 = await mergeImages([
      backgroundByte,
      { src: resizedProduct, x: x * 1.5, y: y * 1.5 },
    ]);

    const resizedResponse = await resizeImage(
      b64,
      selectedSize.width,
      selectedSize.height
    );

    setResizedImage(resizedResponse);
  }
  return (
    <>
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
              onClick={handleCompose}
              className={styles.generateBtn}
            >
              Generate
            </button>
          </div>
          {resizedImage ? (
            <a href={resizedImage} download className={styles.outputLink}>
              <div className={styles.outputOverlay}>
                <span>CLICK TO DOWNLOAD IMAGE</span>
              </div>
              <div
                style={{
                  backgroundImage: `url(${resizedImage})`,
                }}
                className={styles.outputWrapper}
              />
            </a>
          ) : (
            <div className={styles.fillPlaceholder}>
              <BsFillImageFill />
            </div>
          )}
        </div>
      </div>
      {isOpenModal && (
        <Modal closeBtn={setIsOpenModal} setIsCustom={setIsCustom}>
          <div>
            <form>
              <input
                type="number"
                placeholder="width"
                onChange={(e) =>
                  setSelectedSize((curr) => {
                    return { ...curr, width: parseInt(e.target.value) };
                  })
                }
              />
              <input
                type="number"
                placeholder="height"
                onChange={(e) =>
                  setSelectedSize((curr) => {
                    return { ...curr, height: parseInt(e.target.value) };
                  })
                }
              />
              <button
                onClick={() => {
                  setIsOpenModal(false);
                }}
              >
                Save
              </button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}

import { useGeneratorContext } from "../../../../context/GeneratorContext";
import styles from "../Generator.module.scss";

export default function ImageSizing() {
  const {
    setSelectedSize,
    selectedSize,
    isCustom,
    setIsOpenModal,
    setIsCustom,
  } = useGeneratorContext();
  return (
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
  );
}

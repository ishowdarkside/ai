import { useFileContext } from "../../../context/fileContext";
import { useEffect } from "react";
import styles from "./Generator.module.scss";
import Prompt from "./Prompt";
import { useGeneratorContext } from "../../../context/GeneratorContext";
import Output from "./Output";
import CustomSizeModal from "./CustomSizeModal";
import { convertByte } from "./convertByte";

export default function Generator() {
  const { selectedBackground } = useFileContext();
  const { setBackgroundByte } = useGeneratorContext();

  useEffect(() => {
    if (!selectedBackground) return;
    convertByte(selectedBackground, setBackgroundByte);
  }, [selectedBackground, setBackgroundByte]);

  return (
    <>
      <div className={styles.generator}>
        <div className={styles.panelsWrapper}>
          <Prompt />
          <Output />
        </div>
      </div>
      <CustomSizeModal />
    </>
  );
}

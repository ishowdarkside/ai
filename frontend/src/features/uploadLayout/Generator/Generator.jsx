import { useFileContext } from "../../../context/fileContext";
import { useEffect } from "react";
import styles from "./Generator.module.scss";
import Prompt from "./Prompt";
import { useGeneratorContext } from "../../../context/GeneratorContext";
import Output from "./Output";
import CustomSizeModal from "./CustomSizeModal";
import { convertByte } from "./convertByte";
import AiPrompt from "./AiPrompt/AiPrompt";

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
          <AiPrompt />
          <Output />
        </div>
      </div>
      <CustomSizeModal />
    </>
  );
}

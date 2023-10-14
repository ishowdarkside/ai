import { useEffect, useState } from "react";
import { useAiPromptContext } from "../../../../context/AiPromptContext";
import Spinner from "../../../../utilities/Spinner/Spinner";
import styles from "./AiPrompt.module.scss";
import OutputElement from "./OutputElement";
import { handleCompose } from "../../../../services/handleCompose";
import { useFileContext } from "../../../../context/fileContext";
export default function AiOutput() {
  const { aiImages } = useAiPromptContext();
  const { isGenerating } = useAiPromptContext();
  const [mergedAiImages, setMergedAiImages] = useState([]);

  const { productSize, positions, file } = useFileContext();

  useEffect(() => {
    async function mergeAiImages() {
      const mergedImages = await Promise.all(
        aiImages.map(async (img) => {
          const response = await handleCompose(
            productSize,
            file,
            img.tmp_url,
            { width: 1024, height: 1024 },
            positions
          );
          return response;
        })
      );

      setMergedAiImages(mergedImages);
    }

    if (aiImages.length === 0) return;
    mergeAiImages();
  }, [aiImages]);

  if (isGenerating)
    return (
      <div className={styles.spinnerWrapper}>
        <Spinner />
      </div>
    );
  if (mergedAiImages.length > 0 && !isGenerating)
    return (
      <div className={styles.outputWrapper}>
        {mergedAiImages.map((image, i) => (
          <OutputElement image={image} key={i} />
        ))}
      </div>
    );

  return null;
}

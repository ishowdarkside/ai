import { useAiPromptContext } from "../../../../context/AiPromptContext";
import Spinner from "../../../../utilities/Spinner/Spinner";
import styles from "./AiPrompt.module.scss";
import OutputElement from "./OutputElement";
export default function AiOutput() {
  const { aiImages } = useAiPromptContext();

  console.log(aiImages)

  const { isGenerating } = useAiPromptContext();
  if (isGenerating)
    return (
      <div className={styles.spinnerWrapper}>
        <Spinner />
      </div>
    );
  if (aiImages.length > 0 && !isGenerating)
    return (
      <div className={styles.outputWrapper}>
        {aiImages.map((image, i) => (
          <OutputElement image={image} key={i} />
        ))}
      </div>
    );

  return null;
}

import styles from "./Generator.module.scss";
import Prompt from "./Prompt";
import Output from "./Output";
import CustomSizeModal from "./CustomSizeModal";
import AiPrompt from "./AiPrompt/AiPrompt";

export default function Generator() {
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

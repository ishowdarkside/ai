import OutputPanel from "../../features/AiPrompt/OutputPanel/OutputPanel";
import PromptForm from "../../features/AiPrompt/PromptForm/PromptForm";
import Navbar from "../../utilities/Navbar/Navbar";
import styles from "./AiPrompt.module.scss";
export default function AiPrompt() {
  return (
    <div className={styles.sectionBody}>
      <Navbar />
      <PromptForm />
      <OutputPanel />
    </div>
  );
}

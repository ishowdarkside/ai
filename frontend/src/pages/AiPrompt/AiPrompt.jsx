import { usePromptContext } from "../../context/PromptContext";
import OutputPanel from "../../features/AiPrompt/OutputPanel/OutputPanel";
import PromptForm from "../../features/AiPrompt/PromptForm/PromptForm";
import Navbar from "../../utilities/Navbar/Navbar";
import styles from "./AiPrompt.module.scss";
import { useSaveImages } from "../../hooks/useImages";
import Spinner from "../../utilities/Spinner/Spinner";
export default function AiPrompt() {
  const { selectedImages, setSelectedImages } = usePromptContext();

  const { mutate, isLoading } = useSaveImages();

  async function handleSave() {
    mutate(selectedImages, {
      onSuccess: (res) => {
        if (res.status === "success") {
          setSelectedImages([]);
        }
      },
    });
  }

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.sectionBody}>
      <Navbar />
      <PromptForm />
      <OutputPanel />
      {selectedImages.length > 0 && (
        <button
          disabled={isLoading}
          onClick={handleSave}
          className={styles.saveBtn}
        >
          {isLoading ? "Saving..." : `Save ${selectedImages.length} images`}
        </button>
      )}
    </div>
  );
}

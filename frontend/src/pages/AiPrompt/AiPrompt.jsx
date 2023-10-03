import { useState } from "react";
import { usePromptContext } from "../../context/PromptContext";
import OutputPanel from "../../features/AiPrompt/OutputPanel/OutputPanel";
import PromptForm from "../../features/AiPrompt/PromptForm/PromptForm";
import { saveImage } from "../../services/images";
import Navbar from "../../utilities/Navbar/Navbar";
import styles from "./AiPrompt.module.scss";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
export default function AiPrompt() {
  const { selectedImages, setSelectedImages } = usePromptContext();
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSave() {
    setIsSaving(true);
    const response = await saveImage(selectedImages);
    if (response.status === "success") {
      toast.success(response.message);
      setIsSaving(false);
      setSelectedImages([]);
      queryClient.invalidateQueries(["savedImages"]);
      navigate("/myImages");
    }
  }

  return (
    <div className={styles.sectionBody}>
      <Navbar />
      <PromptForm />
      <OutputPanel />
      {selectedImages.length > 0 && (
        <button
          disabled={isSaving}
          onClick={handleSave}
          className={styles.saveBtn}
        >
          {isSaving ? "Saving..." : `Save ${selectedImages.length} images`}
        </button>
      )}
    </div>
  );
}

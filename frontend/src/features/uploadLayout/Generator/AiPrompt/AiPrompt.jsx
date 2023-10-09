import { useState } from "react";
import AiOutput from "./AiOutput";
import styles from "./AiPrompt.module.scss";
import { prompt } from "../../../../services/prompt";
import { useAiPromptContext } from "../../../../context/AiPromptContext";
export default function AiPrompt() {
  const [input, setInput] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const { setAiImages, isGenerating, setIsGenerating } = useAiPromptContext();

  async function handleGenerate(e) {
    setAiImages([]);
    e.preventDefault();
    if (!input) return;
    setInput("");
    setNegativePrompt("");
    setIsGenerating(true);
    const res1 = await prompt(input);
    const res2 = await prompt(input);
    const res3 = await prompt(input);
    setAiImages((curr) => [
      ...curr,
      ...res1.data.output,
      ...res2.data.output,
      ...res3.data.output,
    ]);
    setIsGenerating(false);
  }
  return (
    <div className={styles.aiPrompWrapper}>
      <form onSubmit={(e) => handleGenerate(e)}>
        <textarea
          placeholder="Prompt the Ai for generating backgrounds"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <textarea
          placeholder="Negative prompt"
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
        ></textarea>
        <button disabled={isGenerating}>
          {isGenerating ? "Generating..." : "Generate Ai backgrounds"}
        </button>
      </form>
      <AiOutput />
    </div>
  );
}

import styles from "./PromptForm.module.scss";
import { prompt } from "../../../services/prompt";
import { useState } from "react";
import Spinner from "../../../utilities/Spinner/Spinner";
import { usePromptContext } from "../../../context/PromptContext";
export default function PromptForm() {
  const [input, setInput] = useState("");
  const { setImgLink } = usePromptContext();
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!input) return;

    setImgLink(null);
    setIsLoading(true);
    const data = await prompt(input);
    setImgLink(data.data.output);
    setIsLoading(false);
    setInput("");
  }

  if (isLoading) return <Spinner />;
  return (
    <form className={styles.promptForm} onSubmit={(e) => handleSubmit(e)}>
      <h1>
        Generate your perfect <span>AI Image</span>
      </h1>

      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="A delicious ceviche cheesecake slice"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>Generate</button>
      </div>
    </form>
  );
}

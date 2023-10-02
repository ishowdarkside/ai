import styles from "./PromptForm.module.scss";
import { prompt } from "../../../services/prompt";
import { useState } from "react";
import Spinner from "../../../utilities/Spinner/Spinner";
export default function PromptForm() {
  const [input, setInput] = useState("");
  const [isReady, setIsReady] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const data = await prompt(input);
    setIsReady(data.data.output[0].tmp_url);
    setIsLoading(false);
    setInput("");
  }

  if (isLoading) return <Spinner />;
  return (
    <form className={styles.promptForm} onSubmit={(e) => handleSubmit(e)}>
      <h1>Generate your perfect AI Image</h1>
      <input
        type="text"
        placeholder="A delicious ceviche cheesecake slice"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button>Generate AI Image</button>

      {isReady && (
        <a href={isReady}>
          <img src={isReady} />
        </a>
      )}
    </form>
  );
}

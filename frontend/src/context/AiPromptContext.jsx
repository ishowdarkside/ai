/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const context = createContext();

export default function AiPromptContext({ children }) {
  const [aiImages, setAiImages] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  return (
    <context.Provider
      value={{ aiImages, setAiImages, isGenerating, setIsGenerating }}
    >
      {children}
    </context.Provider>
  );
}

export function useAiPromptContext() {
  const data = useContext(context);
  if (!data) throw new Error("YOU CAN'T USE AiPrompt CONTEXT HERE");
  return data;
}

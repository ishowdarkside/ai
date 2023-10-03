/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const context = createContext();

export default function PromptContext({ children }) {
  const [imgLink, setImgLink] = useState(null);
  return (
    <context.Provider value={{ imgLink, setImgLink }}>
      {children}
    </context.Provider>
  );
}

export function usePromptContext() {
  const data = useContext(context);
  if (!data) throw new Error("You cant use context here");
  return data;
}

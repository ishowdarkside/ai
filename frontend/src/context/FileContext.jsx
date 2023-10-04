/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";

const context = createContext();

export default function FileContext({ children }) {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  return (
    <context.Provider
      value={{
        file,
        setFile,
        image,
        setImage,
        selectedBackground,
        setSelectedBackground,
      }}
    >
      {children}
    </context.Provider>
  );
}

export function useFileContext() {
  const data = useContext(context);
  if (!data) throw new Error("YOU CANT USE FILE CONTEXT HERE");
  return data;
}
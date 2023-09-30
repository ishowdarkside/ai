/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const context = createContext();

export default function FolderContext({ children }) {
  const [activeFolder, setActiveFolder] = useState(null);
  return (
    <context.Provider value={{ activeFolder, setActiveFolder }}>
      {children}
    </context.Provider>
  );
}

export function useFolderContext() {
  const data = useContext(context);
  if (!data) throw new Error("Can't use context here!");
  return data;
}

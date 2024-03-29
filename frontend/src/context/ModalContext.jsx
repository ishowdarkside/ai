/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const context = createContext();

export default function ModalContext({ children }) {
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [ selectedImage, setSelectedImage ] = useState(null);
  const [ selectedProduct, setSelectedProduct ] = useState(null);

  return (
    <context.Provider
      value={{ isOpenModal, setIsOpenModal, selectedFolder, setSelectedFolder, selectedProduct, setSelectedProduct, selectedImage, setSelectedImage }}
    >
      {children}
    </context.Provider>
  );
}

export function useModalContext() {
  const data = useContext(context);
  if (!data) throw new Error("YOU CANT USE MODAL CONTEXT HERE");
  return data;
}

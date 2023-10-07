/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const context = createContext();

export default function GeneratorContext({ children }) {
  const [backgroundByte, setBackgroundByte] = useState(null);
  const [isMoving, setIsMoving] = useState(true);
  const [selectedSize, setSelectedSize] = useState({ width: 800, height: 800 });
  const [resizedImage, setResizedImage] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  return (
    <context.Provider
      value={{
        backgroundByte,
        setBackgroundByte,
        isMoving,
        setIsMoving,
        selectedSize,
        setSelectedSize,
        resizedImage,
        setResizedImage,
        isOpenModal,
        setIsOpenModal,
        isCustom,
        setIsCustom,
      }}
    >
      {children}
    </context.Provider>
  );
}

export function useGeneratorContext() {
  const data = useContext(context);
  if (!data) throw new Error("YOU CAN'T USE GENERATOR CONTEXT HERE");
  return data;
}

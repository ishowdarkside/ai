import { convertToByte } from "../../../services/images";

export async function convertByte(selectedBackground, setBackgroundByte) {
  const url = selectedBackground.includes("googleapis")
    ? selectedBackground
    : selectedBackground;
  const res = await convertToByte(url);

  setBackgroundByte(res.imageBase64);
}

import { convertToByte } from "../../../services/images";

export async function convertByte(selectedBackground) {
  const url = selectedBackground.includes("googleapis")
    ? selectedBackground
    : selectedBackground;
  const res = await convertToByte(url);

  return res.imageBase64;
}

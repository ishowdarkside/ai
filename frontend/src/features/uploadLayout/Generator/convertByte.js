import { convertToByte } from "../../../services/images";

export async function convertByte(selectedBackground, setBackgroundByte) {
  const url = selectedBackground.includes("googleapis")
    ? selectedBackground
    : "http://127.0.0.1:3000/" + selectedBackground;
  const res = await convertToByte(url);

  setBackgroundByte(res.imageBase64);
}

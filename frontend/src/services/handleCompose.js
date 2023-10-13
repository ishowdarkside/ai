import mergeImages from "merge-images";
import { resizeProduct, resizeImage, convertToByte } from "./images";

export async function handleCompose(
  boxRef,
  file,
  selectedBackground,
  selectedSize,
  x,
  y
) {
  const productWidth = boxRef.current.getBoundingClientRect().width;
  const productHeight = boxRef.current.getBoundingClientRect().height;

  const formData = new FormData();
  formData.append("product", file, file.name);
  formData.append("width", productWidth);
  formData.append("height", productHeight);
  const resizedProduct = await resizeProduct(
    formData,
    productWidth,
    productHeight
  );

  console.log(selectedBackground);
  //provjerit na backendu da li je ai generated ili je sa servera
  const convertToByteResponse = await convertToByte(selectedBackground);
  const backgroundByte = convertToByteResponse.imageBase64;

  const b64 = await mergeImages([
    backgroundByte,
    { src: resizedProduct, x: x * 2.7, y: y * 2.7 },
  ]);

  const resizedResponse = await resizeImage(
    b64,
    selectedSize.width,
    selectedSize.height
  );

  return resizedResponse;
}

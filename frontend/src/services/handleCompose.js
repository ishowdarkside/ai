import mergeImages from "merge-images";
import { resizeProduct, resizeImage, convertToByte } from "./images";

export async function handleCompose(
  productSize,
  file,
  selectedBackground,
  selectedSize,
  positions
) {
  const formData = new FormData();
  formData.append("product", file, file.name);
  formData.append("width", productSize.width);
  formData.append("height", productSize.height);
  const resizedProduct = await resizeProduct(
    formData,
    productSize.width,
    productSize.height
  );

  //provjerit na backendu da li je ai generated ili je sa servera
  const convertToByteResponse = await convertToByte(selectedBackground);
  const backgroundByte = convertToByteResponse.imageBase64;

  const b64 = await mergeImages([
    backgroundByte,
    { src: resizedProduct, x: positions.x * 2.7, y: positions.y * 2.7 },
  ]);

  const resizedResponse = await resizeImage(
    b64,
    selectedSize.width,
    selectedSize.height
  );

  return resizedResponse;
}

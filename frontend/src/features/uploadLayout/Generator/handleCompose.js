import mergeImages from "merge-images";
import { resizeProduct, resizeImage } from "../../../services/images";
import { convertByte } from "./convertByte";

export async function handleCompose(
  boxRef,
  file,
  backgroundByte,
  selectedSize,
  x,
  y,
  setResizedImage,
  selectedBackground,
  setBackgroundByte
) {
  await convertByte(selectedBackground, setBackgroundByte);

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

  const b64 = await mergeImages([
    backgroundByte,
    { src: resizedProduct, x: x * 2.2, y: y * 2.2 },
  ]);

  const resizedResponse = await resizeImage(
    b64,
    selectedSize.width,
    selectedSize.height
  );

  setResizedImage(resizedResponse);
}

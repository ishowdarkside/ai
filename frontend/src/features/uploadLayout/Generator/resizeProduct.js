import { resizeProduct as resizeAPI } from "../../../services/images";

export async function resizeProduct(boxRef, file) {
  console.log(boxRef.current.getBoundingClientRect().width)
  console.log(boxRef.current.getBoundingClientRect().height)
  const productWidth = boxRef.current.getBoundingClientRect().width;
  const productHeight = boxRef.current.getBoundingClientRect().height;
  const formData = new FormData();
  formData.append("product", file, file.name);
  formData.append("width", productWidth);
  formData.append("height", productHeight);
  const resizedProduct = await resizeAPI(formData, productWidth, productHeight);
  console.log(resizedProduct);
}

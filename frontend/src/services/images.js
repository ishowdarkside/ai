const BASE_URL = `http://127.0.0.1:3000/`;
import { toast } from "react-hot-toast";
import axios from "axios";

export async function saveImage(imageUrl) {
  try {
    const res = await fetch(`${BASE_URL}api/images/save-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getSavedImages() {
  try {
    const res = await fetch(`${BASE_URL}api/images/savedImages`);
    const data = await res.json();
    return data.images;
  } catch (err) {
    throw new Error(err);
  }
}

export async function deleteImage(imageId) {
  try {
    await fetch(`${BASE_URL}api/images/deleteImage/${imageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}

export async function resizeProduct(formData) {
  try {
    const response = await axios.post(
      `${BASE_URL}api/images/resizeProduct`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data.status === "error")
      return toast.error(
        "Product image too large. Please compress it or choose different one"
      );
    return response.data?.resizedProduct;
  } catch (err) {
    throw new Error(err.response?.data?.message);
  }
}

export async function resizeImage(image, width, height) {
  try {
    const res = await fetch(`${BASE_URL}api/images/resizeImage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image,
        width,
        height,
      }),
    });
    const data = await res.json();
    return data.image;
  } catch (err) {
    throw new Error(err.response?.data?.message);
  }
}

export async function getProductImages() {
  try {
    const res = await fetch(`${BASE_URL}api/images/getProductImages`);
    const data = await res.json();
    return data.productImages;
  } catch (err) {
    throw new Error(err);
  }
}

export async function saveProductImage(imageBase64) {
  try {
    const res = await fetch(`${BASE_URL}api/images/saveProductImage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64 }),
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

export async function saveAiImage(imageUrl) {
  try {
    const res = await fetch(`${BASE_URL}api/images/saveAiImage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: imageUrl,
      }),
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

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
    const res = await fetch(`${BASE_URL}api/images/${imageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data.images;
  } catch (error) {
    throw new Error(err);
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

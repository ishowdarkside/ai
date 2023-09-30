import axios from "axios";
const BASE_URL = `http://127.0.0.1:3000/`;
export async function getAllFolders() {
  try {
    const res = await fetch(`${BASE_URL}api/folders`);
    const data = await res.json();

    return data.folders;
  } catch (err) {
    throw new Error(err);
  }
}

export async function createFolder(formData) {
  try {
    const response = await axios.post(
      `${BASE_URL}api/folders/create`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

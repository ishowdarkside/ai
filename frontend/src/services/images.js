const BASE_URL = `http://127.0.0.1:3000/`;

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

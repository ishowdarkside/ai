const BASE_URL = `https://api.claid.ai/v1-beta1/image/generate`;
const API_KEY = "b26a695527364a77acb0c771fc06e88e";

export async function prompt(promptInput) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        input: promptInput,
        options: {
          number_of_images: 4,
        },
      }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

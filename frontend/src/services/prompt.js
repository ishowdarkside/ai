const BASE_URL = `https://api.claid.ai/v1-beta1/image/generate`;
const API_KEY = "9b97e61fa19344538f8efdbb8cca9883";

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
          number_of_images: 12,
        },
      }),
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

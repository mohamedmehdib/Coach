const STRAPI_API_URL = "http://localhost:1337/api/histories";
const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

interface HistoryData {
  name: string;
  email: string;
  amount: number;
  service: string;
}

export const postToStrapi = async (data: HistoryData) => {
  try {
    const response = await fetch(STRAPI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_KEY}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to post to Strapi: ${errorText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error posting to Strapi:", error);
    throw error;
  }
};

import { api } from "./api";

// export type urlFields = {
//   originalUrl: string;
// };

async function createShortCode(originalUrl: string) {
  try {
    console.log(originalUrl);
    const { data } = await api.post("/api/url", {
      originalUrl,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const urlServer = { createShortCode };

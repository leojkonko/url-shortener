import { api } from "./api";

async function createShortCode(originalUrl: string) {
  try {
    const { data } = await api.post("/api/url", {
      originalUrl,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

async function getRedirect(shortCode: string) {
  try {
    console.error(shortCode);
    const { data } = await api.get(`/api/${shortCode}`);

    return data;
  } catch (error) {
    throw error;
  }
}

export const urlServer = { createShortCode, getRedirect };

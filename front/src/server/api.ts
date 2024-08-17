import axios from "axios";
import API_BASE from "../../env.ts";

export const api = axios.create({
  baseURL: `${API_BASE}`,
});

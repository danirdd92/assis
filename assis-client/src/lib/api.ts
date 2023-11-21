import axios from "axios";
import type { Product } from "@lib/types";

axios.defaults.baseURL = "http://localhost:3000/api";

const get = <T>(url: string, signal: AbortSignal) =>
  axios
    .get(url, { signal })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    }) as Promise<T>;

const api = {
  getProducts: (signal: AbortSignal) => get<Product[]>("/products", signal),
};

export default api;

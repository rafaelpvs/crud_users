import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_FRONT_API_BASE_URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

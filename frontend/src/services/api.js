import axios from "axios";

const api = axios.create({
  baseURL: "https://gesture-puzzle-backend.onrender.com",
});

export default api;
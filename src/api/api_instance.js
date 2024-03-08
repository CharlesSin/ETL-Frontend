import axios from "axios";

const instance = axios.create({
  baseURL: "https://nest-backend-pxkl.onrender.com",
  headers: {
    "Content-Type": "application/json",
    timeout: 15000,
  },
});

export default instance;

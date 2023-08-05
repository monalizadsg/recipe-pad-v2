import axios from "axios";
import { getToken } from "../auth/authService";

const instance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.API_URL,
  // baseURL: import.meta.env.REACT_APP_API_URL,
  // baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(function (config) {
  let accessToken = getToken();
  // console.log(accessToken);
  if (accessToken && accessToken !== "") {
    config.headers["x-auth-token"] = accessToken;
  }
  return config;
});

export default instance;

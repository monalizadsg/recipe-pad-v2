import axios from "axios";
import { getToken } from "../auth/authService";

const instance = axios.create({
  // baseURL: `${import.meta.env.REACT_APP_API_URL}`,
  baseURL: "http://localhost:3001",
});

instance.interceptors.request.use(function (config) {
  let accessToken = getToken();
  // console.log(accessToken);
  if (accessToken && accessToken !== "") {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default instance;

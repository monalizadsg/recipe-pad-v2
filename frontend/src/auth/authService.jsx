// import { userData } from "../data/User";
import jwtDecode from "jwt-decode";
import api from "../commons/api";
const TOKEN_KEY = "jwt";

export const register = async (firstName, lastName, email, password) => {
  console.log({ firstName, lastName, email, password });
  let result = null;
  try {
    result = await api.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
    // result.data;
    console.log({ register: result });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (email, password) => {
  const result = await api.post("/auth/login", { email, password });
  localStorage.setItem(TOKEN_KEY, result.data.accessToken);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export function getCurrentUser() {
  try {
    const token = getToken();
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

export const isAuthenticated = () => {
  const user = getCurrentUser();
  if (!user) {
    return false;
  }
  if (user.exp < Date.now() / 1000) {
    logout();
    return false;
  }
  return true;
};

import jwtDecode from "jwt-decode";
import api from "../commons/api";
const TOKEN_KEY = "jwt";

export const register = async (firstName, lastName, email, password) => {
  return api.post("/api/users", {
    firstName,
    lastName,
    email,
    password,
  });
};

export const login = async ({ email, password }) => {
  const result = await api.post("/api/auth", { email, password });
  localStorage.setItem(TOKEN_KEY, result.data.token);
  localStorage.setItem(
    "fullName",
    `${result.data.firstName} ${result.data.lastName}`
  );
  localStorage.setItem("email", result.data.email);
  localStorage.setItem("id", result.data.id);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("fullName");
  localStorage.removeItem("email");
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

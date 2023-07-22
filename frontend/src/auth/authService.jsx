import { userData } from "../data/User";

export const isAuthenticated = () => {  
  if (userData.length > 0) return true;
  return false;
};

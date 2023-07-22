import { Navigate, Outlet } from "react-router-dom";
import UserAppContainer from "./UserAppContainer";
import { isAuthenticated } from "../auth/authService";

function PrivateRoute({ children }) {
  // TODO: implement authentication check
  if (!isAuthenticated()) {
    return <Navigate to='/login' />;
  }

  return children ? (
    children
  ) : (
    <UserAppContainer>
      <Outlet />
    </UserAppContainer>
  );
}

export default PrivateRoute;

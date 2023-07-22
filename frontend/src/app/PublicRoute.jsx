import { Outlet } from "react-router-dom";
import LandingAppContainer from "./LandingAppContainer";

function PublicRoute({ children }) {
  return children ? (
    children
  ) : (
    <LandingAppContainer>
      <Outlet />
    </LandingAppContainer>
  );
}

export default PublicRoute;

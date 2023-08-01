import { Flex, Button } from "@chakra-ui/react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth/authService";
import { ProfileMenu } from "./ProfileMenu";

function Header() {
  const navigate = useNavigate();

  const userAuthenticated = isAuthenticated();

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      bgColor="#FAECED"
      p="20px"
    >
      <Flex w="80%" justifyContent="space-between" alignItems="center">
        <Logo />
        <Navigation />
        <Flex flex={1} justifyContent="flex-end">
          {console.log(userAuthenticated)}
          {userAuthenticated ? (
            <ProfileMenu />
          ) : (
            <Button
              color="#fff"
              bgColor="#FE7071"
              p="0 30px"
              borderRadius={30}
              _hover={{ opacity: 0.8 }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;

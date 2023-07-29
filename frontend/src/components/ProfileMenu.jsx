import React from "react";
import {
  useDisclosure,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuDivider,
  Image,
  Stack,
  Avatar,
  Text,
} from "@chakra-ui/react";
import dashboardLogo from "../assets/dashboard.png";
import logoutLogo from "../assets/logout.png";
import profileLogo from "../assets/profile.png";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../auth/authService";

export const ProfileMenu = () => {
  const [username, setUsername] = useState(null);
  const [useremail, setUseremail] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("fullName");
    const email = localStorage.getItem("email");
    setUsername(name);
    setUseremail(email);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isRecipesRoute = location.pathname === "/recipes";

  return (
    <Menu isOpen={isOpen} placement="bottom-start">
      <MenuButton onMouseEnter={onOpen} onMouseLeave={onClose}>
        <Avatar name={username} bg={isRecipesRoute ? "#FFBE73" : "#FE7071"} />
      </MenuButton>
      <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
        <MenuGroup>
          <MenuItem justifyContent="center">
            <Stack
              display="flex"
              alignItems="center"
              justifyContent="center"
              spacing="1px"
              h="60px"
            >
              <Image boxSize="1.5rem" src={profileLogo} mr="12px" />
              <Text>{username}</Text>
              <Text fontSize="sm">{useremail}</Text>
            </Stack>
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <MenuItem padding="0 0 0 30px" h="30px">
            <Image boxSize=".85rem" src={dashboardLogo} mr="12px" />
            <NavLink to="/recipes" _hover={{ fontWeight: 700 }}>
              <Text>Dashboard</Text>
            </NavLink>
          </MenuItem>
          <MenuItem padding="0 0 0 27px" h="30px" onClick={handleLogout}>
            <Image boxSize="1.2rem" src={logoutLogo} mr="10px" />
            <Text fontSize="md">Logout</Text>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

import { Flex, Image, List, ListItem, Text } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import recipe from "../assets/recipes_nav_icon.png";
import favorite from "../assets/favorite_nav_icon.png";
import myRecipe from "../assets/my_recipe_nav_icon.png";
import food from "../assets/salad_icon.png";
import logoutImg from "../assets/logout.png";
import { logout } from "../auth/authService";
import Logo from "./Logo";
import { useEffect, useState } from "react";

const menu = [
  {
    title: "Recipes",
    path: "/recipes",
    icon: recipe,
  },
  {
    title: "Favorites",
    path: "/favorites",
    icon: favorite,
  },
  {
    title: "My Recipes",
    path: "/my-recipes",
    icon: myRecipe,
  },
];

function SideNav() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("fullName");
    setUsername(name);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Flex
      flexDir='column'
      // border='1px solid red'
      w='20%'
      bg='#fff2d5'
      borderRadius={8}
      justifyContent='space-between'
    >
      <Flex pt={8} flexDir='column' alignItems='center'>
        <Logo />
        <List width='100%' mt={10} ml={14}>
          {menu.map(({ title, path, icon }) => (
            <NavLink
              key={title}
              to={path}
              style={({ isActive }) => ({
                color: isActive ? "#FF8F0D" : "unset",
                fontWeight: isActive ? 700 : "unset",
              })}
            >
              <ListItem padding={4}>
                <Flex pl={8} justifyContent='start' alignItems='center' gap={2}>
                  <Image src={icon} h='20px' w='20px' />
                  <Text fontSize='lg'> {title}</Text>
                </Flex>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Flex>
      <Flex
        m={8}
        p={2}
        bg='#FFBE73'
        flexDir='column'
        alignItems='center'
        position='relative'
        minHeight='auto'
        borderRadius='16px'
        gap={3}
      >
        <Image
          src={food}
          h='100px'
          width='100px'
          style={{
            position: "absolute",
            top: "-70px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <Flex flexDir='column' alignItems='center' mt='40px'>
          <Text fontSize='lg'>Welcome,</Text>
          <Text as='b' fontSize='lg'>
            {username}
          </Text>
        </Flex>
        <Flex
          justifyContent='start'
          alignItems='center'
          gap={2}
          mb={3}
          onClick={handleLogout}
          cursor='pointer'
        >
          <Image src={logoutImg} h='20px' w='20px' />
          <Text _hover={{ fontWeight: 700 }}>Logout</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SideNav;

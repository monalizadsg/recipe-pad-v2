import { Flex, Image, List, ListItem, Text } from "@chakra-ui/react";
import recipe from "../assets/recipes_nav_icon.png";
import favorite from "../assets/favorite_nav_icon.png";
import myRecipe from "../assets/my_recipe_nav_icon.png";
import food from "../assets/salad_icon.png";
import logout from "../assets/logout.png";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

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
                  <Text> {title}</Text>
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
            Your Name
          </Text>
        </Flex>
        <Flex justifyContent='start' alignItems='center' gap={2} mb={3}>
          <Image src={logout} h='20px' w='20px' />
          <Text>Logout</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SideNav;

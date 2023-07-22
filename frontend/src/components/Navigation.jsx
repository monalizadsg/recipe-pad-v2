import { Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <Flex flex='10%' justifyContent='space-evenly'>
      <NavLink
        to='/'
        style={({ isActive }) => ({
          color: isActive ? "#ff6a6a" : "unset",
        })}
      >
        <Text fontSize='md' fontWeight='semibold'>
          Home
        </Text>
      </NavLink>
      <NavLink
        to='/recipe-index'
        style={({ isActive }) => ({
          color: isActive ? "#ff6a6a" : "unset",
        })}
      >
        <Text fontSize='md' fontWeight='semibold'>
          Recipes
        </Text>
      </NavLink>
      <NavLink
        to='/about-us'
        style={({ isActive }) => ({
          color: isActive ? "#ff6a6a" : "unset",
        })}
      >
        <Text fontSize='md' fontWeight='semibold'>
          About Us
        </Text>
      </NavLink>
    </Flex>
  );
}

export default Navigation;

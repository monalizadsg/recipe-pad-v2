import { Flex, Text } from "@chakra-ui/react";
import Logo from "./Logo";

function Footer() {
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      bgColor='#FAECED'
      p='20px'
    >
      <Flex w='80%' justifyContent='center'>
        <Logo />
        <Text fontWeight={600}>&copy; 2023 RecipePad Devs Team</Text>
      </Flex>
    </Flex>
  );
}

export default Footer;
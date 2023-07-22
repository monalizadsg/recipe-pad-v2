import { Flex, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import recipeLogo from "../assets/logo.png";

function Logo() {
  const navigate = useNavigate();
  return (
    <Flex
      alignItems='center'
      gap={2}
      flex={1}
      pr='4px'
      onClick={() => navigate("/")}
      cursor='pointer'
    >
      <Image boxSize='40px' src={recipeLogo} alt='Recipe logo' />
      <Text fontFamily='Inter' fontWeight={800} fontSize='xl'>
        Recipe<span style={{ color: "#FF9417" }}>Pad</span>
      </Text>
    </Flex>
  );
}

export default Logo;

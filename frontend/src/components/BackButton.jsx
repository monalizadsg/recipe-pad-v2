import { Flex, Text, Image } from "@chakra-ui/react";
import leftChevron from "../assets/left-chevron.png";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  return (
    <Flex
      alignItems='center'
      gap={2}
      cursor='pointer'
      _hover={{ textDecor: "underline" }}
      onClick={() => navigate(-1)}
    >
      <Image boxSize='15px' src={leftChevron} alt='' />
      <Text fontWeight={600} fontSize='md'>
        Back to previous page
      </Text>
    </Flex>
  );
}

export default BackButton;

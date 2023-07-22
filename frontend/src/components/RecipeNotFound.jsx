import { Container, VStack, Image, Text } from "@chakra-ui/react";
import notFound from "../assets/not_found.png";

function RecipeNotFound() {
  return (
    <Container h='66.5vh'>
      <VStack spacing='0px' marginTop='60px'>
        <Image
          src={notFound}
          alt='Not Found'
          boxSize={120}
          marginBottom='10px'
        />
        <Text>No recipes found.</Text>
        <Text>Please try another search.</Text>
      </VStack>
    </Container>
  );
}

export default RecipeNotFound;

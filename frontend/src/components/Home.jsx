import { Flex } from "@chakra-ui/react";
import Hero from "./Hero";
import Recipes from "./Recipes";
import ContactUs from "./ContactUs";

function Home() {
  return (
    <Flex flexDir='column'>
      <Hero />
      <Flex
        justifyContent='center'
        alignItems='center'
        margin={"15px 0px 25px 0px"}
      >
        <Recipes />
      </Flex>
      <Flex
        justifyContent='center'
        alignItems='center'
        margin={"15px 0px 25px 0px"}
      >
        <ContactUs />
      </Flex>
    </Flex>
  );
}

export default Home;

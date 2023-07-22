import { Flex } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function LandingAppContainer(props) {
  return (
    <Flex flexDir='column' justifyContent='space-between'>
      <Header />
      {props.children}
      <Footer />
    </Flex>
  );
}

export default LandingAppContainer;

import { Flex } from "@chakra-ui/react";
import SideNav from "../components/SideNav";

function UserAppContainer(props) {
  return (
    <Flex
      flexDir='column'
      h='100vh'
      margin='0 auto'
      w={{ base: "100vw", xl: "90vw" }}
      alignItems='center'
    >
      <Flex
        flex={1}
        // border='1px solid red'
        w='100%'
        p='30px'
        gap={10}
        h='100%'
      >
        <SideNav />
        <Flex flexDir='column' h='100%' flexGrow={1} w='80%'>
          {props.children}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default UserAppContainer;

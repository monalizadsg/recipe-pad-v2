import { Flex } from "@chakra-ui/react";

function ScrollContainer({ children }) {
  return (
    <Flex
      flexDir='column'
      className='scroll-container'
      w='100%'
      padding={2}
      overflowY='auto'
      maxH='calc(100vh - 60px)'
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
        // "&::-webkit-scrollbar": {
        //   width: "6px",
        //   backgroundColor: `rgba(0, 0, 0, 0.05)`,
        // },
        // "&::-webkit-scrollbar-track": {
        //   w: "6px",
        // },
        // "&::-webkit-scrollbar-thumb": {
        //   borderRadius: "10",
        //   bg: "#ffcf97",
        // },
        // "&::-webkit-scrollbar-thumb:hover": {
        //   bg: "#ffb875",
        // },
      }}
    >
      {children}
    </Flex>
  );
}

export default ScrollContainer;

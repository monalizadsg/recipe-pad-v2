import { useState } from "react";
import {
  Flex,
  Image,
  Stack,
  VStack,
  Heading,
  Box,
  Button,
  Link,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import loginPortrait from "../assets/login_food_portrait.jpg";
import PasswordInput from "../components/PasswordInput";
import TextInput from "../components/TextInput";
import { useNavigate } from "react-router-dom";
import { login } from "./authService";
import Logo from "../components/Logo";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: update authentication
    try {
      await login(user);
      navigate("/recipes");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Grid
      templateRows="10% 90%"
      templateColumns="50% 50%"
      gap={1}
      w="100%"
      h="100vh"
      border="1px solid red"
      overflow={"hidden"}
    >
      <GridItem rowSpan={1} colSpan={1}>
        <Flex marginTop="30px" marginLeft="30px">
          <Logo />
        </Flex>
      </GridItem>
      <GridItem rowSpan={2} colSpan={1}>
        <Image objectFit="cover" src={loginPortrait} h="100vh" w="100%" />
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <Flex
          w="100%"
          alignItems="center"
          justifyContent="center"
          marginLeft="25px"
        >
          <Box
            w="60%"
            borderWidth="1px"
            p={8}
            borderRadius={10}
            boxShadow="xs"
            marginTop={"80px"}
          >
            <Stack
              flexDir="column"
              mb="2"
              justifyContent="center"
              alignItems="center"
            >
              <Heading as="h3" size="lg">
                Sign in
              </Heading>
              <Box w="100%" mt={8}>
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4}>
                    <TextInput
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="johnsmith@gmail.com"
                      onChange={handleInputChange}
                      isRequired
                    />
                    <PasswordInput onChange={handleInputChange} />
                  </VStack>
                  <Button
                    bgColor="#FE7071"
                    width="full"
                    mt={10}
                    borderRadius={8}
                    type="submit"
                    color="#fff"
                    _hover={{ bgColor: "#fe6062" }}
                  >
                    Login
                  </Button>
                </form>
              </Box>
            </Stack>
            <Box textAlign="center" mt={4} mb={2}>
              Not a member?{" "}
              <Link as="b" color="#fe6062" onClick={() => navigate("/sign-up")}>
                Sign up
              </Link>
            </Box>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default Login;

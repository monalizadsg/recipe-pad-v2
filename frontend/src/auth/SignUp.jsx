import { useState } from "react";
import {
  Flex,
  Image,
  Stack,
  VStack,
  Heading,
  Text,
  Box,
  Button,
  HStack,
  Link,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import loginPortrait from "../assets/login_food_portrait.jpg";
import PasswordInput from "../components/PasswordInput";
import TextInput from "../components/TextInput";
import { register } from "./authService";
import { CustomToast } from "../commons/utils";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

function SignUp() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState();
  const navigate = useNavigate();
  const { addToast } = CustomToast();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password } = user;
    // TODO: update authentication
    try {
      const result = await register(firstName, lastName, email, password);
      if (result.status === 201) {
        addToast({
          title: "Account created!",
          message: "Redirecting to login page...",
          type: "success",
        });
        setTimeout(navigate("/login"), 4000);
      }
    } catch (err) {
      if (err && err.response.status === 400) {
        setErrors({ email: err.response.data.message });
      }
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
      <GridItem rowSpan={2} colSpan={1}>
        <Image w="100%" h="100vh" objectFit="cover" src={loginPortrait} />
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <Flex marginTop="30px" paddingLeft={"75%"} w={"30%"}>
          <Logo />
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <Flex w="100%" alignItems="center" justifyContent="center">
          <Box
            borderWidth="1px"
            p={8}
            borderRadius={10}
            boxShadow="xs"
            marginTop={"65px"}
          >
            <Stack
              flexDir="column"
              mb="2"
              justifyContent="center"
              alignItems="center"
            >
              <Heading as="h3" size="lg">
                Sign up
              </Heading>
              <Text fontSize="lg">to enjoy all of our cool features</Text>
              <Box mt={8}>
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4}>
                    <HStack spacing={4}>
                      <TextInput
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="John"
                        onChange={handleInputChange}
                        isRequired
                      />
                      <TextInput
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Smith"
                        onChange={handleInputChange}
                      />
                    </HStack>
                    <TextInput
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="johnsmith@gmail.com"
                      onChange={handleInputChange}
                      isRequired
                    />
                    <PasswordInput onChange={handleInputChange} />
                    {errors && (
                      <Text style={{ color: "red", fontWeight: 600 }}>
                        {errors.email}
                      </Text>
                    )}
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
                    Sign Up
                  </Button>
                </form>
              </Box>
            </Stack>
            <Box textAlign="center" mt={4} mb={2}>
              Already a user?{" "}
              <Link as="b" color="#fe6062" onClick={() => navigate("/login")}>
                Login
              </Link>
            </Box>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default SignUp;

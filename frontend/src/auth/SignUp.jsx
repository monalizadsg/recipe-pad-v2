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
} from "@chakra-ui/react";
import loginPortrait from "../assets/login_food_portrait.jpg";
import PasswordInput from "../components/PasswordInput";
import TextInput from "../components/TextInput";
import { userData } from "../data/User";

import { useNavigate } from "react-router-dom";

function SignUp() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: update authentication
    userData.push(user);
    navigate("/recipes");
  };

  return (
    <Flex w='100%' h='100vh' border='1px solid red'>
      <Image w='50%' objectFit='cover' src={loginPortrait} />
      <Flex w='50%' alignItems='center' justifyContent='center'>
        <Box borderWidth='1px' p={8} borderRadius={10} boxShadow='xs'>
          <Stack
            flexDir='column'
            mb='2'
            justifyContent='center'
            alignItems='center'
          >
            <Heading as='h3' size='lg'>
              Sign up
            </Heading>
            <Text fontSize='lg'>to enjoy all of our cool features</Text>
            <Box mt={8}>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <HStack spacing={4}>
                    <TextInput
                      label='First Name'
                      name='firstName'
                      type='text'
                      placeholder='John'
                      onChange={handleInputChange}
                      isRequired
                    />
                    <TextInput
                      label='Last Name'
                      name='lastName'
                      type='text'
                      placeholder='Smith'
                      onChange={handleInputChange}
                    />
                  </HStack>
                  <TextInput
                    label='Email'
                    name='email'
                    type='email'
                    placeholder='johnsmith@gmail.com'
                    onChange={handleInputChange}
                    isRequired
                  />
                  <PasswordInput onChange={handleInputChange} />
                </VStack>
                <Button
                  bgColor='#FE7071'
                  width='full'
                  mt={10}
                  borderRadius={8}
                  type='submit'
                  color='#fff'
                  _hover={{ bgColor: "#fe6062" }}
                >
                  Sign Up
                </Button>
              </form>
            </Box>
          </Stack>
          <Box textAlign='center' mt={4} mb={2}>
            Already a user?{" "}
            <Link as='b' color='#fe6062' onClick={() => navigate("/login")}>
              Login
            </Link>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignUp;

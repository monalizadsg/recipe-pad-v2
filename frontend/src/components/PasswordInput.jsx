import { useState } from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function PasswordInput({ onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleVisibility = () => setShowPassword(!showPassword);

  return (
    <FormControl isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input
          pr='4.5rem'
          type={showPassword ? "text" : "password"}
          name='password'
          placeholder='Enter password'
          onChange={onChange}
        />
        <InputRightElement width='4.5rem'>
          <IconButton
            onClick={handleVisibility}
            bg='unset'
            _hover={{ bg: "unset" }}
            aria-label='Search database'
            icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

export default PasswordInput;

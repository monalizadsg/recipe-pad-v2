import { FormControl, FormLabel, Input } from "@chakra-ui/react";

function TextInput({ label, name, placeholder, type, onChange, isRequired }) {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </FormControl>
  );
}

export default TextInput;

import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function SearchBar({ handleSearch }) {
  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <InputGroup margin={5} width="40%">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        type="search"
        placeholder="Search"
        variant="outline"
        borderColor={"gray.300"}
        onChange={handleChange}
      />
    </InputGroup>
  );
}

export default SearchBar;

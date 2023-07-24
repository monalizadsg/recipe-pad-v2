import { useToast } from "@chakra-ui/react";

export const CustomToast = () => {
  const toast = useToast();
  // types: "success", "info", "warning", "error"

  const addToast = (newRes) => {
    toast({
      title: newRes.title,
      description: newRes.message,
      status: newRes.type,
      isClosable: true,
      duration: 3000,
    });
  };

  return { addToast };
};

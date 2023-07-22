import { VStack, Image, Link, Text, Flex, HStack } from "@chakra-ui/react";
import mailLogo from "../assets/mail.png";
import instagramLogo from "../assets/instagram.png";
import facebookLogo from "../assets/facebook.png";
import twitterLogo from "../assets/twitter.png";

function ContactUs() {
  return (
    <VStack
      width='50%'
      spacing='10px'
      alignItems='center'
      justifyContent='center'
    >
      <Flex fontWeight={"bold"}>
        <Image boxSize='25px' src={mailLogo} alt='Mail logo' />
        <Text>Contact Us</Text>
      </Flex>

      <VStack spacing='0px'>
        <Text textAlign={"center"}>
          Feel free to send us a message or inquiry to
        </Text>
        <Link href='mailto:  hello@recipepad.com' color='#FE7071'>
          hello@recipepad.com
        </Link>
        <Text textAlign={"center"}>We will reach you back soon!</Text>
      </VStack>

      <HStack spacing='24px'>
        <Link href=''>
          <Image boxSize='18px' src={instagramLogo} alt='instagram logo' />
        </Link>
        <Link href=''>
          <Image boxSize='18px' src={facebookLogo} alt='facebook logo' />
        </Link>
        <Link href=''>
          <Image boxSize='18px' src={twitterLogo} alt='twitter logo' />
        </Link>
      </HStack>
    </VStack>
  );
}

export default ContactUs;

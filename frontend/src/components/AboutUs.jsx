import {
  Flex,
  Image,
  Text,
  Center,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import mirna from "../assets/mirna.jpg";
import mona from "../assets/mona.jpg";
import renz from "../assets/renz.jpg";
import arvee from "../assets/arvee.jpg";
import bulb from "../assets/bulb.png";
import highlight from "../assets/highlight.png";
import tool from "../assets/tool.png";

function AboutUs() {
  return (
    <Center bg='white'>
      <Flex
        gap={6}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        paddingTop='40px'
      >
        <Text fontSize='5xl' fontWeight='semibold' color='#000'>
          RecipePad Team
        </Text>

        <Flex flex={4} justifyContent='center' p='20px' gap={20}>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Image borderRadius='full' boxSize='150px' src={mona} alt='mona' />
            <Text fontSize='3xl' fontWeight='semibold' color='#000'>
              Mona
            </Text>
          </Flex>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Image
              borderRadius='full'
              boxSize='150px'
              src={mirna}
              alt='mirna'
            />
            <Text fontSize='3xl' fontWeight='semibold' color='#000'>
              Mirna
            </Text>
          </Flex>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Image
              borderRadius='full'
              boxSize='150px'
              src={arvee}
              alt='arvee'
            />
            <Text fontSize='3xl' fontWeight='semibold' color='#000'>
              Arvee
            </Text>
          </Flex>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Image borderRadius='full' boxSize='150px' src={renz} alt='renz' />
            <Text fontSize='3xl' fontWeight='semibold' color='#000'>
              Renz
            </Text>
          </Flex>
        </Flex>

        <Flex flex={2} justifyContent='center' p='20px'>
          <Text fontSize='5xl' fontWeight='semibold' color='#000'>
            Inspiration
          </Text>
          <Image
            src={bulb}
            alt='bulb'
            style={{ width: "10%", height: "10%" }}
            paddingLeft='2'
            paddingTop='4'
          />
        </Flex>
        <div style={{ textAlign: "center", fontSize: "20px" }}>
          <Text
            color='#000'
            justifyContent='center'
            paddingLeft='400'
            paddingRight='400'
          >
            Inspired by the fading love for cooking in today's fast-paced world,
            our team conceived a recipe web app to reignite the joy of homemade
            meals. We aimed to create a user-friendly platform that celebrates
            culinary traditions, fosters connections between food enthusiasts,
            and encourages the sharing of recipes and memories. Driven by our
            passion for cooking, we aspired to bring people together, bridging
            the gap between cultures and uniting hearts through the love of
            cooking and delicious dishes.
          </Text>
        </div>

        <Flex flex={2} justifyContent='center' p='20px'>
          <Text fontSize='5xl' fontWeight='semibold' color='#000'>
            How we built it
          </Text>
          <Image
            src={tool}
            alt='tool'
            style={{ width: "7.5%", height: "7.5%" }}
            paddingLeft='2'
            paddingTop='3'
          />
        </Flex>
        <div style={{ textAlign: "center", fontSize: "20px" }}>
          <Text
            color='#000'
            justifyContent='center'
            paddingLeft='100'
            paddingRight='100'
          >
            Front-end: React.js, HTML5, JavaScript UI <br></br>
            Component Layout: Chakra UI <br></br>
            Backend: RESTful API (Node.js, Express.js) <br></br>
            Database: MongoDB for storing recipes, user profiles <br></br>
            Authentication: JSON Web Tokens (JWT)<br></br>
            Deployment: Render
          </Text>
        </div>

        <Flex flex={2} justifyContent='center' p='20px'>
          <Text fontSize='5xl' fontWeight='semibold' color='#000'>
            API Endpoints
          </Text>
          <Image
            src={highlight}
            alt='highlight'
            style={{ width: "10%", height: "10%" }}
            paddingLeft='2'
            paddingTop='1'
          />
        </Flex>
        <div style={{ justifyContent: "center", paddingBottom: "40px" }}>
          <Text
            color='#000'
            textAlign='left'
            paddingLeft='100'
            paddingRight='100'
            paddingBottom='5'
            fontSize='30px'
          >
            GET
            <UnorderedList textAlign='left' fontSize='20px'>
              <ListItem>
                Recipe - Searching for all or specific Recipes
              </ListItem>
              <ListItem>
                Recipe - Retrieving Recipe ID when viewing a single Recipe
              </ListItem>
              <ListItem>
                Recipe - Used to retrieve the recipes created by the current
                user logged-in
              </ListItem>
              <ListItem>
                Recipe - Used to retrieve the favorite recipes for the current
                user logged-in
              </ListItem>
              <ListItem>Users - User log-in authentication</ListItem>
            </UnorderedList>
          </Text>
          <Text
            color='#000'
            textAlign='left'
            paddingLeft='100'
            paddingRight='100'
            paddingBottom='5'
            fontSize='30px'
          >
            POST
            <UnorderedList textAlign='left' fontSize='20px'>
              <ListItem>
                Recipe - Creating Recipe from specific user account
              </ListItem>
              <ListItem>Users - User account creation</ListItem>
            </UnorderedList>
          </Text>
          <Text
            color='#000'
            textAlign='left'
            paddingLeft='100'
            paddingRight='100'
            paddingBottom='5'
            fontSize='30px'
          >
            PUT
            <UnorderedList textAlign='left' fontSize='20px'>
              <ListItem>
                Recipe - Editing Recipe from specific user account
              </ListItem>
              <ListItem>
                Favorites - Tagging a Recipe as a favorite from specific user
                account
              </ListItem>
            </UnorderedList>
          </Text>
          <Text
            color='#000'
            textAlign='left'
            paddingLeft='100'
            paddingRight='100'
            fontSize='30px'
          >
            DELETE
            <UnorderedList textAlign='left' fontSize='20px'>
              <ListItem>
                Recipe - Deleting Recipe from specific user account
              </ListItem>
              <ListItem>
                Favorites - Removing favorite tagged from specific user account
              </ListItem>
            </UnorderedList>
          </Text>
        </div>
      </Flex>
    </Center>
  );
}

export default AboutUs;

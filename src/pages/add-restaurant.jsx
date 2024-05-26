import Searchbar from "@/components/Searchbar";
import { Button, Center, Container, Heading, List, ListItem, OrderedList, Spacer, Stack, Text } from "@chakra-ui/react";

export default function addRestaurant() {
  return (
    <>
    <Center>
        <Stack>
            <Heading size='md' textAlign="center" marginY={"25px"} >
                Add the restaurants 
                <br></br>
                you want to go to!
            </Heading>

            <Text fontWeight={"semibold"}>Restaurant Name:</Text>
            <Searchbar/>
            <Text mt="25px" fontWeight={"semibold"}>Your list:</Text>
            <Container 
                width={"full"} 
                border="1px" 
                borderColor={"blackAlpha.200"}
                shadow="base"
                borderRadius={"6px"}
                paddingY="10px"
                mb="25px"
            >
                <OrderedList>
                    <ListItem>Lorem ipsum dolor sit amet</ListItem>
                    <ListItem>Consectetur adipiscing elit</ListItem>
                    <ListItem>Integer molestie lorem at massa</ListItem>
                    <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                </OrderedList>
            </Container>

            <Button colorScheme="twitter">Next</Button>
            <Button 
                borderColor="twitter.400" 
                border="2px" 
                backgroundColor="white" 
                color="twitter.400"
                _hover={{
                    background: "twitter.400",
                    borderColor: "twitter.400",
                    color: "white",
                }}
                _active={{ 

                 }}
            >
                Back
            </Button>
        </Stack> 
    </Center>    
    </>
  )
}

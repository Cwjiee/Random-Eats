import { Avatar, Container, Flex, Heading, ListItem, OrderedList } from "@chakra-ui/react";

export default function UsersList() {
  return (
    <Container 
        width={"full"} 
        border="1px" 
        borderColor={"blackAlpha.200"}
        shadow="base"
        borderRadius={"6px"}
        paddingY="10px"
        mb="25px"
        mt="25px"
    >
        <Flex alignItems={"center"} mb="10px">
            <Avatar width="40px" height={"40px"}/>
            <Heading size="md" ml="10px">Tharshen</Heading>
        </Flex>
        <OrderedList>
            <ListItem>Lorem ipsum dolor sit amet</ListItem>
            <ListItem>Consectetur adipiscing elit</ListItem>
            <ListItem>Integer molestie lorem at massa</ListItem>
            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
        </OrderedList>
    </Container>
  )
}

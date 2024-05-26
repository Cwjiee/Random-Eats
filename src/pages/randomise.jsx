import {
  Box,
  UnorderedList,
  Flex,
  VStack,
  Tag,
  TagLabel,
  useToast,
  Button,
  TagCloseButton,
  TagLeftIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Heading,
  TagRightIcon,
  Center,
  HStack,
  Stack,
  Spacer,
  Container,
  OrderedList,
  ListItem,
  Icon,
  Avatar,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { apiHandler } from "@/utils/apiHandler";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import RandomiseResult from "@/components/RandomiseResults";
import UsersList from "@/components/UsersList";

export default function Randomise() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const toast = useToast();
  // const [users, setUsers] = useState([]);
  // const [selectedUsers, setSelectedUsers] = useState([]);

  // const handleClick = (e) => {
  //   const name = e.target.innerText;
  //   const user = users.find((user) => user.name === name);
  //   if (selectedUsers.some((user) => user.name === name)) {
  //     toast({ title: "User already added!", status: "error" });
  //     return;
  //   }
  //   setSelectedUsers([...selectedUsers, user]);
  // };

  // const handleRemove = (e) => {
  //   const selectedName = e.target.parentElement.parentElement.innerText;
  //   const newSelectedUsers = selectedUsers.filter(
  //     (user) => user.name !== selectedName
  //   );
  //   setSelectedUsers(newSelectedUsers);
  // };

  // useEffect(() => {
  //   (async () => {
  //     let response = await apiHandler.getUsersData();
  //     setUsers(response);
  //   })();
  // }, []);

  return (
    <>
    <Center mt="15px">
       <Box width="500px">
        <Flex justifyContent={"center"} alignItems={"center"} height="100%" direction="column">
          <Heading textAlign={"center"} size="lg">Once everyone has</Heading>
          <Heading size="lg">chosen, randomise!</Heading>
          <Container 
            width={"full"} 
            border="1px" 
            borderColor={"blackAlpha.200"}
            shadow="base"
            borderRadius={"6px"}
            paddingY="10px"
            mb="25px"
            mt="25px"
            height="375px"
            overflowY={"scroll"}
          >
            <UsersList/>
            <UsersList/>
          </Container>
          <Button colorScheme="twitter" width="full" mb="10px">Randomise!</Button>
          <Button
            width="full"
            borderColor="twitter.400"
            border="2px"
            backgroundColor="white"
            color="twitter.400"
            _hover={{
              background: "twitter.400",
              borderColor: "twitter.400",
              color: "white",
            }}
            _active={{}}
          >
            Edit my List
          </Button>
        </Flex>
      </Box>
    </Center>
      
    </>
  );
}

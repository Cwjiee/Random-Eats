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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { apiHandler } from "@/utils/apiHandler";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import RandomiseResult from "@/components/RandomiseResults";

export default function Randomise() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleClick = (e) => {
    const name = e.target.innerText;
    const user = users.find((user) => user.name === name);
    if (selectedUsers.some((user) => user.name === name)) {
      toast({ title: "User already added!", status: "error" });
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
  };

  const handleRemove = (e) => {
    const selectedName = e.target.parentElement.parentElement.innerText;
    const newSelectedUsers = selectedUsers.filter(
      (user) => user.name !== selectedName
    );
    setSelectedUsers(newSelectedUsers);
  };

  useEffect(() => {
    (async () => {
      let response = await apiHandler.getUsers();
      for (let user in response) {
        response[user].name = response[user].name.toLowerCase();
      }
      setUsers(response);
    })();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} placement="bottom" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <RandomiseResult selectedUsers={selectedUsers} />
        </ModalContent>
      </Modal>
      <Flex w="100%" h="75vh">
        <VStack w="50%">
          <Box fontSize={25}>Users</Box>
          <UnorderedList>
            {users.map((user) => (
              <Box key={v4()}>
                <Tag
                  size="lg"
                  colorScheme="cyan"
                  borderRadius="full"
                  onClick={handleClick}
                  _hover={{ cursor: "pointer" }}
                >
                  <TagLabel>{user.name}</TagLabel>
                </Tag>
              </Box>
            ))}
          </UnorderedList>
        </VStack>
        <VStack w="50%" h="100%" position="relative">
          <Box fontSize={25}>Selected Users</Box>
          <UnorderedList>
            {selectedUsers.map((user) => (
              <Tag key={v4()} size="lg" colorScheme="green" borderRadius="full">
                <TagLabel>{user.name}</TagLabel>
                <TagCloseButton onClick={handleRemove} />
              </Tag>
            ))}
          </UnorderedList>
          <Button
            colorScheme="messenger"
            w="15%"
            h={6}
            p={4}
            position="absolute"
            bottom={0}
            onClick={onOpen}
          >
            Start
          </Button>
        </VStack>
      </Flex>
    </>
  );
}

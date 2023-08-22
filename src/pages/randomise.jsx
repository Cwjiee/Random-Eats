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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
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
      let result = await apiHandler.getUsers();
      let response = result.data();
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
      <Flex w="100%" h="75vh" justifyContent="space-between">
        <VStack w="50%">
          <Heading fontSize="xl">All Users</Heading>
          <Flex flexDirection="column" gap={3}>
            {users.map((user) => (
              <Tag
                key={v4()}
                size="lg"
                colorScheme="messenger"
                borderRadius="full"
                justifyContent="space-between"
                variant="outline"
                py="8px"
                onClick={handleClick}
                _hover={{
                  cursor: "pointer",
                  textColor: "white",
                  backgroundColor: "#3a83ff",
                }}
              >
                <TagLabel>{user.name}</TagLabel>
                <TagRightIcon boxSize="12px" as={AddIcon} />
              </Tag>
            ))}
          </Flex>
        </VStack>
        <VStack w="50%" h="100%">
          <Heading fontSize="xl">Selected Users</Heading>
          <Flex flexDirection="column" gap={3}>
            {selectedUsers.map((user) => (
              <Tag
                key={v4()}
                size="lg"
                colorScheme="green"
                borderRadius="full"
                justifyContent="center"
                variant="solid"
                py="8px"
                w="full"
              >
                <TagLabel>{user.name}</TagLabel>
                <TagCloseButton onClick={handleRemove} />
              </Tag>
            ))}
          </Flex>
        </VStack>
        <Button
          colorScheme="messenger"
          w="20%"
          h={6}
          p={4}
          position="absolute"
          bottom="10%"
          right="40%"
          onClick={onOpen}
        >
          Start
        </Button>
      </Flex>
    </>
  );
}

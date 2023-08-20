import {
  Box,
  UnorderedList,
  ListItem,
  Flex,
  VStack,
  Tag,
  TagLabel,
  useToast,
} from "@chakra-ui/react";
import { apiHandler } from "@/utils/apiHandler";
import { useState, useEffect } from "react";
import { v4 } from "uuid";

export default function Randomise() {
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
      <Flex w="100%">
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
        <VStack w="50%">
          <Box fontSize={25}>Selected Users</Box>
          <UnorderedList>
            {selectedUsers.map((user) => (
              <Tag
                key={v4()}
                size="lg"
                colorScheme="cyan"
                borderRadius="full"
                onClick={handleClick}
              >
                <TagLabel>{user.name}</TagLabel>
              </Tag>
            ))}
          </UnorderedList>
        </VStack>
      </Flex>
    </>
  );
}

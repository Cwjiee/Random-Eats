import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { useState, useEffect } from "react";
import router from "next/router";
import { Button, Box, Flex, Spinner } from "@chakra-ui/react";
import { apiHandler } from "@/utils/apiHandler";
import { v4 } from "uuid";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [choices, setChoices] = useState([]);

  const toListPage = () => {
    router.push("/list");
  };

  const toRandomisePage = () => {
    router.push("/randomise");
  };

  useEffect(() => {
    if (user) {
      (async () => {
        const response = await apiHandler.getUserChoices(user.uid);
        setChoices(response);
      })();
    }
  }, [user]);

  return user ? (
    <>
      <Box>
        <Heading size="xl">List</Heading>
        <Table mt={5}>
          <Thead>
            <Tr>
              <Th>NAME</Th>
              <Th>HALAL</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {choices.map((choice) => (
              <Tr key={v4()}>
                <Td>{choice.name}</Td>
                <Td>{choice.halal}</Td>
                <Td>
                  <DeleteIcon />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Flex direction="row" gap={5} mt={10} justifyContent="space-between">
        <Button colorScheme="messenger" onClick={toListPage}>
          modify
        </Button>
        <Button colorScheme="messenger" onClick={toRandomisePage}>
          randomise
        </Button>
      </Flex>
    </>
  ) : (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Heading size="xl">Welcome</Heading>
          <Text letterSpacing={1}>Decide where to eat now!</Text>
          <Text as="i" fontSize="sm" position="absolute" bottom={5}>
            *Login with your student acc*
          </Text>
        </>
      )}
    </>
  );
}

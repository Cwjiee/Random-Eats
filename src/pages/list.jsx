import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Radio,
  RadioGroup,
  useToast,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { apiHandler } from "@/utils/apiHandler";
import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Searchbar from "@/components/Searchbar";

export default function List() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (user) {
      setName(user.displayName);
    }
  }, [user]);

  const [halal, setHalal] = useState("false");
  const [restaurants, setRestaurants] = useState("");
  const [choices, setChoices] = useState([]);

  const handleSubmit = async () => {
    console.log(restaurants, halal);
    await apiHandler.addUserChoices(
      { id: user.uid, name: user.displayName },
      { name: restaurants, halal: halal }
    );
    setChoices([...choices, { name: restaurants, halal: halal }]);
    setRestaurants("");
    toast({ title: "Restaurant submitted!", status: "success" });
  };

  const handleSearch = async () => {
    const result = await apiHandler.getRestaurant(restaurants);
    const response = result.data();
    console.log(response);
    if (response.name.length === 0) {
      toast({ title: "No restaurant found!", status: "error" });
    } else if (choices.some((choice) => choice.name === restaurants)) {
      toast({ title: "Restaurant already added!", status: "error" });
    } else {
      await apiHandler.addExistingChoice(
        { id: user.uid, name: user.displayName },
        { id: result.id, name: restaurants, halal: halal }
      );
      setChoices([...choices, { name: restaurants, halal: halal }]);
      setRestaurants("");
      toast({ title: "Restaurant submitted!", status: "success" });
    }
  };

  useEffect(() => {
    (async () => {
      const response = await apiHandler.getUserChoices(user.uid);
      setChoices(response);
    })();
  }, [user]);

  return (
    <>
      <Flex w="100%" flexDirection="column" gap={10}>
        <Tabs w="100%">
          <TabList>
            <Tab>Search</Tab>
            <Tab>Add</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap={5}
              >
                <Searchbar
                  choices={choices}
                  restaurants={restaurants}
                  setRestaurants={setRestaurants}
                />
                <Button
                  colorScheme="messenger"
                  w="20%"
                  h={6}
                  p={4}
                  onClick={() => handleSearch()}
                >
                  add
                </Button>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap={5}
              >
                <Input
                  onChange={(e) => setRestaurants(e.target.value)}
                  value={restaurants}
                />
                <Button
                  colorScheme="messenger"
                  w="20%"
                  h={6}
                  p={4}
                  onClick={() => handleSubmit()}
                >
                  add
                </Button>
              </Flex>

              <RadioGroup onChange={setHalal} value={halal}>
                <Stack direction="row">
                  <Radio value="true">Non Halal</Radio>
                  <Radio value="false">Halal</Radio>
                </Stack>
              </RadioGroup>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Box>
          <Table mb={10}>
            <Thead>
              <Tr>
                <Th>NAME</Th>
                <Th>HALAL</Th>
              </Tr>
            </Thead>
            <Tbody>
              {choices.map((choice) => (
                <Tr key={v4()}>
                  <Td>{choice.name}</Td>
                  <Td>{choice.halal}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </>
  );
}

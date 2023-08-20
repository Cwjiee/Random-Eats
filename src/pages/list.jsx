import {
  Box,
  UnorderedList,
  ListItem,
  Link,
  Button,
  Flex,
  VStack,
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
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { apiHandler } from "@/utils/apiHandler";
import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Searchbar from "@/components/Searchbar";

export default function List() {
  const [user, loading, error] = useAuthState(auth);
  const toast = useToast();
  const name = user.displayName;

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
    const response = result.data()
    console.log(response);
    if (response.name.length === 0) {
      toast({ title: "No restaurant found!", status: "error" });
    } else if (choices.some((choice) => choice.name === restaurants)) {
      toast({ title: "Restaurant already added!", status: "error" });
    } else {
      await apiHandler.addExistingChoice(
        { id: user.uid, name: user.displayName },
        { id: result.id ,name: restaurants, halal: halal }
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
  }, []);

  return (
    <>
      <Flex w="100%">
        <VStack w="50%">
          <Box m={15}>
            <Box fontSize={25}>{name.toLowerCase()} Items</Box>
            <UnorderedList>
              {choices.map((choice) => (
                <ListItem key={v4()}>{choice.name}</ListItem>
              ))}
            </UnorderedList>
          </Box>
        </VStack>
        <VStack w="50%" h="100%">
          <Tabs w="80%">
            <TabList>
              <Tab>Search</Tab>
              <Tab>Add</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box fontSize={25}>Add new items</Box>
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
                  position="absolute"
                  bottom={40}
                >
                  add
                </Button>
              </TabPanel>
              <TabPanel>
                <Input
                  onChange={(e) => setRestaurants(e.target.value)}
                  value={restaurants}
                />
                <RadioGroup onChange={setHalal} value={halal}>
                  <Stack direction="row">
                    <Radio value="true">Non Halal</Radio>
                    <Radio value="false">Halal</Radio>
                  </Stack>
                </RadioGroup>
                <Button
                  colorScheme="messenger"
                  w="20%"
                  h={6}
                  p={4}
                  onClick={() => handleSubmit()}
                  position="absolute"
                  bottom={40}
                >
                  add
                </Button>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Flex>
    </>
  );
}

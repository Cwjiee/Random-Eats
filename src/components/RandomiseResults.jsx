import { Heading, Spinner, Text } from "@chakra-ui/react";
import { apiHandler } from "@/utils/apiHandler";
import { useState, useEffect } from "react";
import { v4 } from "uuid";
import randomise from "@/utils/randomise";

export default function RandomiseResult({ selectedUsers }) {
  const [userData, setUserData] = useState([]);
  const [restaurants, setRestaurants] = useState([{ id: "", res: [] }]);
  const [randomised, setRandomised] = useState("");

  useEffect(() => {
    (async () => {
      let arr = [];
      for (let i = 0; i < selectedUsers.length; i++) {
        const name = selectedUsers[i].name.toUpperCase();
        const data = await apiHandler.getUserChoicesByName(name);
        arr.push(data);
      }
      setUserData([...arr]);
    })();
  }, [selectedUsers]);

  useEffect(() => {
    if (userData) {
      (async () => {
        let arr = [];
        for (let i = 0; i < userData.length; i++) {
          for (let j = 0; j < userData[i].restaurants.length; j++) {
            const data = await apiHandler.getRestaurantFromId(
              userData[i].restaurants[j]
            );
            if (data.name !== undefined) {
              const result = { id: i, res: data.name };
              arr.push(result);
            }
            setRestaurants([...arr]);
          }
        }
      })();
    }
  }, [userData]);

  useEffect(() => {
    let arr = [];
    if (restaurants) {
      for (let i = 0; i < restaurants.length; i++) {
        arr.push(restaurants[i].res);
      }
      const data = randomise(arr);
      setRandomised(data);
    }
  }, [restaurants]);

  return userData.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <Heading>Results</Heading>
      <Text fontSize="xl">{randomised}</Text>
    </>
  );
}

import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Center,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Search from "../../public/search.svg";
import { v4 } from "uuid";
import Fuse from "fuse.js";
import { useState, useEffect } from "react";
import { apiHandler } from "../utils/apiHandler";

export default function Searchbar({ restaurants, setRestaurants }) {
  const [searchResult, setSearchResult] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const fuseOptions = {
    keys: ["name"],
  };
  const fuse = new Fuse(allRestaurants, fuseOptions);

  const handleClick = (e) => {
    setRestaurants(e.target.innerText);
    setSearchResult([]);
  };

  useEffect(() => {
    (async () => {
      const result = await apiHandler.getRestaurants();
      for (let i = 0; i < result.length; i++) {
        const update = result[i];
        setAllRestaurants((curr) => [...curr, update]);
      }
    })();
  }, []);

  useEffect(() => {
    (() => {
      setSearchResult(fuse.search(restaurants));
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurants]);

  return (
    <Box w="100%" position="relative">
      <InputGroup>
        <InputLeftElement>
          <Image src={Search} alt="search-icon" />
        </InputLeftElement>
        <Input
          value={restaurants}
          placeholder="Search..."
          borderRadius={"6px"}
          boxShadow={"base"}
          onChange={(e) => {
            setRestaurants(e.target.value);
          }}
        />
      </InputGroup>
      {searchResult.length > 0 && (
        <Center position={"absolute"} zIndex={2} w="100%" top="45px">
          <VStack
            bg="white"
            w="95%"
            borderRadius={"20px"}
            p="10px"
            gap="10px"
            boxShadow={"md"}
            maxH="300px"
            overflow={"auto"}
          >
            {searchResult.map((i) => (
              <Box
                key={v4()}
                w="100%"
                css={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#eee",
                  },
                }}
                p="5px 10px"
                borderRadius={"5px"}
                onClick={handleClick}
              >
                {i.item.name}
              </Box>
            ))}
          </VStack>
        </Center>
      )}
    </Box>
  );
}

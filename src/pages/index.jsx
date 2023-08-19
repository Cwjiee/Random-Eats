import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { useState, useEffect } from "react";
import router from "next/router";
import Navbar from "@/components/Navbar";
import { toast, Button, UnorderedList, ListItem, Box  } from "@chakra-ui/react";
import { apiHandler } from "@/utils/apiHandler";
import { v4 } from "uuid";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [choices, setChoices] = useState([]);

  const toListPage = () => {
    router.push("/list")
  }

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } 

    if (user){
      (async ()=> {
        const response = await apiHandler.getUserChoices(user.uid)
        setChoices(response)
      })();
    } 
  }, [user])

  return (
    <>
      
      <Box>
        <Box fontSize={25}>My List</Box>
        <UnorderedList>
          {choices.map((choice) => (
            <ListItem key={v4()}>{choice.name}</ListItem>
          ))}
        </UnorderedList>
      </Box>
      
      <Button colorScheme='messenger' onClick={toListPage}>modify</Button>
    </>
  ) 
  // : (
  //   <>
  //     <Navbar />
  //     <Tag>{user}</Tag>
  //     <Link my={10} href="/login">login page</Link><br />
  //   </>
  // );
}

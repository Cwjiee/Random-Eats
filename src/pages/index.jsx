import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { useState, useEffect } from "react";
import router from "next/router";
import { 
  Button, 
  Box, 
  Flex, 
  Spinner, 
  AbsoluteCenter, 
  Card, 
  CardBody, 
  Divider, 
  Heading,
  Text,
  Stack
} from "@chakra-ui/react";
import { apiHandler } from "@/utils/apiHandler";
import { GoogleAuthProvider } from "firebase/auth";
import GoogleIcon from "@/components/atoms/GoogleIcon";
import { v4 } from "uuid";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [choices, setChoices] = useState([]);
  const googleAuth = new GoogleAuthProvider()

  const items = [
    "hackerspace",
    "swimming",
    "hackathon"
  ]

  const toListPage = () => {
    router.push("/list");
  };

  const toRandomisePage = () => {
    router.push("/randomise");
  };

  const googleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleAuth);
    } catch (err) {
      console.log(err);
    }
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
      <Box w={"full"} h={"full"} flexDirection={"column"} mt={"5"}>
        <Flex w={"full"} h={"full"} justifyContent={"center"}>
          <Button mx={"auto"} colorScheme="twitter" w={"60%"}>Create Group</Button>
        </Flex>
        <Heading mb={"10"} mt={"16"} textAlign={"left"} size={"md"}>History</Heading>
        {items.map((item) => {
          return (
            <Card key={v4()} my={"4"}>
              <CardBody>
                <Text>{item}</Text>
              </CardBody>
            </Card>
          )
        })}
      </Box>
     </>
   ) : (
    <>
      {loading ? (
        <Spinner />
      ) : (
          <>
            <Box>
              <AbsoluteCenter w={"60%"}>
                <Flex direction={"column"} gap={5}>
                  <Heading size="sm" textAlign={"center"}>Decide where to eat now!</Heading>
                  <Button onClick={googleLogin} variant={"outline"} colorScheme={"cyan"} w={"50%"} marginX={"auto"} leftIcon={<GoogleIcon />}>Login</Button>
                </Flex>
              </AbsoluteCenter>
            </Box>
          </>
        )}
    </>
  )
}

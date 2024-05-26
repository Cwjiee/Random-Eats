import {
  Flex,
  useToast,
  Button,
  Center,
  Spinner,
  Link,
} from "@chakra-ui/react";
import { auth } from "../../firebaseConfig";
import router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import RandomEatsLogo from '../../public/randomEatsLogo.svg'
import Image from "next/image";

export default function Navbar() {
  const toast = useToast();
  const [user, loading, error] = useAuthState(auth);
  const googleAuth = new GoogleAuthProvider();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast({ title: "Logout successfully", status: "success" });
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  const googleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleAuth);
    } catch (err) {
      console.log(err);
    }
  };

  const handleHomePage = () => {
    router.push("/");
  };

  if (loading)
    <Center mt="300px">
      <Spinner
        thickness="8px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#3e3bf5"
        boxSize={20}
      />
    </Center>;

  return (
    <Flex
      w="100%"
      p={4}
      color="black"
      h="10vh"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px"
      borderBottomColor="blackAlpha.300"
    >
      <Link
        href="/"
        color="white"
        fontSize={20}
        _hover={{ textDecoration: "none" }}
      >
        <Image src={RandomEatsLogo} alt="Random Eats Logo" width={80}/>
      </Link>
      {user && (
        <Button onClick={handleLogout} backgroundColor={"blackAlpha.300"}>Logout</Button>
      )}
    </Flex>
  );
}

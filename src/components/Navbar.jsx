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
      bg="#2A4365"
      w="100%"
      p={4}
      color="black"
      h="10vh"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      borderBottomRadius="xl"
    >
      <Link
        href="/"
        color="white"
        fontSize={20}
        _hover={{ textDecoration: "none" }}
      >
        Home
      </Link>
      {user ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Button onClick={googleLogin}>Login</Button>
      )}
    </Flex>
  );
}

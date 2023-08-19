import { Flex, useToast, Button } from "@chakra-ui/react"
import { auth } from "../../firebaseConfig";
import router from "next/router";

export default function Navbar(){
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast({ title: "Logout successfully", status: "success" });
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  const handleHomePage = () => {
    router.push("/")
  }

  return (
    <Flex bg="#BEE3F8" w="100%" p={4} color="black" h={50} direction="row" alignItems="center" justifyContent="space-between" >
      <Button onClick={handleHomePage}>
        back to home page
      </Button>
      <Button onClick={handleLogout}>
        Logout
      </Button>
    </Flex>
  )
}
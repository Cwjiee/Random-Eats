import Navbar from "./Navbar";
import { Box } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Box p={10} h="100%">
        {children}
      </Box>
    </>
  );
}

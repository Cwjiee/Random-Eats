import Navbar from "./Navbar";
import { Box } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <>
      <Box>
        <Navbar />
        <Box p={10}>
          {children}
        </Box>
      </Box>
      
    </>
  );
}

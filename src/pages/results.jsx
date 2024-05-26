import { AbsoluteCenter, Heading, Button, Flex, Text, Box } from "@chakra-ui/react";

export default function Results() {
  return (
    <>
      <AbsoluteCenter w={"60%"}>
        <Flex direction={"column"} gap={5}>
          <Box>
            <Text size="sm" textAlign={"center"}>You will eat at</Text>
            <Heading size="xl" textAlign={"center"}>Uncle Don!</Heading>
          </Box>
          <Button mx={"auto"} colorScheme="twitter" w={"full"}>Back to Home</Button>
        </Flex>
      </AbsoluteCenter>
    </>
  )
}

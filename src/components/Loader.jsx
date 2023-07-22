import { Box, Center, HStack, Spinner, VStack } from "@chakra-ui/react";
import { Scale } from "chart.js";
import React from "react";

const Loader = () => {
  return (
    <VStack h={"90vh"} justifyContent={"Center"}>
      <Box transform={"Scale(2)"}>
        <Spinner size={"xl"} />
      </Box>
    </VStack>
  );
};

export default Loader;

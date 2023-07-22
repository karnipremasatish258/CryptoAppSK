import { Box, Img, Text } from "@chakra-ui/react";
import React from "react";
import btc from "../assets/btc.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box w={"full"} backgroundColor={"blackAlpha.900"} h={"85vh"}>
      <motion.div
        style={{ height: "80vh" }}
        animate={{ translateY: "20px" }}
        transition={{
          duration: "1",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Img
          w={"full"}
          h={"full"}
          objectFit={"contain"}
          // filter={"grayscale(1)"}
          src={btc}
        />
      </motion.div>
      <Text
        fontSize={"4xl"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        mt={"-10"}
        textAlign={"center"}
      >
        Crypto
      </Text>
    </Box>
  );
};

export default Home;

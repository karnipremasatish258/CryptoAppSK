import {
  Avatar,
  Box,
  Center,
  Img,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import btc from "../assets/SatishPic_1.jpg";

const Footer = () => {
  return (
    <Box
      w={"full"}
      backgroundColor={"blackAlpha.900"}
      color={"whiteAlpha.700"}
      p={"4"}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"} fontSize={"medium"}>
            About Us
          </Text>
          <Text
            fontSize={"2xs"}
            w={["52", "full"]}
            textAlign={["center", "left"]}
          >
            We are the top most quality crypto currency application Developers,
            checkout the app interface
          </Text>
        </VStack>
        <VStack justifyContent={"center"}>
          <Img
            borderRadius={"full"}
            h={"20"}
            w={"24"}
            objectFit={"cover"}
            src={btc}
            mt={"4"}
          />
          <Text fontSize={"2xs"} textAlign={"center"}>
            Our Founder
          </Text>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;

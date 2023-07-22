import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const ExchangeCard = ({ name, image, rank, url }) => {
  return (
    <div>
      <a href={url} target="_blank">
        <VStack
          w={"52"}
          p={"8"}
          shadow={"xl"}
          borderRadius={"lg"}
          bgColor={"gray.100"}
          transition={"all 0.3s"}
          m={"4"}
          css={{ "&:hover": { transform: "scale(1.1)" } }}
        >
          <Image
            src={image}
            w={"10"}
            h={"10"}
            objectFit={"contain"}
            alt={"exchange"}
          />
          <Heading size={"md"} noOfLines={1}>
            {rank}
          </Heading>
          <Text size={"md"} noOfLines={1}>
            {name}
          </Text>
        </VStack>
      </a>
    </div>
  );
};

export default ExchangeCard;

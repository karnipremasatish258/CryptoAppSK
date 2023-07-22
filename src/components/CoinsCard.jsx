import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const CoinsCard = ({
  id,
  name,
  image,
  symbol,
  price,
  currencySymbol = "₹",
}) => {
  return (
    <div>
      <Link to={`/coins/${id}`} target="_blank">
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
            {symbol}
          </Heading>
          <Text size={"md"} noOfLines={1}>
            {name}
          </Text>
          <Text size={"md"} noOfLines={1}>
            {price ? `${currencySymbol} ${price}` : NA}
          </Text>
        </VStack>
      </Link>
    </div>
  );
};

export default CoinsCard;

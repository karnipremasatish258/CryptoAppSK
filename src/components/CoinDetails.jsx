import {
  Box,
  Container,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  Text,
  Image,
  Center,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
  background,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import ErrorComponent from "./ErrorComponent";
import { useParams } from "react-router-dom";
import Chart from "./Chart";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const [btn, setBtn] = useState(false);
  const params = useParams();

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setBtn(true);
        break;
      case "7d":
        setDays("7d");
        break;
      case "14d":
        setDays("14d");
        break;
      case "30d":
        setDays("30d");
        break;
      case "60d":
        setDays("60d");
        break;
      case "200d":
        setDays("200d");
        break;
      case "365d":
        setDays("365d");
        break;
      case "max":
        setDays("max");
        break;
      default:
        setDays("24h");
        break;
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${params.id}`
      );
      const { data: chartData } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      setCoin(data);
      setChartArray(chartData.prices);
      setLoader(false);
      console.log(chartData.prices);
    } catch (error) {
      setError(true);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id, currency, days]);

  if (error) return <ErrorComponent />;

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  return (
    <Container maxW={"container.xl"}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} border={1}>
            testing
          </Box>

          <Box w={"full"} borderWidth={1}>
            <Chart
              arr={chartArray}
              currencySymbol={currencySymbol}
              days={days}
            />
          </Box>

          <HStack p={4} overflowX={"auto"}>
            {btns.map((i) => (
              <Button
                key={i}
                isActive={i === days}
                onClick={() => {
                  switchChartStats(i);
                }}
              >
                {i}
              </Button>
            ))}
          </HStack>
          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack alignItems={"flex-start"} spacing={4}>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack alignItems={"flex-start"} spacing={4}>
            <Text fontSize={"small"} opacity={0.7} alignSelf={"center"}>
              Last updated on{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image
              h={"16"}
              w={"16"}
              objectFit={"contain"}
              src={coin.image.large}
            />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge bgColor={"blackAlpha.800"} color={"white"} fontSize={"2xl"}>
              {`# ${coin.market_cap_rank}`}
            </Badge>

            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} p={"4"}>
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All time high"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => (
  <HStack
    color={"blackAlpha.800"}
    justifyContent={"space-between"}
    w={"full"}
    my={"4"}
  >
    <Text letterSpacing={"widest"} fontSize={"sm"}>
      {title}
    </Text>
    <Text fontSize={"sm"}>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => {
  return (
    <VStack w={"full"}>
      <Progress value={low} max={high} w={"full"} />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge colorScheme="red">{low}</Badge>
        <Text fontSize="sm">24H Range</Text>
        <Badge colorScheme="green">{high}</Badge>
      </HStack>
    </VStack>
  );
};

export default CoinDetails;

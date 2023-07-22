import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Center,
  Container,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinsCard from "./CoinsCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btn = new Array(92).fill(1);

  const changeButton = (page) => {
    setPage(page);
    setLoader(true);
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${page}`
      );
      setCoins(data);
      setLoader(false);
      console.log(data);
    } catch (error) {
      setLoader(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currency, page]);

  if (error) return <ErrorComponent />;

  return (
    <Container maxWidth={"container.xl"}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <HStack m={"5"} width={"-moz-max-content"} overflowX={"auto"}>
            {btn.map((n, i) => (
              <Button
                bgColor={"blackAlpha.600"}
                color={"white"}
                key={i}
                onClick={() => changeButton(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack justifyContent={"center"} spacing={4}>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack justifyContent={"space-evenly"} wrap={"wrap"}>
            {coins.map((i) => (
              <CoinsCard
                key={i.id}
                id={i.id}
                name={i.name}
                image={i.image}
                symbol={i.symbol}
                price={i.current_price}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack width={"-moz-max-content"} overflowX={"auto"}>
            {btn.map((n, i) => (
              <Button
                bgColor={"blackAlpha.600"}
                color={"white"}
                key={i}
                onClick={() => changeButton(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;

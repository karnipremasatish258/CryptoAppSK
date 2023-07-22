import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "./Loader";
import ExchangeCard from "./ExchangeCard";
import ErrorComponent from "./ErrorComponent";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/exchanges"
      );
      setExchanges(data);
      setLoader(false);
      console.log(data);
    } catch (error) {
      setLoader(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (error) return <ErrorComponent />;
  return (
    <Container maxWidth={"container.xl"}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"center"}>
            {exchanges.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                image={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Exchanges;

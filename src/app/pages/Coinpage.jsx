import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";
import { SingleCoin } from "../config/api";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import CoinInfo from "../components/CoinInfo";
import { LinearProgress, Typography } from "@mui/material";
import styled from "styled-components";
import parse from "html-react-parser";

const useStyles = makeStyles({
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    width: "100%",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
    fontSize: 24,
  },
});

const Container = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 460px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 30%;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25;
  border-right: 2px solid grey;
`;

const MarketData = styled.div`
  align-self: "start";
  padding: 25px;
  padding-top: 10px;
  width: 100%;

  // making it responsive
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: space-around;
  }

  @media only screen and (max-width: 425px) {
    flex-direction: column;
    align-items: center;
  }

  @media only screen and (max-width: 350px) {
    align-items: start;
  }
`;

const Rank = styled.span`
  display: flex;
`;

const Coinpage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol, numberWithCommas } = CryptoState();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, [id]);

  const classes = useStyles();

  const tranformTag = (node) => {
    if (!node) return "";

    const desc = node.split(".")[0];

    return parse(`${desc}`);
  };

  if (!coin) return <LinearProgress style={{ backgroundColor: "#EEBC1D" }} />;

  return (
    <Container>
      <Sidebar>
        <img
          src={coin.image.large}
          alt={coin.name}
          height="150"
          width="150"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin.name}
        </Typography>
        <Typography variant="p" className={classes.description}>
          {tranformTag(coin.description.en)}.
        </Typography>
        <MarketData>
          <Rank>
            <Typography variant="h5" className={classes.heading}>
              Rank:{" "}
            </Typography>
            <Typography variant="h5">2</Typography>
          </Rank>
        </MarketData>
        <MarketData>
          <Rank>
            <Typography variant="h5" className={classes.heading}>
              Currency Price:{" "}
            </Typography>
            <Typography variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </Rank>
        </MarketData>
        <MarketData>
          <Rank>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}
              {numberWithCommas(
                coin.market_data.market_cap[currency.toLowerCase()]
              )
                .toString()
                .slice(0, -6)}
            </Typography>
          </Rank>
        </MarketData>
      </Sidebar>

      {/* Chart */}
      <CoinInfo coin={coin} />
    </Container>
  );
};

export default Coinpage;

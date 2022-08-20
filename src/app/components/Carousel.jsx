import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../context/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import styled from "styled-components";
const useStyles = makeStyles({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },

  carouselItem: {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },

  currenctPrice: {
    fontSize: 22,
    fontWeight: 500,
  },
});

const CoinIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

const Symbol = styled.span``;
const ProfitContainer = styled.span``;

const Profit = styled.span`
  color: ${(props) => (props.profit > 0 ? "rgba(14, 203, 129)" : "red")};
`;

const Carousel = () => {
  const classes = useStyles();

  const [trending, setTrending] = useState([]);

  const { currency, symbol, numberWithCommas } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link
        key={coin.id}
        className={classes.carouselItem}
        to={`coins/${coin.id}`}
      >
        <CoinIcon src={coin?.image} alt={coin.name} />
        <ProfitContainer>
          <Symbol>{coin.symbol}</Symbol>

          <Profit profit={profit}>
            {profit && "+"} {coin?.price_change_percentage_24h}
          </Profit>
        </ProfitContainer>
        <br />
        <span className={classes.currenctPrice}>
          {symbol} {numberWithCommas(coin?.current_price)}
        </span>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    152: {
      items: 4,
    },
  };
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        responsive={responsive}
        autoPlay
        disableDotsControls
        disableButtonsControls
        items={items}
      />
    </div>
  );
};

export default Carousel;

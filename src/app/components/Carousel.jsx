import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../context/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import {
  CoinIcon,
  Symbol,
  ProfitContainer,
  Profit,
  CurrentPrice,
} from "./Component.styles";

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
});

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
  // eslint-disable-next-line
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
        <CoinIcon src={coin?.image} alt={coin.name} max={80} />
        <ProfitContainer>
          <Symbol>{coin.symbol}</Symbol>

          <Profit profit={profit}>
            {profit && "+"} {coin?.price_change_percentage_24h}
          </Profit>
        </ProfitContainer>
        <br />
        <CurrentPrice>
          {symbol} {numberWithCommas(coin?.current_price)}
        </CurrentPrice>
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

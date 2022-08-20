import {
  Container,
  createTheme,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../context/CryptoContext";

const CoinsTable = () => {
  const [coins, setcoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency } = CryptoState();

  const fectCoins = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(CoinList(currency));
      setcoins(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fectCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        ></Typography>
        <TextField label="Search for a Crypto Currency" variant="outlined" />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;

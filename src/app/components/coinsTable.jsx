import {
  Container,
  LinearProgress,
  Table,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  TextField,
  TableBody,
  Pagination,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "../context/CryptoContext";
import {
  CoinIcon,
  Symbol,
  Profit,
  CurrentPrice,
  MarketCap,
  TBHead,
  TableTitle,
} from "./Component.styles";

const useStyles = makeStyles({
  thRow: {
    color: "#000",
    fontWeight: 700,
    fontFamily: "Helvetica",
    textAlign: "center",
  },
  row: {
    backgroundColor: "#16171a",
    color: "#fff",
    cursor: "pointer",
    "&:hover": { backgroundColor: "#131111" },
    fontFamily: "MontSerrat",
  },
  detialContainer: { display: "flex", flexDirection: "column" },

  name: { color: "darkgrey" },

  pagination: {
    padding: 20,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    "& .MuiPaginationItem-root": { color: "gold" },
  },
});

const CoinsTable = () => {
  const [coins, setcoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, numberWithCommas, symbol } = CryptoState();
  const navigate = useNavigate();
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
  // eslint-disable-next-line
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

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search?.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search?.toLowerCase())
    );
  };

  const classes = useStyles();
  const [page, setPage] = useState(1);

  return (
    <div>
      <span>Hello</span>
    </div>
  );
};

export default CoinsTable;

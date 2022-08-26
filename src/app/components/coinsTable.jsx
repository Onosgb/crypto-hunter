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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container style={{ textAlign: "center" }}>
        <TableTitle>Cryptocurrency Prices by Market Cap</TableTitle>
        <TextField
          label="Search for a Crypto Currency"
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#EEBC1D" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell className={classes.thRow} key={head}>
                      <TBHead head={head}>{head} </TBHead>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        className={classes.row}
                        key={row.id}
                        onClick={() => {
                          navigate(`/coins/${row.id}`);
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          styles={{ display: "flex", gap: 10 }}
                        >
                          <CoinIcon
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div className={classes.detialContainer}>
                            <Symbol>{row.symbol}</Symbol>
                            <Symbol>{row.name}</Symbol>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <Symbol>{symbol}</Symbol>
                          <CurrentPrice>
                            {numberWithCommas(row.current_price)}
                          </CurrentPrice>
                        </TableCell>
                        <TableCell align="right">
                          <Profit>
                            {profit && "+"}
                            {numberWithCommas(row.price_change_percentage_24h)}%
                          </Profit>
                        </TableCell>
                        <TableCell align="right">
                          <MarketCap>
                            {numberWithCommas(row.market_cap)
                              .toString()
                              .slice(0, -6)}
                          </MarketCap>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          className={classes.pagination}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
          count={parseInt((handleSearch()?.length / 10).toFixed(0))}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;

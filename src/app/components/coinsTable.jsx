import {
  Container,
  LinearProgress,
  Table,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  TextField,
  Typography,
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
const useStyles = makeStyles({
  thRow: { color: "#000", fontWeight: 700, fontFamily: "Helvetica" },
  row: {
    backgroundColor: "#16171a",
    color: "#fff",
    cursor: "pointer",
    "&:hover": { backgroundColor: "#131111" },
    fontFamily: "MontSerrat",
  },
  detialContainer: { display: "flex", flexDirection: "column" },
  symbol: { textTransform: "uppercase", fontSize: 12 },
  name: { color: "darkgrey" },
  profit: {
    fontWeight: 500,
  },
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
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const classes = useStyles();
  const [page, setPage] = useState(1);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
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
                    <TableCell
                      className={classes.thRow}
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                    >
                      {head}
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
                          styles={{ display: "flex", gap: 15 }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div className={classes.detialContainer}>
                            <span className={classes.symbol}>{row.symbol}</span>
                            <span className={classes.name}>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <span className={classes.symbol}>{symbol}</span>
                          <span className={classes.price}>
                            {numberWithCommas(row.current_price)}
                          </span>
                        </TableCell>
                        <TableCell
                          align="right"
                          className={classes.profit}
                          style={{
                            color: profit ? "rgba(14, 203, 129)" : "red",
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {numberWithCommas(row.market_cap)
                            .toString()
                            .slice(0, -6)}
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

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CryptoState } from "../context/CryptoContext";

const usestyles = makeStyles({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
  },
});

const Header = () => {
  const classes = usestyles();

  const { currency, setCurrency } = CryptoState();

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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Container>
            <Toolbar>
              <Link to="/" className={classes.link}>
                <Typography className={classes.title} variant="h3">
                  Crypto Hunter
                </Typography>
              </Link>

              <Select
                variant="outlined"
                style={{ width: "100px", height: "40px", marginLeft: "15px" }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"NGN"}>NGN</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Header;

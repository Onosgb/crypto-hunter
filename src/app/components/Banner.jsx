import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Carousel from "./Carousel";

const useStyles = makeStyles({
  banner: {
    backgroundImage: "url(banner.jpg)",
  },

  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 15,
    color: "#fff",
  },
  subtitle: {
    color: "darkgray",
    textTransform: "capitalize",
  },
});

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography variant="h2" className={classes.title}>
            Crypto Hunter
          </Typography>

          <Typography variant="subtitle2" className={classes.subtitle}>
            Get all the info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;

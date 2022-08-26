import { makeStyles } from "@mui/styles";

import styled from "styled-components";
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
});

const BannerContent = styled.div`
  height: 400;
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  justify-content: space-around;
`;

const Tagline = styled.div`
  display: flex;
  height: 40%;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
  font-family: "MontSerrat";
  font-size: 3rem;
  @media only screen and (max-width: 600px) {
    margin-bottom: 1px;
    font-size: 2.5rem;
  }
`;

const SubTitle = styled.h6`
  color: darkgray;
  text-transform: capitalize;
  font-family: "MontSerrat";
  font-size: 1.2rem;
  @media only screen and (max-width: 600px) {
    margin-bottom: 3px;
    font-size: 1rem;
  }
`;

const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <BannerContent>
        <Tagline>
          <Title>Crypto Hunter</Title>
          <SubTitle>
            Get all the info regarding your favorite Crypto Currency
          </SubTitle>
        </Tagline>
        <Carousel />
      </BannerContent>
    </div>
  );
};

export default Banner;

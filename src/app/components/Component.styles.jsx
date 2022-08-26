import styled from "styled-components";
export const HeaderTitle = styled.h3`
  flex: 1;
  color: gold;
  font-family: "Montserrat";
  font-weight: bold;
  cursor: pointer;
  font-size: 24px;
`;
export const CoinIcon = styled.img`
  width: ${(props) => (props.max ? props.max : 50)}px;
  height: ${(props) => (props.max ? props.max : 50)}px;
  margin-bottom: 10px;
  @media only screen and (max-width: 600px) {
    width: ${(props) => (props.max ? 50 : 30)}px;
    height: ${(props) => (props.max ? 50 : 30)}px;
  }
`;

export const Symbol = styled.span`
  font-size: 14px;
  @media only screen and (max-width: 600px) {
    font-size: 10px;
  }
`;

export const ProfitContainer = styled.span`
  font-size: 14px;
  @media only screen and (max-width: 600px) {
    font-size: 10px;
  }
`;

export const Profit = styled.span`
  font-size: 14px;
  @media only screen and (max-width: 600px) {
    font-size: 10px;
  }
  color: ${(props) => (props.profit > 0 ? "rgba(14, 203, 129)" : "red")};
`;

export const CurrentPrice = styled.span`
  font-size: 16px;
  font-weight: 500;
  @media only screen and (max-width: 600px) {
    font-weight: 400;
    font-size: 10px;
  }
`;

export const MarketCap = styled.span`
  font-size: 14px;
  @media only screen and (max-width: 600px) {
    font-size: 10px;
  }
`;

export const TBHead = styled.div`
  width: 100%;
  text-align: ${(props) => (props.head === "Coin" ? "left" : "right")};

  font-size: 18px;
  @media only screen and (max-width: 600px) {
    text-align: center;
    font-size: 12px;
  }
`;

export const TableTitle = styled.h4`
  font-size: 24px;
  margin: 18px;
  font-family: "Montserrat";
  @media only screen and (max-width: 600px) {
    font-size: 16px;
    margin: 10px 5px;
  }
`;

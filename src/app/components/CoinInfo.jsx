import axios from "axios";
import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import styled from "styled-components";
import { HistoricalChart } from "../config/api";

import { CryptoState } from "../context/CryptoContext";
import { CircularProgress } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 25px;
  padding: 40px;
  // responsive
  @media only screen and (min-width: 600px) {
    width: 100%;
    margin-top: 0;
    padding: 20px;
    padding-top: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20;
  justify-content: space-around;
  width: 100%;
`;
const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data?.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days, currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const historicDataSet = () => {
    if (historicData) {
      const mapHistoricalData = historicData.map((coin) => coin[1]);

      const data = {
        labels: historicData.map((coin) => {
          let date = new Date(coin[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;
          const newDays = days === 1 ? time : date.toLocaleDateString();
          return newDays;
        }),
        datasets: [
          {
            data: mapHistoricalData,
            label: `Price (Past ${days} Days) in ${currency}`,
            borderColor: "#EEBC1D",
          },
        ],
      };

      const options = {
        elements: {
          point: {
            radius: 1,
          },
        },
      };
      return <Line options={options} data={data} />;
    }

    return (
      <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        {historicDataSet()}
        <ButtonContainer>
          {chartDays.map((day) => (
            <SelectButton
              key={day.value}
              onClick={() => setDays(day.value)}
              selected={day.value === days}
            >
              {day.label}
            </SelectButton>
          ))}
        </ButtonContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinInfo;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./app/components/Header";
import Homepage from "./app/pages/Homepage";
import Coinpage from "./app/pages/Coinpage";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  App: {
    backgroundColor: "#141618",
    color: "#fff",
    minWeight: "100vh",
  },
});

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.App}>
        <Header />
      </div>

      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/coins/:id" element={<Coinpage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;

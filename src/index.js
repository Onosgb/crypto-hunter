import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CryptoContext from "./app/context/CryptoContext";
import App from "./App";
import "./index.css";
import "react-alice-carousel/lib/alice-carousel.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CryptoContext>
        <App />
      </CryptoContext>
    </BrowserRouter>
  </React.StrictMode>
);

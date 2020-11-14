import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { AppContextProvider } from "./context/AppContext";
import { WeatherContextProvider } from "./context/WeatherContext";

ReactDOM.render(
  <AppContextProvider>
    <WeatherContextProvider>
      <App />
    </WeatherContextProvider>
  </AppContextProvider>,
  document.getElementById("root")
);

import React from "react";
import "./App.css";

import WeatherData from "./components/WeatherData";
import { AppError, AppWaiting } from "./components/AppStatus";

function App() {
  return (
    <div className="App">
      <AppError />
      <AppWaiting />

      <h1>El tiempo</h1>
      <WeatherData />
    </div>
  );
}

export default App;

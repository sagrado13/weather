import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import WeatherData from "./components/WeatherData";
import WeatherDay from "./components/WeatherDay";
import Footer from "./components/Footer";

import { AppError, AppWaiting } from "./components/AppStatus";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppError />
        <AppWaiting />

        <Header />
        <main>
          <Switch>
            <Route exact path="/">
              <WeatherData />
            </Route>
            <Route exact path="/day/:id">
              <WeatherDay />
            </Route>
          </Switch>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

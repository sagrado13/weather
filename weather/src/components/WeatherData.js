import React, { useContext } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import ImgWeather from "./ImgWeather";
import Temperature from "./Temperature";
import RainProbability from "./RainProbability";
import ImgBackground from "./ImgBackground";
import { WeatherContext } from "../context/WeatherContext";

export default function WeatherData() {
  const { data, city, dayNow, hourNow } = useContext(WeatherContext);
  const weatherNow = data[0];
  /*   navigator.geolocation.getCurrentPosition((position, PositionOptions) => {
    PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    console.log(position);
    console.log(position.coords.latitude, position.coords.longitude);
  }); */

  return (
    <div>
      <ImgBackground skyState={weatherNow} hourNow={hourNow} />
      <h3>Previsión para los próximos 7 días en {city}</h3>
      <ul className="weather-list">
        {data.map((item, index) => {
          return (
            <li key={item.fecha}>
              <Link className="enlace" to={`/day/${index}`}>
                <p>{format(new Date(item.fecha), "dd/MM/yyyy")}</p>

                <ImgWeather skyState={item.estadoCielo} />
                <RainProbability
                  dayNow={dayNow}
                  hourNow={hourNow}
                  rain={item.probPrecipitacion}
                  date={item.fecha}
                />

                <Temperature temperature={item.temperatura} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

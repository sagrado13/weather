import React, { useContext } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import ImgWeather from "./ImgWeather";
import Temperature from "./Temperature";
import RainProbability from "./RainProbability";
import { WeatherContext } from "../context/WeatherContext";

export default function WeatherData() {
  const { data, city, dayNow, hourNow } = useContext(WeatherContext);

  return (
    <div>
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

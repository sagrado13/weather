import React, { useContext } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import ImgWeather from "./ImgWeather";
import { WeatherContext } from "../context/WeatherContext";

export default function WeatherData() {
  const { data, city } = useContext(WeatherContext);

  return (
    <div>
      <h3>Previsión para los próximos 7 días en {city}</h3>
      <ul className="weather-list">
        {data.map((item, index) => {
          return (
            <li key={item.fecha}>
              <Link to={`/day/${index}`}>
                <p>{format(new Date(item.fecha), "dd/MM/yyyy")}</p>

                <ImgWeather skyState={item.estadoCielo} />

                <p>Temperatura Mínima: {item.temperatura.minima}º</p>
                <p>Temperatura Máxima: {item.temperatura.maxima}º</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

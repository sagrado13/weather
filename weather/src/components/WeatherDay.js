import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

import ImgWeather from "./ImgWeather";
import Temperature from "./Temperature";
import RainProbability from "./RainProbability";
import { WeatherContext } from "../context/WeatherContext";

export default function WeatherDay() {
  const { data, city, dayNow, hourNow } = useContext(WeatherContext);

  const { id } = useParams();

  console.log(data);

  return (
    <div>
      <h3>
        Previsión para {format(new Date(data[id].fecha), "dd/MM/yyyy")} en{" "}
        {city}
      </h3>
      <ul>
        <ImgWeather skyState={data[`${id}`].estadoCielo} />
        <RainProbability
          dayNow={dayNow}
          hourNow={hourNow}
          date={data[id].fecha}
          rain={data[id].probPrecipitacion}
        />

        <Temperature temperature={data[id].temperatura} />

        {dayNow === format(new Date(data[id].fecha), "dd") ? (
          hourNow > 5 && hourNow < 12 ? (
            <li>Humedad: {data[id].humedadRelativa.dato[0].value} %</li>
          ) : hourNow > 11 && hourNow < 18 ? (
            <li>Humedad: {data[id].humedadRelativa.dato[1].value} %</li>
          ) : hourNow > 17 && hourNow < 0 ? (
            <li>Humedad: {data[id].humedadRelativa.dato[2].value} %</li>
          ) : (
            <li>Humedad: {data[id].humedadRelativa.dato[3].value} %</li>
          )
        ) : (
          <li>
            Humedad:{" "}
            {(data[id].humedadRelativa.maxima +
              data[id].humedadRelativa.minima) /
              2}
            %
          </li>
        )}
      </ul>
      <Link className="enlace" to="/">
        Volver atrás
      </Link>
    </div>
  );
}

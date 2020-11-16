import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import ImgWeather from "./ImgWeather";
import { WeatherContext } from "../context/WeatherContext";

export default function WeatherDay() {
  const { data, city } = useContext(WeatherContext);
  console.log(data);
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h3>
        Previsión para {format(new Date(data[id].fecha), "dd/MM/yyyy")} en{" "}
        {city}
      </h3>
      <ul>
        <ImgWeather skyState={data[`${id}`].estadoCielo} />
        <li>Temlieratura Mínima: {data[id].temperatura.minima}º</li>
        <li>Temlieratura Máxima: {data[id].temperatura.maxima}º</li>
      </ul>
    </div>
  );
}

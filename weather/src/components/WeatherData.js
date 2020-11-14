import React, { useContext } from "react";

import { WeatherContext } from "../context/WeatherContext";

export default function WeatherData() {
  const { data } = useContext(WeatherContext);
  console.log(data.prediccion.dia[1].estadoCielo);

  return (
    <div>
      <ul className="weather-list">
        <h3>{data.nombre}</h3>
        {data.prediccion.dia.map((item) => {
          return (
            <li key={item.fecha}>
              <p>Temperatura Mínima: {item.temperatura.minima}º</p>
              <p>Temperatura Máxima: {item.temperatura.maxima}º</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

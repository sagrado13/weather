import React, { useContext } from "react";
import { format } from "date-fns";

import { WeatherContext } from "../context/WeatherContext";

export default function WeatherData() {
  const { data, city } = useContext(WeatherContext);

  return (
    <div>
      <h3>Previsión para los próximos 7 días en {city}</h3>
      <ul className="weather-list">
        {data.map((item) => {
          return (
            <li key={item.fecha}>
              <p>{format(new Date(item.fecha), "dd/MM/yyyy")}</p>
              {item.estadoCielo[0].descripcion === "Muy nuboso" ? (
                <img
                  className="img-weather"
                  src={"../img/1146855-weather/svg/014-cloud.svg"}
                />
              ) : item.estadoCielo[0].descripcion === "Nuboso con lluvia" ||
                item.estadoCielo[0].descripcion === "Cubierto con lluvia" ? (
                <img
                  className="img-weather"
                  src={"../img/1146855-weather/svg/002-rain.svg"}
                />
              ) : item.estadoCielo[0].descripcion === "Intervalos nubosos" ? (
                <img
                  className="img-weather"
                  src={"../img/1146855-weather/svg/013-cloudy.svg"}
                />
              ) : item.estadoCielo[0].descripcion ===
                "Nuboso con lluvia escasa" ? (
                <img
                  className="img-weather"
                  src={"../img/1146855-weather/svg/lluvia.svg"}
                />
              ) : item.estadoCielo[0].descripcion ===
                "Intervalos nubosos con lluvia escasa" ? (
                <img
                  className="img-weather"
                  src={"../img/1146855-weather/svg/060-rain.svg"}
                />
              ) : null}

              <p>{item.estadoCielo[0].descripcion}</p>

              <p>Temperatura Mínima: {item.temperatura.minima}º</p>
              <p>Temperatura Máxima: {item.temperatura.maxima}º</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

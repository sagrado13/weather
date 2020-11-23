import React from "react";

export default function ImgWeather({ skyState }) {
  return (
    <div>
      {/* {skyState[0].descripcion} */}
      {/* Si el valor de estadoCielo[0] está vacío lo cambiamos por el estadoCielo[2] que siempre tiene valor */}
      {skyState[0].descripcion === ""
        ? (skyState[0].descripcion = skyState[2].descripcion)
        : null}

      {/* Según el valor de estadoCielo[0] mostramos una imagen u otra */}
      {skyState[0].descripcion === "Despejado" ? (
        <img className="img-weather" src={"/img/1146855-weather/svg/sun.svg"} />
      ) : skyState[0].descripcion === "Muy nuboso" ||
        skyState[0].descripcion === "Nuboso" ? (
        <img
          className="img-weather"
          src={"/img/1146855-weather/svg/014-cloud.svg"}
        />
      ) : skyState[0].descripcion === "Nuboso con lluvia" ||
        skyState[0].descripcion === "Cubierto con lluvia" ? (
        <img
          className="img-weather"
          src={"/img/1146855-weather/svg/002-rain.svg"}
        />
      ) : skyState[0].descripcion === "Intervalos nubosos" ||
        skyState[0].descripcion === "Poco nuboso" ||
        skyState[0].descripcion === "Nubes altas" ? (
        <img
          className="img-weather"
          src={"/img/1146855-weather/svg/013-cloudy.svg"}
        />
      ) : skyState[0].descripcion === "Nuboso con lluvia escasa" ||
        skyState[0].descripcion === "Muy nuboso con lluvia escasa" ? (
        <img
          className="img-weather"
          src={"/img/1146855-weather/svg/lluvia.svg"}
        />
      ) : skyState[0].descripcion === "Intervalos nubosos con lluvia escasa" ||
        skyState[0].descripcion === "Intervalos nubosos con lluvia" ? (
        <img
          className="img-weather"
          src={"/img/1146855-weather/svg/060-rain.svg"}
        />
      ) : null}
    </div>
  );
}

import React from "react";

export default function ImgBackground({ skyState, hourNow }) {
  console.log(skyState, hourNow);
  return (
    <div>
      <p>hola</p>
      {hourNow >= 0 && hourNow < 6 ? (
        <p>Probabilidad precipitación: {skyState.estadoCielo[3].description}</p>
      ) : hourNow >= 6 && hourNow < 12 ? (
        <p>Probabilidad precipitación: {skyState.estadoCielo[4].description}</p>
      ) : hourNow >= 12 && hourNow < 18 ? (
        <p>Probabilidad precipitación: {skyState.estadoCielo[5].description}</p>
      ) : (
        <p>Probabilidad precipitación: {skyState.estadoCielo[6].description}</p>
      )}
    </div>
  );
}

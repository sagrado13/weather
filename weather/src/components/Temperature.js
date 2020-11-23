import React from "react";

export default function Temperature({ temperature }) {
  return (
    <div>
      <p>Temperatura Mínima: {temperature.minima}º</p>
      <p>Temperatura Máxima: {temperature.maxima}º</p>
    </div>
  );
}

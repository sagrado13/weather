import React from "react";
import { format } from "date-fns";

export default function RainProbabipty({ rain, date, dayNow, hourNow }) {
  return (
    <div>
      {!date ? (
        <p>{rain[0].value}%</p>
      ) : dayNow === format(new Date(date), "dd") ? (
        hourNow >= 0 && hourNow < 6 ? (
          <p>Probabilidad precipitación: {rain[3].value}%</p>
        ) : hourNow >= 6 && hourNow < 12 ? (
          <p>Probabilidad precipitación: {rain[4].value}%</p>
        ) : hourNow >= 12 && hourNow < 18 ? (
          <p>Probabilidad precipitación: {rain[5].value}%</p>
        ) : (
          <p>Probabilidad precipitación: {rain[5].value}%</p>
        )
      ) : (
        <p>Probabilidad precipitación: {rain[0].value}%</p>
      )}
    </div>
  );
}

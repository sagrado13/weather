import React from "react";

export default function ImgBackground({ skyState, hourNow }) {
  /*   var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;

    console.log(pos);

    console.log("Your current position is:");
    console.log("Latitude : " + crd.latitude);
    console.log("Longitude: " + crd.longitude);
    console.log("More or less " + crd.accuracy + " meters.");
  }

  function error(err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
  }

  navigator.geolocation.getCurrentPosition(success, error, options); */
  return (
    <div>
      <p>hola</p>

      {/*       {hourNow >= 0 && hourNow < 6 ? (
        <p>Probabilidad precipitación: {skyState.estadoCielo[3].description}</p>
      ) : hourNow >= 6 && hourNow < 12 ? (
        <p>Probabilidad precipitación: {skyState.estadoCielo[4].description}</p>
      ) : hourNow >= 12 && hourNow < 18 ? (
        <p>Probabilidad precipitación: {skyState.estadoCielo[5].description}</p>
      ) : (
        <p>Probabilidad precipitación: {skyState.estadoCielo[6].description}</p>
      )} */}
    </div>
  );
}

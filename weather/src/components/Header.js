import React, { useContext, useState } from "react";

import { WeatherContext } from "../context/WeatherContext";

export default function Header() {
  const {
    getCity,
    cities,
    location,
    setLocation,
    getLocation,
    cityCode,
    setCityCode,
  } = useContext(WeatherContext);

  const [nameProvince, setNameProvince] = useState(null);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [repeat, setRepeat] = useState(0);
  let lastProvince;

  /* SI EXISTE CITYCODE Y EL NÚMERO DE REPEAT ES MENOR A 1 SE EJECUTA LA FUNCIÓN GETCITY */
  if (cityCode && repeat < 1) {
    getCity({ cityCode });
    setRepeat(repeat + 1);
  }

  navigator.geolocation.getCurrentPosition((position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    getLocation({ latitude, longitude });
  });

  return (
    <header>
      <h1>
        El tiempo en {location} {cityCode}
      </h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          getCity({ cityCode });
          /* setLocation(city.city); */
        }}
      >
        <select onChange={(event) => setNameProvince(event.target.value)}>
          <option value=""></option>
          {cities.map((city) => {
            if (lastProvince !== city.province) {
              lastProvince = city.province;
              return (
                <option key={city.id} value={city.province}>
                  {city.province}
                </option>
              );
            }
          })}
        </select>
        <p>{nameProvince}</p>

        {/* SI HAY SELECCIONADA ALGUNA PROVINCIA SE MUESTRA UN SEGUNDO SELECT CON LAS POBLACIONES DE DICHA PROVINCIA */}
        {nameProvince ? (
          <select
            onChange={
              ((event) =>
                setLocation(event.target[event.target.selectedIndex].label),
              (e) => setCityCode(e.target.value))
            }
          >
            <option value=""></option>
            {cities.map((city) => {
              if (nameProvince === city.province) {
                return (
                  <option key={city.id} value={city.id} label={city.city}>
                    {city.city}
                  </option>
                );
              }
            })}
          </select>
        ) : null}
        <p>{cityCode}</p>
        <button>Enviar</button>
      </form>
      {/*  {cityCode ? <p>O valor do select é {cityCode}</p> : null} */}
    </header>
  );
}

import React, { useContext, useState } from "react";

import { WeatherContext } from "../context/WeatherContext";

export default function Header() {
  const {
    getCityDataSelected,
    cities,
    location,
    setLocation,
    cityCode,
    setCityCode,
    citySelected,
    setCitySelected,
  } = useContext(WeatherContext);

  const [nameProvince, setNameProvince] = useState(null);

  let lastProvince;

  return (
    <header>
      <h1>
        El tiempo en {location} {cityCode}
      </h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          getCityDataSelected({ cityCode });

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
              (e) =>
                setCityCode(e.target.value) &&
                setCitySelected(!!e.target.value))
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
        <p>{citySelected}</p>
        <button>Enviar</button>
      </form>
      {/*  {cityCode ? <p>O valor do select é {cityCode}</p> : null} */}
    </header>
  );
}

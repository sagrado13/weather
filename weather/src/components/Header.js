import React, { useContext, useState } from "react";

import { WeatherContext } from "../context/WeatherContext";

export default function Header() {
  const [nameProvince, setNameProvince] = useState(null);
  const [cityCode, setCityCode] = useState(null);

  const { getCity, cities } = useContext(WeatherContext);

  let lastProvince;

  return (
    <header>
      <h1>El tiempo</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          getCity({ cityCode });
        }}
      >
        <select onChange={(event) => setNameProvince(event.target.value)}>
          <option value=""></option>
          {cities.map((city) => {
            if (lastProvince !== city.province) {
              lastProvince = city.province;
              return <option value={city.province}>{city.province}</option>;
            }
          })}
        </select>
        <p>{nameProvince}</p>

        {/* SI HAY SELECCIONADA ALGUNA PROVINCIA SE MUESTRA UN SEGUNDO SELECT CON LAS POBLACIONES DE DICHA PROVINCIA */}
        {nameProvince ? (
          <select onChange={(event) => setCityCode(event.target.value)}>
            <option value=""></option>
            {cities.map((city) => {
              if (nameProvince === city.province) {
                return <option value={city.id}>{city.city}</option>;
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

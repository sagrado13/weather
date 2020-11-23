import React, { useContext, useState } from "react";

import { WeatherContext } from "../context/WeatherContext";

export default function Header() {
  const [cityCode, setCityCode] = useState(null);

  const { getCity } = useContext(WeatherContext);

  return (
    <header>
      <h1>El tiempo</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          getCity({ cityCode });
        }}
      >
        <select onChange={(event) => setCityCode(event.target.value)}>
          <option></option>
          <option value="15030">A Coruña</option>
          <option value="15036">Ferrol</option>
          <option value="27028">Lugo</option>
          <option value="32054">Ourense</option>
          <option value="36038">Pontevedra</option>
          <option value="15078">Santiago de Compostela</option>
          <option value="36057">Vigo</option>
        </select>

        <button>Enviar</button>
      </form>

      {/*  {cityCode ? <p>O valor do select é {cityCode}</p> : null} */}
    </header>
  );
}

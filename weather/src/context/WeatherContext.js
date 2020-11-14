import { useState, useEffect, createContext, useContext } from "react";

import { AppContext } from "../context/AppContext";

const WeatherContext = createContext();

const { REACT_APP_API_URL, REACT_APP_API_KEY } = process.env;

function WeatherContextProvider({ children }) {
  const { setWaiting, setError } = useContext(AppContext);
  const [data, setData] = useState([]);

  // Este hook carga los datos del tiempo
  useEffect(() => {
    async function getData() {
      try {
        setWaiting(true);

        const response = await fetch(
          `${REACT_APP_API_URL}prediccion/especifica/municipio/diaria/27028/?api_key=${REACT_APP_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Error cargando datos");
        }

        const json = await response.json();
        const url = json.datos;
        try {
          const response = await fetch(`${url}`);

          if (!response.ok) {
            throw new Error("Error cargando datos del tiempo");
          }

          const json = await response.json();

          setData(json[0]);
          console.log(data);
        } catch (error) {
          setError(error.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setWaiting(false);
      }
    }

    getData();
  }, [setError, setWaiting]);

  return (
    <WeatherContext.Provider value={{ data }}>
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext, WeatherContextProvider };

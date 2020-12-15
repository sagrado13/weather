import { useState, useEffect, createContext, useContext } from "react";

import { AppContext } from "../context/AppContext";

import { format } from "date-fns";

import cities from "../cities";

const WeatherContext = createContext();

const { REACT_APP_API_URL, REACT_APP_API_KEY, REACT_APP_HOST } = process.env;

function WeatherContextProvider({ children }) {
  const { setWaiting, setError } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [city, setCity] = useState([]);
  const [location, setLocation] = useState();

  const now = new Date();
  const dayNow = format(new Date(now), "dd");
  const hourNow = format(new Date(now), "HH");

  // Este hook carga los datos del tiempo en Lugo por defecto
  useEffect(() => {
    let codeCity = [];
    let number = 0;
    let index = 1000;

    async function getData() {
      try {
        setWaiting(true);

        /* for (let i = index; i < 99999; i++) {
          try {
            if (i >= 0 && i < 10) {
              i = "0" + "0" + "0" + "0" + i;
            } else if (i >= 10 && i < 100) {
              i = "0" + "0" + "0" + i;
            } else if (i >= 100 && i < 1000) {
              i = "0" + "0" + i;
            } else if (i >= 1000 && i < 10000) {
              i = "0" + +i;
            } else {
              i = i;
            }
            number++;

            if (number === 15) {
              number = 0;
              index = i;
              setTimeout(getData, 20000);
              break;
            }
            const response = await fetch(
              `${REACT_APP_API_URL}prediccion/especifica/municipio/diaria/${i}/?api_key=${REACT_APP_API_KEY}`
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

              codeCity.push({
                id: `${i}`,
                city: `${json[0].nombre}`,
                province: `${json[0].provincia}`,
              });
            } catch (error) {
              setError(error.message);
            }
          } catch (error) {
            setError(error.message);
          }
        } */

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

          setCity(json[0].nombre);

          setData(json[0].prediccion.dia);
        } catch (error) {
          setError(error.message);
        }
        console.log(codeCity);
      } catch (error) {
        setError(error.message);
      } finally {
        setWaiting(false);
      }
    }
    getData();
  }, [setError, setWaiting]);

  // FUNCIÓN PARA SACAR NOMBRE DE LA POBLACIÓN SEGÚN LAS COORDENADAS DE LA UBICACIÓN
  const getLocation = async ({ latitude, longitude }) => {
    if (latitude && longitude) {
      try {
        setWaiting(true);
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude}
            ,${longitude}
            &key=AIzaSyD2njfNJUvwdj_NtKzCHYxs3mchC4uVGPs`
        );

        if (!response.ok) {
          throw new Error("Error obteniendo la ubicación");
        }

        const json = await response.json();

        setLocation(json.results[0].address_components[2].long_name);
      } catch (error) {
        setError(error.message);
      } finally {
        setWaiting(false);
      }
    } else {
      setWaiting(true);
    }
  };

  /* Función para cambiar la ciudad */
  const getCity = async ({ cityCode }) => {
    if (!cityCode) {
      console.log("entro");
      let filtered = cities.filter((city) => {
        return city.city.toLowerCase().includes(location.toLowerCase());
      });
      cityCode = filtered[0].id;
    }
    try {
      setWaiting(true);

      const response = await fetch(
        `${REACT_APP_API_URL}prediccion/especifica/municipio/diaria/${cityCode}/?api_key=${REACT_APP_API_KEY}`
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

        if ((json[0].nombre = "�")) {
          let filtered = cities.filter((city) => {
            return city.id.includes(json[0].id);
          });
          setCity(filtered[0].city);
        }

        setData(json[0].prediccion.dia);
      } catch (error) {
        setError(error.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setWaiting(false);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        data,
        city,
        getLocation,
        getCity,
        dayNow,
        hourNow,
        cities,
        location,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext, WeatherContextProvider };

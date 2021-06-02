import { useState, useEffect, createContext, useContext } from "react";

import { AppContext } from "../context/AppContext";

import { format } from "date-fns";

import cities from "../cities";

const WeatherContext = createContext();

const {
  REACT_APP_API_URL,
  REACT_APP_API_KEY,
  REACT_APP_API_GEO_URL,
  REACT_APP_API_GEO_KEY,
} = process.env;

function WeatherContextProvider({ children }) {
  const { setWaiting, setError } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [city, setCity] = useState([]);
  const [cityCode, setCityCode] = useState(null);
  const [location, setLocation] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [citySelected, setCitySelected] = useState(false);

  const now = new Date();
  const dayNow = format(new Date(now), "dd");
  const hourNow = format(new Date(now), "HH");

  // Este hook carga los datos del tiempo en Lugo por defecto
  useEffect(() => {
    // FUNCIÓN PARA SACAR NOMBRE DE LA POBLACIÓN SEGÚN LAS COORDENADAS DE LA UBICACIÓN
    async function getLocation() {
      if (!citySelected) {
        try {
          /* SACAMOS LONGITUD Y LATITUD */
          navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          });
          /* SI NO SE RECIBE LATITUDE O LONGITUDE LANZAMOS UN ERROR */
          if (!latitude || !longitude) {
            setWaiting(true);
            throw new Error("No se puede obtener tu ubicación en este momento");
          } else {
            try {
              setWaiting(true);

              /* HACEMOS PETICIÓN EN LA QUE PASAMOS LATITUDE Y LONGITUDE, SACAMOS LOS DATOS QUE NOS INTERESAN DE LA UBICACIÓN */
              const response = await fetch(
                `${REACT_APP_API_GEO_URL}${latitude}
            ,${longitude}
            &key=${REACT_APP_API_GEO_KEY}`
              );

              if (!response.ok) {
                throw new Error("Error obteniendo la ubicación");
              }

              const json = await response.json();

              setLocation(json.results[0].address_components[2].long_name);

              /* BUSCAMOS LA CIUDAD QUE COINCIDA CON LA DE LA GEOLOCALIZACIÓN Y GUARDAMOS SU CÓDIGO*/
              let filtered = cities.filter((city) => {
                return city.city
                  .toLowerCase()
                  .includes(
                    json.results[0].address_components[2].long_name.toLowerCase()
                  );
              });
              setCityCode(filtered[0].id);
              setCity(filtered[0].provincia);
              setError();
            } catch (error) {
              setError(error.message);
            }
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setWaiting(false);
        }
      }
    }

    /* SI EXISTE CITYCODE Y EL NÚMERO DE REPEAT ES MENOR A 1 SE EJECUTA LA FUNCIÓN GETCITY */
    /* FUNCIÓN PARA CARGAR DATOS SEGÚN UBICACIÓN*/
    async function getCity() {
      if (cityCode) {
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
              setLocation(filtered[0].city);
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
      }
    }

    /* async function getData() {
          let codeCity = [];
          
          let number = 0;
          let index = 1000;
          try {
            setWaiting(true);
            
            for (let i = index; i < 99999; i++) {
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
        }

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
      } catch (error) {
        setError(error.message);
      } finally {
        setWaiting(false);
      }
    } */

    /* async function getDataDay() {
      try {
        setWaiting(true);

        const response = await fetch(
          `${REACT_APP_API_URL}prediccion/especifica/municipio/horaria/27028/?api_key=${REACT_APP_API_KEY}`
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
          console.log(json);
          setData(json[0].prediccion.dia);
        } catch (error) {
          setError(error.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setWaiting(false);
      }
    } */
    getLocation();
    getCity();
    /* getData(); */
    /* getDataDay(); */
  }, [
    setError,
    setWaiting,
    setCityCode,
    latitude,
    longitude,
    cityCode,
    citySelected,
  ]);

  const getCityDataSelected = async ({ cityCode }) => {
    console.log("holas");
    console.log(cityCode);
    setCitySelected(true);
    console.log(citySelected);
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
          setLocation(filtered[0].city);
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
        dayNow,
        hourNow,
        cities,
        location,
        setLocation,
        cityCode,
        setCityCode,
        getCityDataSelected,
        citySelected,
        setCitySelected,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext, WeatherContextProvider };

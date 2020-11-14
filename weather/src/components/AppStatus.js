import React, { useContext } from "react";

import { AppContext } from "../context/AppContext";

export function AppError() {
  const { error, setError } = useContext(AppContext);

  return (
    <div>
      {error ? (
        <div className="app-error">
          <p>{error}</p> <button onClick={() => setError(null)}>Cerrar</button>
        </div>
      ) : null}
    </div>
  );
}

export function AppWaiting() {
  const { waiting } = useContext(AppContext);
  return (
    <>
      {waiting ? (
        <div className="app-waiting">
          <p>Cargando..</p>
        </div>
      ) : null}
    </>
  );
}

import React, { useState } from "react";
import Resumen from "../Resumen/Resumen";
import { Link } from "react-router-dom";
import "./Envio.scss";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";

export default function Envio() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [envio, setEnvio] = useState(0);

  const manejarSeleccion = (id) => {
    setSeleccionado(id);
    if (id === 1) {
      setEnvio("2,90");
      localStorage.setItem("envio", 2.9);
    } else if (id === 2) {
      setEnvio("5,90");
      localStorage.setItem("envio", 5.9);
    }
  };

  const toggleDisable = () => {
    setIsDisabled(!isDisabled);
    if (!isDisabled) {
      localStorage.setItem("direccion", true);
    } else {
      localStorage.removeItem("direccion");
    }
  };

  return (
    <>
      <span className="separator"></span>
      <Link to={"/Carrito"}>
        <IconButton>
          <ArrowBackIosRoundedIcon />
        </IconButton>
      </Link>
      <h2 className="shipment-title">Dirección y envío</h2>
      <div className="adress">
        <input
          type="text"
          placeholder="Nombre y apellido"
          disabled={isDisabled}
        />
        <input type="text" placeholder="Calle" disabled={isDisabled} />
        <input type="text" placeholder="Portal" disabled={isDisabled} />
        <input type="text" placeholder="Piso" disabled={isDisabled} />
        <input type="text" placeholder="puerta" disabled={isDisabled} />
        <input type="text" placeholder="Codigo Postal" disabled={isDisabled} />
        <input type="text" placeholder="Telefono" disabled={isDisabled} />
        <button onClick={toggleDisable}>
          {isDisabled ? "Editar" : "Guardar"}
        </button>
      </div>

      <div className="shipment-options">
        <div className="correos">
          <p>
            Recogida en correos + 2,90€
            <Radio
              className="check"
              type="radio"
              value="2,90"
              checked={seleccionado === 1}
              onChange={() => manejarSeleccion(1)}
            />
          </p>
        </div>
        <div className="mensajeria">
          <p>
            Envío por mensajería + 5,90€{" "}
            <Radio
              className="check"
              type="radio"
              value="5,90"
              checked={seleccionado === 2}
              onChange={() => manejarSeleccion(2)}
            />
          </p>
        </div>
        <Link to="/Resumen" component={Resumen}>
          <button
            disabled={
              !localStorage.getItem("envio") ||
              !localStorage.getItem("direccion")
            }
          >
            Ir a resumen
          </button>
        </Link>
      </div>
    </>
  );
}

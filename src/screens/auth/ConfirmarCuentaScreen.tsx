import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LogBackground from "../../assets/logos/Macareniaa.jpg";
import clienteAxios from "../../config/clienteAxios";

const ConfirmarCuentaScreen = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(true);

  const params = useParams();
  const { token } = params;
  console.log("parametro", token);

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios.get("users/verify/");
        console.log("dataGetConfirm", data);
        setCuentaConfirmada(true);
      } catch (error) {
        console.log(error);
      }
    };
    confirmarCuenta();
  }, []);

  return (
    <div
      className="page-header align-items-start min-vh-100"
      style={{
        backgroundColor: "rgb(4,47,74)",
      }}
    >
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-4 col-md-8 col-12 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <h3 className="mt-4 mb-0 text-center mb-4">
                Confirmacion de cuenta
              </h3>
              <div className="card-body">
                {cuentaConfirmada && <Link to="/">Inicia sesión</Link>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmarCuentaScreen;

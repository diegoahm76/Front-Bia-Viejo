import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import LogBackground from "../../../assets/logos/Macareniaa.jpg";

const optionsTipoRecuperacion = [
  { label: "Correo electronico", value: "email" },
  { label: "Numero celular", value: "cel" },
];

const RecuperacionDeContrasenaScreen = () => {
  const [tipoDeRecuperacion, setTipoDeRecuperacion] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div
      className="page-header align-items-start min-vh-100"
      style={{
        backgroundImage: `url(${LogBackground})`,
      }}
    >
      <span className="mask bg-gradient-dark opacity-6"></span>
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-4 col-md-8 col-12 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <h3 className="mt-4 mb-0 text-center mb-4">Recuperar contraseña</h3>
              <div className="card-body">
                <form className="text-start">
                  <div>
                  <label className="form-label">
                    Recuperar por medio de
                  </label>
                  <Select
                    options={optionsTipoRecuperacion}
                    defaultValue={optionsTipoRecuperacion[0]}
                    placeholder="Seleccionar"
                    onChange={(e) => setTipoDeRecuperacion(e.value)}
                  />
                  </div>
                  
                  {!tipoDeRecuperacion || tipoDeRecuperacion === "email" ? (
                    <div className="form-floating input-group input-group-dynamic mt-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Emaill"
                        //{...register("documento")}
                      />
                      <label className="ms-2">Correo electronico</label>
                    </div>
                  ) : (
                    <div className="form-floating input-group input-group-dynamic mt-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        //{...register("documento")}
                      />
                      <label className="ms-2">Numero celular</label>
                    </div>
                  )}

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn bg-gradient-primary w-100 my-4 mb-2 text-capitalize"
                    >
                      Validar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecuperacionDeContrasenaScreen;

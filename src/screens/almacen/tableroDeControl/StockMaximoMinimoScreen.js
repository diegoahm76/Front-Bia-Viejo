//import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import Subtitle from '../../../components/Subtitle'
import React, { useState } from "react";

const StockMaximoMinimoScreen = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [busquedaPersonalIsActive, setBusquedaPersonalIsActive] =
    useState(false);
  const [busquedaArticuloIsActive, setBusquedaArticuloIsActive] =
    useState(false);

  const [selecOpciones, setSelecOpciones] = useState({
    tipoDocumento: "",
    numeroCedula: "",
    dependencia: "",
    grupo: "",
    codigoArticulo: "",
    nombreArticulo: "",
  });


  const onSubmit = (data) => {
    setSelecOpciones({
      ...selecOpciones,
      dependencia: data.dependencia?.value,
      tipoDocumento: data.tipoDocumento?.value,
      grupo: data.grupo?.value,
      numeroCedula: data.numeroCedula,
      codigoArticulo: data.codigoArticulo,
      nombreArticulo: data.nombreArticulo,
    });
  };


  const options = [
    { label: "Cedula de ciudadania", value: "CC" },
    { label: "Tarjeta de identidad", value: "TI" },
    { label: "desplazado", value: "DZ" },
    { label: "Others", value: "OT" },
  ];

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Configuración de máximos y mínimos de consumo
            </h3>
            <Subtitle title="Tipo de articulo" mt={3} />

            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Código: <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control border border-terciary rounded-pill px-3"
                  {...register("valorCodigo", { required: true })}
                />
                {errors.valorCodigo && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Nombre: <span className="text-danger">*</span>
                </label>
                <input
                  disabled="true"
                  type="text"
                  className="form-control border border-terciary rounded-pill px-3"
                />
              </div>
              <div className="col-12 col-md-3">
                <button
                  className="btn-min-width border rounded-pill mt-2 px-3 btn bg-gradient-primary"
                  type="button"
                  title="Send"
                  form="configForm"
                  onClick={() => setBusquedaArticuloIsActive(true)}
                >
                  Buscar Articulo
                </button>
              </div>
            </div>

            <Subtitle title="Stock" mt={3} />
            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Stock minimo: <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control border border-terciary rounded-pill px-3"
                  {...register("stockMinimo", { required: true })}
                />
                {errors.stockMinimo && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Stock maximo: <span className="text-danger">*</span>
                </label>
                <input
                  name="stockMaximo"
                  type="number"
                  className="form-control border border-terciary rounded-pill px-3"
                  {...register("stockMaximo", { required: true })}
                />
                {errors.stockMaximo && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
            </div>

            <Subtitle title="Recibir alertas" mt={3} />

            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Recibir alertas minimo: <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control border border-terciary rounded-pill px-3"
                  {...register("alertasMinimo", { required: true })}
                />
                {errors.alertasMinimo && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Recibir alertas maximo: <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control border border-terciary rounded-pill px-3"
                  {...register("alertasMaximo", { required: true })}
                />
                {errors.alertasMaximo && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
              <button
                className="btn-min-width border rounded-pill px-3 btn bg-gradient-primary"
                type="submit"
              >
                Buscar
              </button>
              <button
                className="btn-min-width border rounded-pill px-3 btn bg-gradient-danger"
                type="button"
                title="Send"
              >
                Salir
              </button>
            </div>
          </form>
          <BusquedaDePersonalModal
            isModalActive={busquedaPersonalIsActive}
            setIsModalActive={setBusquedaPersonalIsActive}
          />

          <BusquedaArticuloModal
            isModalActive={busquedaArticuloIsActive}
            setIsModalActive={setBusquedaArticuloIsActive}
          />
        </div>
      </div>
    // </div>
  );
};
export default StockMaximoMinimoScreen;

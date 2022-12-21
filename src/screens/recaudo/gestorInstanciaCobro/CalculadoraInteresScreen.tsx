import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ModalLocal from "../../../components/ModalLocal";
import Subtitle from "../../../components/Subtitle";

export const CalculadoraInteresScreen = () => {
  const [concepto, setconcepto] = useState({});
  const opcConcepto = [
    { label: "Tasa retributiva", value: "TR" },
    { label: "Multas y Sanciones", value: "MS" },
    { label: "Tasa por uso de agua", value: "TUA" },
    { label: "Tasa por aprovechamiento", value: "TA" },
    { label: "Visitas tecnicas", value: "VT" },
  ];

  const [calculadora, setCalculadora] = useState(false);

  const handleOpenModalCalculadora = () => {
    setCalculadora(true);
  };

  const handleCloseModalCalculadora = () => {
    setCalculadora(false);
  };


  const { control: control, handleSubmit: handleSubmitInformacion } = useForm();
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          //onSubmit=""
          id="configForm"
        >
          <h3>Calculadora de intereses</h3>
          <Subtitle title={"Calculadora de liquidación de credito"} />
          <div className="row mt-3 align-items-end">
            <div className="col-6 col-sm-3">
              <label className="text-terciary">
                Digite el nombre del usuario al cual le calculadora la
                liquidacion
              </label>
              <input
                className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                type="text"
                placeholder="Nombre de usuarios"
              ></input>
            </div>
            <div className="col-6 col-sm-3">
              <label className="text-terciary">
                Digite el numero de idnetificacion o NIT del usuario
              </label>
              <input
                className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                type="text"
                placeholder="NIT/CC"
              ></input>
            </div>
            <div className="col-6 col-sm-3">
              <label className="text-terciary">
                Digite el numero de la obligación
              </label>
              <input
                className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                type="text"
                placeholder="Nombre de la obligación"
              ></input>
            </div>
            <div className="col-6 col-sm-3">
              <label className="text-terciary">Concepto de la deuda</label>
              <Controller
                name="concepto"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { label: "Tasa retributiva", value: "TR" },
                      { label: "Multas y Sanciones", value: "MS" },
                      { label: "Tasa por uso de agua", value: "TUA" },
                      { label: "Tasa por aprovechamiento", value: "TA" },
                      { label: "Visitas tecnicas", value: "VT" },
                    ]}
                    placeholder="Seleccionar"
                  />
                )}
              />
            </div>
          </div>
          <div>
             <button
            className="btn text-capitalize border rounded-pill px-3 mt-3"
            type="button"
            onClick={handleOpenModalCalculadora}
          >
            <i className="fa-solid fa-angles-right fs-3"></i>
          </button>
          </div>
         

          <ModalLocal localState={calculadora}>
            <h3>Calculadora de liquidación de credito</h3>
            <div className="row mt-3">
              <Subtitle title={"Liquidación para deudores de sanciones"} />
            </div>
            <div className="row mt-3 align-items-end">
              <div className="col-6 col-sm-3">
                <label className="text-terciary">Expediente</label>
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="text"
                  placeholder="Numero de expediente"
                  disabled={true}
                ></input>
              </div>
              <div className="col-6 col-sm-3">
                <label className="text-terciary">Resolución</label>
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="text"
                  placeholder="Numero de Resolución"
                  disabled={true}
                ></input>
              </div>
            </div>
            <div className="row mt-3 align-items-end">
              <div className="col-6 col-sm-3">
                <label className="text-terciary">Nombre del deudor</label>
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="text"
                  placeholder="Nombre del deudor"
                  disabled={true}
                ></input>
              </div>
              <div className="col-6 col-sm-3">
                <label className="text-terciary">Identificación</label>
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="text"
                  placeholder="Identificación"
                  disabled={true}
                ></input>
              </div>
              <div className="col-6 col-sm-3">
                <label className="text-terciary">Valor capital</label>
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="number"
                  placeholder="Valor capital"
                  disabled={true}
                ></input>
              </div>
              <div className="col-6 col-sm-3">
                <label className="text-terciary">Fecha de notificación</label>
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="date"
                  placeholder="Fecha de notificación"
                  disabled={true}
                ></input>
              </div>
            </div>
            <div className="row mt-1 align-items-end">
              <div className="col-6 col-sm-3">
                <label className="text-terciary">
                  Fecha de constitución de mora
                </label>
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="date"
                  placeholder="Fecha constitución de la mora"
                  disabled={true}
                ></input>
              </div>
              <div className="col-6 col-sm-3">
                <label className="text-terciary">
                  Fecha a corte para la liquidación de intereses
                </label>
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="date"
                  placeholder="Fecha de corte"
                  disabled={true}
                ></input>
              </div>
              <div className="col-6 col-sm-3">
                <label className="text-terciary">Dias de mora</label>
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="text"
                  placeholder="Dias de mora"
                  disabled={true}
                ></input>
              </div>
              <div className="col-6 col-sm-3">
                <label className="text-terciary">
                  Interes de mora generados
                </label>
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="number"
                  placeholder="Intereses de mora generados"
                  disabled={true}
                ></input>
              </div>
              <div className="col-6 col-sm-3">
                <label className="text-terciary">
                  Total intereses mas valor capital
                </label>
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="text"
                  placeholder="Total"
                  disabled={true}
                ></input>
              </div>
            </div>
            <button
              className="btn text-capitalize border rounded-pill px-3 mt-3"
              type="button"
              onClick={handleCloseModalCalculadora}
            >
              <i className="fa-solid fa-angles-left fs-3"></i>
            </button>
          </ModalLocal>
        </form>
      </div>
    </div>
  );
};

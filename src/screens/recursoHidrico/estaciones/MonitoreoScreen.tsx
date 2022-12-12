import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Subtitle from "../../../components/Subtitle";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";
import { useAppDispatch } from "../../../store/hooks/hooks";
import { obtenerMonitoreo } from "../../../store/slices/Monitoreo/indexMonitoreo";

const MonitoreoScreen = () => {
  const stateInterface = {
    t008tiempoMonitoreo: "",
    botonGuardar: true,
  };
  const dispatch = useAppDispatch();
  const [botonGuardar, setBotonGuardar] = useState(stateInterface.botonGuardar);

  useEffect(() => {
    obtenerMonitoreo(dispatch);
  }, []);

  const monitoreo = useSelector((state) => state);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitAplicar = (data) => {
    // const update = {
    //   ...data,
    //   idMonitoreo: monitoreo[0]?.idMonitoreo,
    // };
    CrearMonitoreo(dispatch, data);
    console.log("data", data);
    setBotonGuardar(true);
    // reset(defaultValues);
  };
  const CrearMonitoreo = async (dispatch, stateInterface) => {
    if (!botonGuardar) {
      await clienteEstaciones
        .put("Monitoreo", stateInterface)
        .then(() => {
          Swal.fire({
            title: "Correcto",
            text: "El tiempo de monitoreo se modifico de manera correcta",
            icon: "success",
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Hubo un error",
            text: "Hubo un error, intenta de nuevo",
          });
        });
    }
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <h3 className="mt-2 mb-0">Monitoreo</h3>
          <Subtitle title="Información general" mt={3} />
          <form className="container" onSubmit={handleSubmit(onSubmitAplicar)}>
            <div className="mt-3 row justify-content-center">
              <div className="text-center">
                <p>
                  {/* -------------------- REVISAR -----------------------*/}
                  {/* El sistema supervisa cada{" "}
                  <b>{monitoreo[0]?.t008tiempoMonitoreo}</b> minutos, el */}
                  Comportamiento del nivel de agua.
                </p>
              </div>
              <div className="col-12 col-md-3">
                <label className="text-terciary">
                  Frecuencia de Monitoreo <span className="text-danger">*</span>
                </label>
                <div className="d-flex align-items-end">
                  <input
                    type="number"
                    className="form-control border rounded-pill px-3 border border-terciary"
                    {...register("t008tiempoMonitoreo", { required: true })}
                  />
                  <label className="text-terciary">Minutos</label>
                </div>
                {errors.t008tiempoMonitoreo && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex">
              <button
                type="submit"
                className="btn text-capitalize mb-0 ms-auto mt-3"
                title="Aplicar"
                onClick={() => setBotonGuardar(false)}
              >
                <i className="fa-solid fs-3 fa-arrows-rotate"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default MonitoreoScreen;

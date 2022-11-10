import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  editarMonitoreAction,
  obtenerMonitoreoAction,
} from "../../../actions/monitoreoAction";
import Subtitle from "../../../components/Subtitle";

const defaultValues = {
  t008tiempoMonitoreo: "",
};

const MonitoreoScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerMonitoreoAction());
  }, []);

  const { monitoreo } = useSelector((state) => state.monitoreoEstaciones);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitAplicar = (data) => {
    const update = {
      ...data,
      idMonitoreo: monitoreo[0]?.idMonitoreo,
    };

    dispatch(editarMonitoreAction(update));
    reset(defaultValues);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <h3 className="mt-2 mb-0">Monitoreo</h3>
          <Subtitle title="Informacion de general" mt={3} />
          <form className="container" onSubmit={handleSubmit(onSubmitAplicar)}>
            <div className="mt-3 row justify-content-center">
              <div className="text-center">
                <p>
                  El sistema supervisa cada{" "}
                  <b>{monitoreo[0]?.t008tiempoMonitoreo}</b> minutos, el
                  comportamiento del nivel de agua.
                </p>
              </div>
              <div className="col-12 col-md-3">
                <label className="text-terciary">
                  Frecuencia de Monitoreo:{" "}
                  <span className="text-danger">*</span>
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
                className="btn bg-gradient-primary text-capitalize mb-0 ms-auto mt-3"
              >
                Aplicar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default MonitoreoScreen;

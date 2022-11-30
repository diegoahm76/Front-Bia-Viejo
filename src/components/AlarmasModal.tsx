import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  crearAlarmaAction,
  editarAlarmaAction,
} from "../actions/alarmasActions";
import clienteEstaciones from "../config/clienteAxiosEstaciones";
import { getIndexBySelectOptions } from "../helpers/inputsFormat";
import { IEstaciones } from "../Interfaces/estaciones";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { crearAlarma, editarAlarma } from "../store/slices/alarmas/reducerAlarma";

const defaultValues = {
  t001nombre: "",
  t006rango: "",
  t006mensajeUp: "",
  t006mensajeDown: "",
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
    width: "500px",
    height: "auto",
  },
};

Modal.setAppElement("#root");

const AlarmasModal = ({
  isModalActive,
  setIsModalActive,
  handleSubmit,
  register,
  control,
  reset,
  errors,
  watch,
}) => {
  const [estacionesOptions, setEstacionesOptions] = useState<IEstaciones[]>([]);
  const [formValues, setFormValues] = useState({
    index_objectid: 0,
  });
  const { loading, alarmaAction, dataEdit } = useAppSelector(
    (state) => state.alarma
  );

  const dispatch = useAppDispatch();

  const handleCrearAlarma = async (data) => {
    crearAlarma(dispatch, data);
    // dispatch(crearAlarmaAction(data));
    // reset(defaultValues);
    setFormValues({ index_objectid: 0 });
  };

  const onSubmit = (data) => {
    if (alarmaAction === "editar") {
      data.objectid = estacionesOptions[formValues.index_objectid].value;
      editarAlarma(dispatch, data);
    } else {
      handleCrearAlarma(data);
    }
    setIsModalActive(false);
  };

  const getEstaciones = async () => {
    const { data } = await clienteEstaciones.get("Estaciones");
    const estacionesMaped = data.map((estacion) => ({
      label: estacion.t001nombre,
      value: estacion.objectid,
    }));
    setEstacionesOptions(estacionesMaped);
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
    setFormValues({ ...formValues, index_objectid: 0 });
    reset(defaultValues);
  };

  const handleResetDataEdit = () => {
    setFormValues({
      ...formValues,
      index_objectid: getIndexBySelectOptions(
        dataEdit?.objectid,
        estacionesOptions
      ),
    });
    reset(dataEdit);
  };

  useEffect(() => {
    getEstaciones();
  }, []);

  useEffect(() => {
    handleResetDataEdit();
  }, [dataEdit]);

  return (
    <Modal
      isOpen={isModalActive}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="container p-3">
        <h4>{alarmaAction === "editar" ? "Editar Alarma" : "Nueva Alarma"}</h4>
        <hr className="rounded-pill hr-modal" />
        <form className="row" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12 mb-3">
            <label>
              Estación: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control border rounded-pill px-3"
              type="text"
              disabled={alarmaAction === "editar"}
              readOnly={alarmaAction === "editar"}
              {...register("t001Estaciones.t001nombre", { required: true })}
            />
            {errors.t001nombre && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          {/* <div className="col-12 mb-3">
            <label className="form-label">
              Estación: <span className="text-danger">*</span>
            </label>
            <Controller
              name="objectid"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  value={estacionesOptions[formValues.index_objectid]}
                  onChange={(e) => {
                    reset({ ...watch(), objectid: e.value });
                    setFormValues({
                      ...formValues,
                      index_objectid: getIndexBySelectOptions(
                        e.value,
                        estacionesOptions
                      ),
                    });
                  }}
                  options={estacionesOptions}
                  placeholder="Seleccionar"
                />
              )}
            />
            {errors.objectid && (
              <div className="col-12 mb-3">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div> */}
          <div className="col-12 mb-3">
            <label>
              Rango: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control border rounded-pill px-3"
              type="text"
              {...register("t006rango", { required: true })}
            />
            {errors.t006rango && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12 mb-3">
            <label>
              Mensaje Alarma: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control border rounded-pill px-3"
              type="text"
              {...register("t006mensajeUp", { required: true })}
            />
            {errors.t006mensajeUp && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12 mb-3">
            <label>
              Mensaje No Alarma: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control border rounded-pill px-3"
              type="text"
              {...register("t006mensajeDown", { required: true })}
            />
            {errors.t006mensajeDown && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12 mb-3">
            <label>
              Periodo: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control border rounded-pill px-3"
              type="text"
              {...register("t006periodo", { required: true })}
            />
            {errors.t006periodo && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12 mb-3">
            <label>
              Base: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control border rounded-pill px-3"
              type="text"
              {...register("t006periodoBase", { required: true })}
            />
            {errors.t006periodo && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12 mb-3">
            <label>
              Tolerancia: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control border rounded-pill px-3"
              type="text"
              {...register("t006tolerancia", { required: true })}
            />
            {errors.t006tolerancia && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12 mb-3">
            <label>
              Desconexión: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control border rounded-pill px-3"
              type="text"
              {...register("t006periodoDesconexion", { required: true })}
            />
            {errors.t006periodoDesconexion && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button
              type="button"
              className="btn bg-gradient-light text-capitalize mb-0"
              disabled={loading}
              onClick={() => handleCloseModal()}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Cargando...
                </>
              ) : (
                "Cancelar"
              )}
            </button>
            <button
              type="submit"
              className="btn bg-gradient-primary text-capitalize mb-0"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Cargando...
                </>
              ) : alarmaAction === "editar" ? (
                "Actualizar"
              ) : (
                "Crear"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default AlarmasModal;

import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  crearAlarmaAction,
  editarAlarmaAction,
} from "../actions/alarmasActions";
import clienteEstaciones from "../config/clienteAxiosEstaciones";
import { getIndexBySelectOptions } from "../helpers/inputsFormat";

const defaultValues = {
  t006nombre: "",
  objectid: "",
  t006color: "",
  t006limite: "",
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
  const [estacionesOptions, setEstacionesOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    index_objectid: "",
  });
  const { loading, alarmaAction, dataEdit } = useSelector(
    (state) => state.alarmas
  );

  const dispatch = useDispatch();

  const handleCrearAlarma = async (data) => {
    dispatch(crearAlarmaAction(data));
    reset(defaultValues);
    setFormValues({ index_objectid: "" });
  };

  const onSubmit = (data) => {
    if (alarmaAction === "editar") {
      data.objectid = estacionesOptions[formValues.index_objectid].value;
      console.log("Entro aca", data);
      dispatch(editarAlarmaAction(data));
    } else {
      console.log(data);
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
    setFormValues({ ...formValues, index_objectid: "" });
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
        <hr />
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
              Mensaje Up: <span className="text-danger">*</span>
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
              Mensaje Down: <span className="text-danger">*</span>
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
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button
              type="button"
              className="btn bg-gradient-light text-capitalize"
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
              className="btn bg-gradient-primary text-capitalize"
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

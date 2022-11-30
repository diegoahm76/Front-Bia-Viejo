import React, { useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { editarAlarmaConfigAction } from "../actions/alarmasConfigActions";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import { editarAlarmasConfig } from "../store/slices/alarmasConfig/indexAlarmasConfig";

const defaultValues = {
  t001nombre: "",
  t007periodo: "",
  t007periodoBase: "",
  t007tolerancia: "",
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

const AlarmasConfigModal = ({
  isModalActive,
  setIsModalActive,
  handleSubmit,
  register,
  control,
  reset,
  errors,
  watch,
}) => {
  const { loading, dataEdit } = useAppSelector((state) => state.alarma);

  const dispatch = useAppDispatch();

  const onSubmit = (data) => {
    data.t007periodoBase = Number(data.t007periodoBase);
    console.log("data en el submit", data);
    editarAlarmasConfig(dispatch, data);
    setIsModalActive(false);
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
    reset(defaultValues);
  };

  useEffect(() => {
    reset(dataEdit);
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
        <h4 className="">Editar alarma configuración</h4>
        <hr className="rounded-pill hr-modal" />
        <form className="row" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12 mb-3">
            <label>
              Estación: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control border rounded-pill px-3"
              type="text"
              disabled
              readOnly
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
          <div className="col-12 mb-3">
            <label>
              Periodo: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control border rounded-pill px-3"
              type="number"
              {...register("t007periodo", { required: true })}
            />
            {errors.t007periodo && (
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
              type="number"
              {...register("t007periodoBase", { required: true })}
            />
            {errors.t007periodoBase && (
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
              type="number"
              {...register("t007tolerancia", { required: true })}
            />
            {errors.t007tolerancia && (
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
              ) : (
                "Actualizar"
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default AlarmasConfigModal;

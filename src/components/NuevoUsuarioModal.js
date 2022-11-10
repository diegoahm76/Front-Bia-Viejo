import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useEffect, useState } from "react";
import clienteEstaciones from "../config/clienteAxiosEstaciones";
import { crearNuevoUsuarioAction } from "../actions/estacionActions";

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

const defaultValues = {
  nombreUsuario: "",
  estacion: "",
  numeroDeTelefono: "",
  observacion: "",
};

const NuevoUsuarioModal = ({ isModalActive, setIsModalActive }) => {
  const dispatch = useDispatch();
  const [estacionesOptions, setEstacionesOptions] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getEstaciones = async () => {
      const { data: dataGetEstaciones } = await clienteEstaciones.get(
        "Estaciones"
      );
      const estacionesMaped = dataGetEstaciones.map((estacion) => ({
        label: estacion.t001nombre,
        value: estacion.objectid,
      }));
      setEstacionesOptions(estacionesMaped);
    };
    getEstaciones();
  }, []);

  const onSumbitEstacion = async (data) => {
    const nuevoUsuario = {
      objectid: data.estacion.value,
      t005nombre: data.nombreUsuario,
      t005numeroCelular: data.numeroDeTelefono,
      t005Observacion: data.observacion,
    };

    dispatch(crearNuevoUsuarioAction(nuevoUsuario));

    setIsModalActive(!isModalActive);
    reset(defaultValues);
  };

  return (
    <Modal
      isOpen={isModalActive}
      //onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="container p-3">
        <h4>Nuevo usuario</h4>
        <hr className="rounded-pill hr-modal" />
        <form className="row" onSubmit={handleSubmit(onSumbitEstacion)}>
          <div className="col-12 mb-3">
            <label>
              Parte Interesada: <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control border rounded-pill px-3"
              {...register("nombreUsuario", { required: true })}
            />
            {errors.nombreUsuario && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">
              Estación: <span className="text-danger">*</span>
            </label>
            <Controller
              name="estacion"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={estacionesOptions}
                  placeholder="Seleccionar"
                />
              )}
            />
            {errors.estacion && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12">
            <label>
              Número Celular: <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control border rounded-pill px-3"
              {...register("numeroDeTelefono", { required: true })}
            />
            {errors.numeroDeTelefono && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12 mt-3 mb-3">
            <label>Observación:</label>
            <textarea
              className="form-control border rounded-pill px-3"
              placeholder="Observación"
              {...register("observacion", { required: true })}
            />
            {errors.observacion && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>

          <div className="d-flex gap-3 justify-content-end">
            <button
              className="btn bg-gradient-light text-capitalize mt-4 mb-0"
              type="button"
              onClick={() => {
                setIsModalActive(!isModalActive);
                reset(defaultValues);
              }}
            >
              Cerrar
            </button>
            <button
              className="btn bg-gradient-primary text-capitalize mt-4 mb-0"
              type="submit"
              //onClick={() => setIsModalActive(!isModalActive)}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default NuevoUsuarioModal;

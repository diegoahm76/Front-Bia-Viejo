import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import clienteEstaciones from "../config/clienteAxiosEstaciones";
import { editarUsuarioAction } from "../actions/estacionActions";
import { getIndexBySelectOptions } from "../helpers/inputsFormat";

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

const EditarUsuarioModal = ({ isModalActive, setIsModalActive }) => {
  const dispatch = useDispatch();
  const [estacionesOptions, setEstacionesOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    index_objectid: "",
  });
  const usuarioEditar = useSelector((state) => state.estaciones);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
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

  const handleResetDataEdit = () => {
    setFormValues({
      ...formValues,
      index_objectid: getIndexBySelectOptions(
        usuarioEditar?.objectid,
        estacionesOptions
      ),
    });
    reset(usuarioEditar);
  };

  useEffect(() => {
    handleResetDataEdit();
  }, [usuarioEditar]);

  const onSumbitEstacion = async (data) => {
    const editarUsuario = {
      t005Identificacion: data.t005Identificacion,
      objectid: estacionesOptions[formValues.index_objectid].value,
      t005nombre: data.t005nombre,
      t005numeroCelular: data.t005numero,
      idUsuario: usuarioEditar.idUsuario,
      t005Observacion: data.t005Observacion,
    };

    //console.log("editar", editarUsuario)

    //dispatch(editarUsuarioAction(editarUsuario));
    editarUsuarioAction(editarUsuario);
    setIsModalActive(!isModalActive);
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
              Nombre de usuario: <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control border rounded-pill px-3"
              {...register("t005nombre", { required: true })}
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
          </div>

          <div className="col-12">
            <label>
              Numero de telefono: <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control border rounded-pill px-3"
              {...register("t005numeroCelular", { required: true })}
            />
            {errors.t005numeroCelular && (
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
              {...register("t005Observacion", { required: true })}
            />
            {errors.t005Observacion && (
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
              onClick={() => setIsModalActive(!isModalActive)}
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
export default EditarUsuarioModal;

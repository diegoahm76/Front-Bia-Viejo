import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { editarEstacionAction } from "../actions/estacionActions";
import iconoCancelar from "../assets/iconosBotones/cancelar.svg";
import iconoGuardar from "../assets/iconosBotones/guardar.svg";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import {
  editarEstacion,
  setEstacionEditar,
} from "../store/slices/administradorEstaciones/indexAdministradorEstaciones";
// import { editarEstacion } from "../store/slices/administradorEstaciones/indexAdministradorEstaciones";

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

const editModelEstacion = {
  objectid: 0,
  t001nombre: "",
  t001coord1: 0,
  t001coord2: 0,
  t001fechaMod: "",
  t001userMod: "",
};
const editModelusu = {
  idUsuario: 0,
  objectid: 0,
  t001Estaciones: "",
  t005identificacion: 0,
  t005nombre: "",
  t005apellido: "",
  t005correo: "",
  t005numeroCelular: 0,
  t005Observacion: "",
};
const EditarEstacionModal = ({ isModalActive, setIsModalActive }) => {
  const [dataEdit, setDataEdit] = useState(editModelEstacion);
  const [dataEditar, setDataEditar] = useState(editModelusu);
  const dispatch = useAppDispatch();
  //pendiente revisar usuarios
  // const nombre_de_usuario = useAppSelector((state) => state.user.user);
  const usuarioEditar = useAppSelector(
    (state) => state.usuarioEstaciones.UsuarioEditar
  );
  const estaciones = useAppSelector(
    (state) => state.administradorEstacionesSlice.estacionEditar
  );
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    createModelEdit();
  }, [estaciones]);

  const createModelEdit = () => {
    const data = { ...dataEdit };
    data.objectid = estaciones.objectid;
    data.t001coord1 = estaciones.t001coord1;
    data.t001coord2 = estaciones.t001coord2;
    data.t001fechaMod = estaciones.t001fechaMod;
    data.t001nombre = estaciones.t001nombre;
    data.t001userMod = estaciones.t001userMod;
    setDataEdit(data);
  }
  useEffect(() => {
    createModelEditUsuario();
  }, [usuarioEditar]);

  const createModelEditUsuario = () => {
    const data = { ...dataEditar };
    data.objectid = usuarioEditar.objectid;
    data.t005nombre = usuarioEditar.t005nombre;
    data.t005apellido = usuarioEditar.t005apellido;
    data.t005correo = usuarioEditar.t005correo;
    data.t005numeroCelular = usuarioEditar.t005numeroCelular;
    data.t005Observacion = usuarioEditar.t005Observacion;
    setDataEditar(data);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataEdit({ ...dataEdit, [name]: value });
  }

  const onSumbitEstacion = () => {
    const dataChange = { ...dataEdit };
    dataChange.t001fechaMod = new Date().toISOString();
    editarEstacion(dispatch, dataChange);
    setIsModalActive(!isModalActive);
  };

  return (
    <Modal
      isOpen={isModalActive}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="container p-3">
        <h4>Editar Usuario</h4>
        <hr className="rounded-pill hr-modal" />
        <form className="row" onSubmit={handleSubmit(onSumbitEstacion)}>
          <div className="col-12">
            <div className="mt-3">
              <label>
                OBJECTID: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="number"
                name="objectid"
                disabled={true}
                value={dataEdit.objectid}
                onChange={handleChange}
              />
            </div>
            {errors.objectId && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12">
            <div className="mt-3">
              <label>
                Nombre: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="string"
                name="t005nombre"
                disabled={false}
                value={usuarioEditar.t005nombre}
                onChange={handleChange}
              />
            </div>
            {errors.objectId && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12">
            <div className="mt-3">
              <label>
                Apellido: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="string"
                name="t005apellido"
                disabled={false}
                value={usuarioEditar.t005apellido}
                onChange={handleChange}
              />
            </div>
            {errors.objectId && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12">
            <div className="mt-3">
              <label>
                Estación: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                value={dataEdit.t001nombre}
                disabled={true}
                type="text"
              />
            </div>
            {errors.estacion && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12">
            <div className="mt-3">
              <label>
                Coordenada 1: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="text"
                name="t001coord1"
                value={dataEdit.t001coord1}
                onChange={handleChange}
              />
            </div>
            {errors.coordenada1 && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="col-12">
            <div className="mt-3">
              <label>
                Coordenada 2: <span className="text-danger">*</span>
              </label>
              <input
                className="form-control border rounded-pill px-3"
                type="text"
                name="t001coord2"
                value={dataEdit.t001coord2}
                onChange={handleChange}
              />
            </div>
            {errors.coordenada2 && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
          <div className="d-flex gap-3 justify-content-end">
            <button
              className="mb-0 btn-image text-capitalize bg-white border boder-none mt-4"
              type="button"
              title="Cancelar"
              onClick={() => setIsModalActive(!isModalActive)}
            >
              <i className="fa-solid fa-x fs-3"></i>
            </button>
            <button
              className="mb-0 btn-image text-capitalize bg-white border boder-none mt-4"
              type="submit"
              title="Guardar"
            >
              <i className="fa-regular fa-floppy-disk fs-3"></i>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default EditarEstacionModal;

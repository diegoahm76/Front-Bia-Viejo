import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import IconoEliminar from "../assets/iconosBotones/eliminar.svg";
import IconoEditar from "../assets/iconosBotones/editar.svg";
import IconoGuardar from "../assets/iconosBotones/guardar.svg";
import IconoCancelar from "../assets/iconosBotones/cancelar.svg";
import { useForm, Controller } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import Swal from "sweetalert2";
import {
  crearMarca,
  editarMarca,
  obtenerMarcasLista,
  seleccionarMarca,
  eliminarMarca,
  setMarcaSeleccionada,
} from "../store/slices/marca/indexMarca";
import clienteAxios from "../config/clienteAxios";
import { useAppSelector } from "../store/hooks/hooks";
import { IMarcaGet } from "../Interfaces/Marca";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
  },
};
Modal.setAppElement("#root");

const editState = {
  id_marca: 0,
  nombre: "",
  activo: false,
  item_ya_usado: false,
};

function CrearMarcaModal({ isModalActive, setIsModalActive }) {
  const [botonAdministrador, setBotonAdministrador] = useState(false);
  const [marcaEdit, setMarcaEdit] = useState(editState);

  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  const marcas = useAppSelector((state) => state.marca.marca);

  useEffect(() => {
    obtenerMarcasLista(dispatch);
  }, []);

  // Form

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarcaEdit({ ...marcaEdit, [name]: value });
  };
  const onSubmit = () => {
    const nombre = { nombre: marcaEdit.nombre };
    if (edit) {
      editarMarca(dispatch, marcaEdit);
      setEdit(false);
      setMarcaEdit(editState);
      obtenerMarcasLista(dispatch);
    } else {
      crearMarca(dispatch, nombre);
      setEdit(false);
      setMarcaEdit(editState);
      obtenerMarcasLista(dispatch);
    }
  };
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchData = async () => {
    try {
      setBotonAdministrador(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
  };

  const editarAction = (data) => {
    const dataEdit = { ...marcaEdit };
    dataEdit.nombre = data.nombre;
    dataEdit.activo = data.activo;
    dataEdit.item_ya_usado = data.item_ya_usado;
    dataEdit.id_marca = data.id_marca;
    // seleccionarMarca(dispatch, data);
    setMarcaEdit(dataEdit);
    setEdit(true);
  };

  const columnDefs = [
    { headerName: "Id Marca", field: "id_marca", minWidth: 140 },
    { headerName: "Marca", field: "nombre", minWidth: 140 },

    {
      headerName: "Acciones",
      field: "acciones",
      minWidth: 140,
      cellRendererFramework: (params) => (
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm btn-tablas btn-outline-ligth "
            type="button"
            onClick={() => editarAction(params.data)}
          >
            <i className="fa-regular fa-pen-to-square fs-4" title="Editar"></i>
          </button>
          <button
            className="btn btn-sm btn-tablas btn-outline-ligth"
            type="button"
            onClick={() => eliminarMarca(dispatch, params.data.id_marca)}
          >
            
            <i className="fa-regular fa-trash-can fs-4" title="Eliminar"></i>
          </button>

          
        </div>
      ),
    },
  ];
  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: false,
    suppressMovable: true,
  };

  return (
    <Modal
      isOpen={isModalActive}
      style={customStyles}
      className="modal"
      id="modal-marca-id"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="row">
        <div className="col-12 mx-auto">
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h4>Crear Marca</h4>
            <hr className="rounded-pill hr-modal" />
            <div className="row">
              <div className="col-12 col-md-6">
                <label className="text-terciary">Nombre</label>
                <input
                  name="nombre"
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="Nombre"
                  value={marcaEdit.nombre}
                  onChange={handleChange}
                  required
                />
                {errors.nombre && (
                  <div className="col-12">
                    <small
                      className="text-center text-danger"
                      style={{ fontSize: "12px" }}
                    >
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-primary text-capitalize border rounded-pill px-3"
                onClick={() => fetchData()}
              >
                Administrador
              </button>
              <button
                type="button"
                className="btn btn-sm btn-tablas btn-outline-ligth"
                onClick={() => setIsModalActive(false)}
                placeholder="Cancelar"
              >
                <img src={IconoCancelar} alt="cancelar" />
              </button>

              <button
                type="submit"
                className="btn btn-sm btn-tablas btn-outline-ligth"
              >
                <img src={IconoGuardar} alt="guardar" />
              </button>
            </div>
          </form>
          {botonAdministrador === true ? (
            <form>
              <div className="row">
                <div id="myGrid" className="ag-theme-alpine ">
                  <div className="ag-theme-alpine" style={{ height: "400px" }}>
                    <AgGridReact
                      columnDefs={columnDefs}
                      rowData={marcas}
                      defaultColDef={defaultColDef}
                    ></AgGridReact>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
    </Modal>
  );
}
export default CrearMarcaModal;

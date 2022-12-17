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
import { IMarcaModel } from "../Interfaces/marca";

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
  const marcas = useAppSelector((state) => state.marca.marcas);

  useEffect(() => {
    const getMarcas = async () => obtenerMarcasLista(dispatch);
    getMarcas();
  }, [marcas]);

  // Form

  const handleChange = (e) => {
    const { name, value } = e.target.value;
    
    setMarcaEdit({ ...marcaEdit, [name]: value });
    debugger
  };
  const onSubmit = (data) => {
    if (edit) {
      editarMarca(dispatch, marcaEdit);
    } else {
      crearMarca(data);
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
    seleccionarMarca(dispatch, data);
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
            className="btn btn-sm btn-tablas btn-outline-ligth"
            type="button"
            onClick={() => eliminarMarca(dispatch, params.data.id_marca)}
          >
            <img src={IconoEliminar} alt="eliminar" />
          </button>

          <button
            className="btn btn-sm btn-tablas btn-outline-ligth "
            type="button"
            onClick={() => editarAction(params.data)}
          >
            <img src={IconoEditar} alt="editar" />
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
                  value={editState.nombre}
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

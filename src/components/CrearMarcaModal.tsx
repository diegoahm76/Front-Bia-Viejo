import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import IconoEliminar from "../assets/iconosBotones/eliminar.svg";
import IconoEditar from "../assets/iconosBotones/editar.svg";
import IconoGuardar from "../assets/iconosBotones/guardar.svg";
import IconoCancelar from "../assets/iconosBotones/cancelar.svg";
import { useForm, Controller } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";

import clienteAxios from "../config/clienteAxios";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import Swal from "sweetalert2";
import { crearMarca, eliminarMarca, obtenerMarcasLista } from "../store/slices/marca/indexMarca";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";

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
const marcaSelect = {
  nombre: ""
}

function CrearMarcaModal({ isModalActive, setIsModalActive }) {
  //REDUX

  const dispatch = useAppDispatch();
  const marca = useAppSelector((state) => state.marcaReducer.marcas);

  const fetchData = () => {
    obtenerMarcasLista(dispatch);
    setTablaMarcas(true);
  }
  //MAQUETADO

  const [tablaMarcas, setTablaMarcas] = useState(false);
  const [modelMarca, setModelMarca] = useState(marcaSelect);

  const handleCloseModal = () => {
    setIsModalActive(false);
  };

  const enviarFormulario = () => {
    crearMarca(modelMarca);
    fetchData();
  };

  const handleChange = (e) => {
    const data = { ...modelMarca }
    data.nombre = e.target.value;
    setModelMarca(data);
  }

  const confirmarEliminarMarca = (id_marca) => {
    const elementModalId = document.getElementById("marcaModal")!;
    Swal.fire({
      target: elementModalId,
      title: "Estas seguro?",
      text: "Una marca que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarMarca(dispatch, id_marca);
      }
    });
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
            onClick={() => confirmarEliminarMarca(params.data.id_marca)}
          >
            <img src={IconoEliminar} alt="eliminar" />

          </button>

          <button
            className="btn btn-sm btn-tablas btn-outline-ligth "
            type="button"
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
      id="marcaModal"
      isOpen={isModalActive}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="row ">
        <div className="col-12 mx-auto">
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            id="marcaForm"
          >
            <h4>Creación de marca</h4>
            <hr className="rounded-pill hr-modal" />

            <div className="row">
              <div className="col-12 col-md-6 mt-3">
                <label className="text-terciary">Nombre:</label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  required={true}
                  value={modelMarca.nombre}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6 mt-3">
                <button
                  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill px-3"
                  onClick={fetchData}
                >
                  Administración de marcas
                </button>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-sm btn-tablas btn-outline-ligth"
                  onClick={enviarFormulario}
                >
                  <img src={IconoGuardar} alt="guardar" />
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-tablas btn-outline-ligth"
                  onClick={() => handleCloseModal()}
                >
                  <img src={IconoCancelar} alt="cancelar" />
                </button>
              </div>
              {tablaMarcas == true ? (
                <div className="multisteps-form__content">
                  <div>
                    <div
                      className="ag-theme-alpine mt-auto mb-3 px-4"
                      style={{ height: "470px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs}
                        rowData={marca}
                        defaultColDef={defaultColDef}
                      ></AgGridReact>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div >
    </Modal >
  );
};
export default CrearMarcaModal;
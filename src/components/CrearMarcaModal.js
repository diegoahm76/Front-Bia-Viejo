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
import { crearMarcaAction , eliminarMarcaAction } from "../actions/creacionMarcaActions";
import Axios from "axios";
import Swal from "sweetalert2";

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

function CrearMarcaModal ({ isModalActive, setIsModalActive }){
  //REDUX

  const dispatch = useDispatch();

  const [marca, setMarca] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios({
          url: "https://web-production-e5dc.up.railway.app/api/almacen/marcas/get-list/",
        });

        setMarca(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //MAQUETADO

  const [tablaMarcas, setTablaMarcas] = useState(false);

  const handleCloseModal = () => {
    setIsModalActive(false);
  };

  const onSubmit = (data) => {
    //redux
    const marca = {
      ...data
    };
    dispatch(crearMarcaAction(marca));
  };

  // useEffect(() => {
  //   const getMarca = async () => dispatch(obtenerMarcaAction());
  //   getMarca();
  // }, []);

  // const {data} = useSelector((state) => state.data);
  // console.log("datooos",data)

  const confirmarEliminarMarca = (id_marca) => {
    Swal.fire({
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
        //Pasarlo al action
        dispatch(eliminarMarcaAction(id_marca));
      }
    });
  };

  const { handleSubmit, register, reset: resetSearch } = useForm();

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
            onClick={()=>confirmarEliminarMarca(params.data.id_marca)}
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
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
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
                  {...register("nombre")}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary text-capitalize border rounded-pill px-3"
                  onClick={() => setTablaMarcas(!tablaMarcas)}
                >
                  Administración de marcas
                </button>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="submit"
                  className="btn btn-sm btn-tablas btn-outline-ligth"
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
                        rowData={marca?.data}
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
      </div>
    </Modal>
  );
};
export default CrearMarcaModal;
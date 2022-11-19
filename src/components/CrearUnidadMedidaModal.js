import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import IconoEditar from "../assets/iconosEstaciones/edit-svgrepo-com.svg";
import IconoEliminar from "../assets/iconosEstaciones/rubbish-delete-svgrepo-com.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  crearNuevaUnidadMedidaAction,
  obtenerUnidadMedidaAction,
} from "../actions/unidadMedidaActions";
import Select from "react-select";
import clienteAxios from "../config/clienteAxios";
import { textChoiseAdapter } from "../adapters/textChoices.adapter";
import Axios from 'axios'
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
    height: "auto",
  },
};
Modal.setAppElement("#root");

function CrearUnidadMedidaModal({ isModalActive, setIsModalActive }) {
  const [botonAdministrador, setBotonAdministrador] = useState(false);
  const [magnitudesOptions, setMagnitudesOptions] = useState([]);
  const {
    register,
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const unidadMedidaCreate = {
      ...data,
      id_magnitud: data.id_magnitud.value,
    };
    console.log("viene de accion",unidadMedidaCreate)
    dispatch(crearNuevaUnidadMedidaAction(unidadMedidaCreate));
  };
  const [unidades, setUnidades] = useState([])
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await Axios({
                url: "https://web-production-e5dc.up.railway.app/api/almacen/unidades-medida/get-list/",
            });

            setUnidades(response);
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
}, []);
  

  const columnUnidadMedida = [
    { headerName: "Id unidad medida", field: "id_unidad_medida", minWidth: 150 },
    { headerName: "Nombre", field: "nombre", minWidth: 150 },
    { headerName: "Abreviatura", field: "abreviatura", minWidth: 150 },
    { headerName: "Magnitud", field: "id_magnitud", minWidth: 150 },
    {
      headerName: "Acciones",
      field: "acciones",
      minWidth: 140,
      cellRendererFramework: (params) => (
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm btn-tablas btn-outline-warning "
            type="button"
            // onClick={() => EditarBodega(params.data)}
          >
            <img src={IconoEditar} alt="editar" />
          </button>
          <button
            className="btn btn-sm btn-tablas btn-outline-danger"
            type="button"
            // onClick={() => confirmarEliminarBodega(params.data.id_bodega)}
          >
            <img src={IconoEliminar} alt="eliminar" />
          </button>
        </div>
      ),
    },
  ];
  let gridApi;
  useEffect(() => {
    const getSelectsOptions = async () => {
      try {
        const { data: magnitudesNoFormat } = await clienteAxios.get(
          "almacen/choices/magnitudes/"
        );
        const magnitudesFormat = textChoiseAdapter(magnitudesNoFormat);
        setMagnitudesOptions(magnitudesFormat);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);


  useEffect(() => {
    const getUnidadMedida =async () => dispatch(obtenerUnidadMedidaAction());
    getUnidadMedida();
  console.log("unidad", getUnidadMedida)
  }, []);

  // const { unidad } = useSelector((state) => state?.unidad);
  // console.log("unidadMedida", unidad)

  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: true,
    suppressMovable: true,
  };

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  return (
    <Modal
      isOpen={isModalActive}
      style={customStyles}
      className="modal"
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
            <h4>Crear unidad de medida</h4>
            <hr className="rounded-pill hr-modal" />
            <div className="row">
              <div className="col-12 col-md-6">
                <label className="text-terciary">Nombre</label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="Nombre"
                  {...register("nombre")}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="text-terciary">Abreviatura</label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="abreviatura"
                  {...register("abreviatura")}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className=" text-terciary">Magnitud</label>
                <Controller
                  name="id_magnitud"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={magnitudesOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.id_magnitud && (
                  <div className="col-12">
                    <small className="text-center text-danger">
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
                onClick={() => setBotonAdministrador(!botonAdministrador)}
              >
                Administrador
              </button>
              <button
                type="button"
                className="btn btn-danger text-capitalize border rounded-pill px-3"
                onClick={() => setIsModalActive(false)}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="btn btn-primary text-capitalize border rounded-pill px-3"
              >
                Guardar
              </button>
            </div>
          </form>
          {botonAdministrador === true ? (
            <form>
              <div className="row">
                <div id="myGrid" className="ag-theme-alpine ">
                  <div className="ag-theme-alpine" style={{ height: "400px" }}>
                    <AgGridReact
                      columnDefs={columnUnidadMedida}
                      rowData={unidades?.data}
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

export default CrearUnidadMedidaModal;

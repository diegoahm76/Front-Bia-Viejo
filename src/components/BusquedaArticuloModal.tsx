import Modal from "react-modal";
import { useForm, Controller } from 'react-hook-form';
import Subtitle from "./Subtitle";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { obtenerArticulos } from "../store/slices/mantenimiento/indexMantenimiento";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
import Select from 'react-select';

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

const opcTipos = [
  { label: 'computadores', value:'Com'},
  { label: 'No se que es xd', value:'OAc'},
  { label: 'vehiculos', value:'Veh'}
]

Modal.setAppElement("#root");
interface parameters {
  isModalActive: boolean, setIsModalActive: any, setModel?: any, articuloModel?: any
}
const BusquedaArticuloModal = ({ isModalActive, setIsModalActive, setModel, articuloModel }: parameters) => {
  const dispatch = useAppDispatch();
  const articulos = useAppSelector((state) => state.mantenimiento);
  // const [filtersSearch, setFiltersSearch] = useState({ codigo: "", nombre: "" });
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();

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


  const getArticulos = () => {
    obtenerArticulos(dispatch, articuloModel.cod_tipo_activo, articuloModel.nombre, articuloModel.doc_identificador_nro.value)
  }

  const seleccionarArticulo = (datos) => {
    const modelo = { ...articuloModel }
    modelo.codigo_bien = datos.codigo_bien;
    modelo.nombre = datos.nombre;
    modelo.marca = {
      label: datos.marca,
      value: datos.id_marca
    };
    modelo.cod_tipo_bien = datos.cod_tipo_bien;
    modelo.serial = datos.doc_identificador_nro;
    modelo.modelo = "";
    modelo.kilometro = "";
    modelo.id_articulo = datos.id_bien;
    modelo.id_porcentaje_iva = datos.id_porcentaje_iva
    setModel(modelo);
    handleClose();
  }
  const handleOpenAgregarProducto = () => {
    setIsModalActive(true);
  };

  const handleClose = () => {
    setIsModalActive(false);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setModel({ ...articuloModel, [name]: value })
  // }

  const changeBusquedaArticulo = (e) => {
    const { name, value } = e.target;
    setModel({...articuloModel, [name]:value});
  }

  const changeSelectTipoCod = (e) => {
    let tipoCod = {...articuloModel};
    tipoCod.doc_identificador_nro = {
      value: e.value,
      label: e.label
    }

    setValue('doc_identificador_nro', tipoCod.doc_identificador_nro);
    setModel(tipoCod);
  }

  const onSubmit = (data) => { };
  const columnDefs = [
    {
      headerName: "Codigo",
      field: "codigo_bien",
      minWidth: 180,
    },
    {
      headerName: "Nombre",
      field: "nombre",
      minWidth: 140,
    },
    {
      headerName: "Tipo Activo",
      field: "cod_tipo_activo",
      minWidth: 140,
    },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          <div>
            <button
              className="btn btn-sm btn-tablas btn-outline-primary"
              type="button"
              onClick={() => seleccionarArticulo(params.data)}
            >
              Seleccionar
            </button>
          </div>
        </div>
      ),
      minWidth: 150,
    },
  ];

  return (
    <Modal
      id="modalArticulosId"
      isOpen={isModalActive}
      onRequestClose={handleClose}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="row min-vh-100 ">
        <div className="col-12 mx-auto">
          <h3 className="fw-light mt-4 mb-2">
            Busqueda de artículo
          </h3>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <Subtitle title="Información del articulo" mb={3} />
              <div className="col-12 col-sm-4 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Codigo Bien</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="Codigo"
                    {...register('cod_tipo_activo')}
                    value={articuloModel.cod_tipo_activo}
                    onChange={changeBusquedaArticulo}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-4 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Nombre</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="nombre"
                    value={articuloModel.nombre}
                    {...register('nombre')}
                    onChange={changeBusquedaArticulo}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-4 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Tipo Activo</label>
                  <Controller
                    name="options"
                    control={control}
                    rules={{required: false}}
                    render={({field}) => (
                      <Select
                        {...field}
                        options={opcTipos}
                        placeholder='Seleccionar'
                        {...register('doc_identificador_nro')}
                        value={articuloModel.doc_identificador_nro}
                        onChange={changeSelectTipoCod}
                      />
                    )}
                  />

                </div>
              </div>
              <div className="col-12 col-sm-4 mt-4">
                <button
                  className="btn me-md-2  text-capitalize  px-3 mt-2"
                  type="button"
                  title="Buscar"
                  onClick={getArticulos}
                >
                  <i className="fa-solid fa-magnifying-glass fs-3"></i>
                </button>
              </div>
            </div>
            <div
              className="ag-theme-alpine mt-4 mb-4"
              style={{ height: "300px" }}
            >
              <AgGridReact
                columnDefs={columnDefs}
                rowData={articulos.articulos}
                defaultColDef={defaultColDef}
              ></AgGridReact>
            </div>


            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
              <button
                className="btn  text-capitalize px-3"
                type="button"
                onClick={handleClose}
                title="Send"
              >
                <i className="fa-solid fa-x fs-3"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default BusquedaArticuloModal;

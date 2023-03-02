import React, { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import Subtitle from "../../../components/Subtitle";
import CrearPorcentajeIvaModal from "../../../components/CrearPorcentajeIvaModal";
import CrearMarcaModal from "../../../components/CrearMarcaModal";
import CrearUnidadMedidaModal from "../../../components/CrearUnidadMedidaModal";

const CreacionMarcasScreen = () => {
  const [rowsoliconsu] = useState([
    {
      codigo: "2200200001",
      nombre: "Resma de papel",
      cantidad: "10",
    },
    {
      codigo: "2200200002",
      nombre: "fabuloso",
      cantidad: "9",
    },
    {
      codigo: "2200200003",
      nombre: "jabon en polvo",
      cantidad: "13",
    },
    {
      codigo: "2200200004",
      nombre: "carpetas tamaño carta",
      cantidad: "6",
    },
  ]);

  const columsoliconsu = [
    { headerName: "Codigo bien", field: "codigo", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Nombre",
      field: "nombre",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Cantidad",
      field: "cantidad",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button className="btn text-capitalize " type="button"
          >
            <i className="fa-regular fa-trash-can fs-4" title="Eliminar"></i>
          </button>
        </div>
      ),
      minWidth: 150,
      maxWidth: 200,
    },
  ];


  const defaultColDef = {
    sortable: true,
    editable: false,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: true,
    suppressMovable: true,
  };


  const [page, setPage] = useState(1);

  const submit = (data) => {
    if (page === 1) setPage(2);
    if (page === 2) console.log(data);
  };

  const handlePreviousPage = () => {
    setPage(1);
  };


  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => { };

  const [crearPorcentajeOpen, setCrearPorcentajeOpen] = useState(false);
  const handleOpenModalIva = () => {
    setCrearPorcentajeOpen(true);
  };

  const [crearMarcaOpen, setCrearMarcaOpen] = useState(false);
  const [crearUnidadMedidaOpen, setCrearUnidadMedidaOpen] = useState(false);
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <div className="col-6 col-sm-3 d-grid gap-2 d-md-flex justify-content-md-rigth mt-3">
            <button
              type="button"
              className="btn btn-primary text-capitalize border rounded-pill px-3 mt-3 btn-min-width"
              onClick={handleOpenModalIva}
            >
              Crear porcentaje de iva
            </button>
          </div>
          <div className="col-6 col-sm-3 d-grid gap-2 d-md-flex justify-content-md-rigth mt-3">
            <button
              type="button"
              className=" btn btn-primary text-capitalize border rounded-pill px-3 mt-3 btn-min-width"
              onClick={() => setCrearMarcaOpen(true)}
            >
              Crear marca
            </button>
          </div>
          <div className="col-6 col-sm-3 d-grid gap-2 d-md-flex justify-content-md-rigth mt-3">
                        <button
                          type="button"
                          className="btn btn-primary text-capitalize border rounded-pill px-3 mt-3 btn-min-width"
                          onClick={() => setCrearUnidadMedidaOpen(true)}
                        >
                          Crear unidad de medida
                        </button>
                      </div>
          <CrearPorcentajeIvaModal
            isModalActive={crearPorcentajeOpen}
            setIsModalActive={setCrearPorcentajeOpen}
          ></CrearPorcentajeIvaModal>
          <CrearMarcaModal
            isModalActive={crearMarcaOpen}
            setIsModalActive={setCrearMarcaOpen}
          />
          <CrearUnidadMedidaModal
        isModalActive={crearUnidadMedidaOpen}
        setIsModalActive={setCrearUnidadMedidaOpen}
      />
        </form>

      </div>
    </div>

  )
};

export default CreacionMarcasScreen;

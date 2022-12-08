import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Subtitle from "../../../components/Subtitle";
import { render } from "react-dom";
import { useNavigate } from "react-router-dom";

import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const CatalogoDeBienesScreen = () => {
  const [buscarProducto, setBuscarProducto] = useState(true);
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submit = (data) => {};

  const gridRef = useRef();

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "Nombre",
      minWidth: 300,
      cellRendererParams: {
        suppressCount: true,
      },
    };
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortable: false,
      resizable: false,
    };
  }, []);
  const [rowData, setRowData] = useState([
    {
      Nombre: ["Erica Rogers"],
      Acciones: "CEO",
      nivel: "1",
      id_bien: 0,
      id_padre: 0,
      hijo: true,
       cellRendererFramework: (params) => (
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm btn-tablas "
            type="button"
            title="Agregar"
            onClick={() => Articulo()}
          >
            <i className="fa-regular fa-plus fs-3"></i>
          </button>
          <button
            className="btn btn-sm btn-tablas "
            type="button"
            title="Ver"
            onClick={() => Articulo()}
          >
            <i className="fa-solid fa-eye"></i>
          </button>
        </div>
      ),
    },
    {
      Nombre: ["Erica Rogers", "Malcolm Barrett"],
      Acciones: "Exec. Vice President",
      nivel: "2",
      id_bien: 0,
      id_padre: 0,

      hijo: true,
    },

    {
      Nombre: ["Erica Rogers", "Malcolm Barrett", "Esther Baker"],
      Acciones: "Director of Operations",
      nivel: "3",

      id_bien: 0,
      id_padre: 0,

      hijo: true,
    },
    {
      Nombre: [
        "Erica Rogers",
        "Malcolm Barrett",
        "Esther Baker",
        "Brittany Hanson",
      ],
      Acciones: "Fleet Coordinator",
      nivel: "1",

      id_bien: 0,
      id_padre: 0,

      hijo: true,
    },
    {
      Nombre: [
        "Erica Rogers",
        "Malcolm Barrett",
        "Esther Baker",
        "Brittany Hanson",
        "Leah Flowers",
      ],
      Acciones: "Parts Technician",
      nivel: "Contract",

      id_bien: 0,
      id_padre: 0,

      hijo: true,
    },
    {
      Nombre: [
        "Erica Rogers",
        "Malcolm Barrett",
        "Esther Baker",
        "Brittany Hanson",
        "Tammy Sutton",
      ],
      Acciones: "Service Technician",
      nivel: "Contract",

      id_bien: 0,
      id_padre: 0,

      hijo: true,
    },
    {
      Nombre: ["Erica Rogers", "Malcolm Barrett", "Esther Baker", "Derek Paul"],
      Acciones: "Inventory Control",
      nivel: "1",

      id_bien: 0,
      id_padre: 0,

      hijo: true,
    },

    {
      Nombre: ["Erica Rogers", "Malcolm Barrett", "Francis Strickland"],
      Acciones: "VP Sales",
      nivel: "1",

      id_bien: 0,
      id_padre: 0,

      hijo: true,
    },
    {
      Nombre: [
        "Erica Rogers",
        "Malcolm Barrett",
        "Francis Strickland",
        "Morris Hanson",
      ],
      Acciones: "Sales Manager",
      nivel: "1",

      id_bien: 0,
      id_padre: 0,

      hijo: true,
    },
    {
      Nombre: [
        "Erica Rogers",
        "Malcolm Barrett",
        "Francis Strickland",
        "Todd Tyler",
      ],
      Acciones: "Sales Executive",
      nivel: "Contract",

      id_bien: 0,
      id_padre: 0,

      hijo: true,
    },
    {
      Nombre: [
        "Erica Rogers",
        "Malcolm Barrett",
        "Francis Strickland",
        "Bennie Wise",
      ],
      Acciones: "Sales Executive",
      nivel: "Contract",

      id_bien: 0,
      id_padre: 0,

      hijo: true,
    },
    {
      Nombre: [
        "Erica Rogers",
        "Malcolm Barrett",
        "Francis Strickland",
        "Joel Cooper",
      ],
      Acciones: "Sales Executive",
      nivel: "1",

      id_bien: 0,
      id_padre: 0,

      hijo: true,
    },
  ]);

  const getDataPath = useMemo(() => {
    return (data) => {
      return data.Nombre;
    };
  }, []);

  

  const [columnDefs, setColumnDefs] = useState([
    // we're using the auto group column by default!
    { field: "Acciones" },
  ]);

  const navigate = useNavigate();
  const CrearArticulo = () => {
    navigate(
      "/dashboard/Recaudo/gestor-notificacion/crear-entrada-articulos-fijos"
    );
  };
  const Articulo = () => {
    navigate("/dashboard/Recaudo/gestor-notificacion/entrada-articulos-fijos");
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <div className="row">
            <h3 className="text-rigth  fw-light mt-4 mb-2">
              {" "}
              Catálogo de bienes
            </h3>
            <div className="d-flex justify-content">
              <div className="d-grid d-flex">
                <button
                  className="btn-icon-blue btn px-3  mt-4 "
                  type="button"
                  title="Buscar"
                  onClick={() => setBuscarProducto(!buscarProducto)}
                >
                  <i className="fa-solid fa-magnifying-glass fs-3"></i>
                </button>
              </div>
              <div className="d-grid d-flex">
                <button
                  className="btn-icon-green btn px-3 mt-4"
                  type="button"
                  title="Agregar"
                  onClick={() => CrearArticulo()}
                >
                  <i className="fa-regular fa-plus fs-3"></i>
                </button>
              </div>
            </div>
            {buscarProducto === false ? (
              <div className="row">
                <Subtitle title={"Buscar artículo"}  />
                <div className="col-12 col-md-3">
                  <div>
                    <label className="ms-2 text-terciary">Código</label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="number"
                      {...register("codigo", {
                        required: true,
                      })}
                    />
                  </div>
                  {errors.numeroDocumento && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-3">
                  <div>
                    <label className="ms-2 text-terciary">Nombre</label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      {...register("nombre", {
                        required: true,
                      })}
                    />
                  </div>
                  {errors.numeroDocumento && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-3">
                  <label className="ms-3 text-terciary">Tipo de bien</label>
                  <Controller
                    name="tipo"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select {...field} placeholder="Seleccionar" />
                    )}
                  />
                  {errors.tipo && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-3">
                  <label className="ms-3 text-terciary">
                    {" "}
                    Tipo de activo <span className="text-danger">*</span>{" "}
                  </label>
                  <Controller
                    name="tipo2"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isDisabled
                        className="col-12"
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="multisteps-form__content mt-4">
              <div>
                <div
                  className="ag-theme-alpine mt-auto mb-3 px-4"
                  style={{ height: "470px" }}
                >
                  <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    autoGroupColumnDef={autoGroupColumnDef}
                    treeData={true}
                    animateRows={true}
                    groupDefaultExpanded={-1}
                    getDataPath={getDataPath}
                  ></AgGridReact>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CatalogoDeBienesScreen;

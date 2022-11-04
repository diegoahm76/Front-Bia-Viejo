import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";
import Subtitle from "../../../components/Subtitle";

export const RegistroDeBajaScreen = () => {
  const {
    register,
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [formValues, setFormValues] = useState({
    fechaIngreso: "",
  });

  const [rowDataDetalles] = useState([
    {
      ID: "0011",
      SerialPlaca: "446552SEFW66",
      Nombre: "20-02-01-0011 Computador Portatil Lenovo IdeaPad 5",
      Marca: "Lenovo",
      Justificacion: "Pantalla Rota",
      CDQR: "97811556331/Ver QR",
      ValorU: "$1500000",
    },
    {
      ID: "0021",
      SerialPlaca: "446552SEFW67",
      Nombre: "20-03-01-0021 Computador Portatil HP VICTUS con RTX PP",
      Marca: "rimax",
      Justificacion: "Patas Rotas",
      CDQR: "97811556332/Ver QR",
      ValorU: "$450000",
    },
  ]);

  const columnDetalles = [
    { headerName: "ID unico", field: "ID", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Serial / Placa",
      field: "SerialPlaca",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "NOMBRE",
      field: "Nombre",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Marca", field: "Marca", minWidth: 150, maxWidth: 200 },

    {
      headerName: "Codigo QR/Codigo de Barras",
      field: "CDQR",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "valor Unitario",
      field: "ValorU",
      minWidth: 150,
      maxWidth: 250,
    },
    {
      headerName: "Justificacion",
      field: "Justificacion",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn btn-2 btn-primary text-capitalize"
            type="button"
          >
            Buscar
          </button>
        </div>
      ),
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  let gridApi;
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

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          //onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <MarcaDeAgua1>
            <h3 className="mt-3 mb-0 ms-3 text-start fw-light mb-3">Registro de Baja</h3>
            <div className={"row"}>
            <Subtitle
                  title={"Datos Generales"}
                />
              <div className="row align-items-end ms-2">
                <div className="col-6 col-sm-3 mt-4">
                
                    <label className="ms-2 text-terciary">
                      Consecutivo:{" "}
                      <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      className="form-control border rounded-pill px-3 border border-terciary"
                      type="text"
                      placeholder="Consecutivo"
                      {...register("NumeroDoc")}
                    />
                  </div>
                
                <div className="col-12 col-md-4">
                  
                    <label htmlFor="exampleFormControlInput1" className="text-terciary">
                      Fecha de Ingreso: <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="fechaNacimiento"
                      control={control}
                      render={({ field }) => (
                        <ReactDatePicker
                          {...field}
                          locale="es"
                         dateFormat={"dd/MM/yyyy"}
                          placeholderText="dd/mm/aaaa"
                          className="col-4 multisteps-form__input form-control p-2 border rounded-pill px-3 text-terciary border border-terciary"
                          selected={formValues.fechaIngreso}
                          onSelect={(e) =>
                            setFormValues({ ...formValues, fechaIngreso: e })
                          }
                          
                         
                        />
                      )}
                    />
                  
                </div>
              </div>
              <div className="row ms-1">
                <div className="col">
                  <label className="ms-2 text-terciary">Concepto:</label>
                    <textarea
                      className="form-control border rounded-pill px-3 border border-terciary"
                      type="tel"
                      placeholder="Concepto"
                      {...register("businessTel")}
                    />
                    
                  
                </div>
              </div>

              <div className="row mt-5">
                <div>
                <Subtitle
                  title={"Detalles"}
                />
                </div>
                <div id="myGrid" className="ag-theme-alpine mt-3">
                  <div className="ag-theme-alpine" style={{ height: "250px" }}>
                    <AgGridReact
                      columnDefs={columnDetalles}
                      rowData={rowDataDetalles}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    ></AgGridReact>
                  </div>
                </div>

                <div className="d-flex justify-content-start gap-2 mt-4">
                <div className="col-12 col-md-4">
                  <label className="text-terciary">
                    Anexar revelacion: <span className="text-danger">*</span>{" "}
                  </label>
                  <div>
                    <label htmlFor="formFileLg" className="form-label"></label>
                    <input
                      className="form-control form-control-lg border rounded-pill px-3 border border-terciary"
                      id="formFileLg"
                      type="file"
                      rules={{ required: true }}
                    />
                  </div>
                </div>
                </div>
              </div>

              
              <div className="row mt-3">
              
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-danger text-capitalize "
                >
                  Salir
                </button>

                <button
                  className="btn btn-primary text-capitalize"
                  type="submit"
                  title="Send"
                  form="configForm"
                >
                  Guardar
                </button>
              </div>
            </div>
            </div>
          </MarcaDeAgua1>
        </form>
      </div>
    </div>
  );
};

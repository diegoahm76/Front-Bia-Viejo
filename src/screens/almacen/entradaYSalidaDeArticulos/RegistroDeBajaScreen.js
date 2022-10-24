import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

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
        <h3 className="mt-3 mb-0 text-center mb-6">Registro de Baja</h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          //onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <MarcaDeAgua1>
            <div className={"row"}>
              <label className="form-control ms-0 fw-bolder text-center">
                Datos generales
              </label>
              <div className="row">
                <div className="col-12 col-md-4 mt-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="Consecutivo"
                      {...register("businessTel")}
                    />
                    <label>Consecutivo:</label>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className=" input-group input-group-dynamic flex-column col-12 col-md-6 mt-3">
                    <label htmlFor="exampleFormControlInput1">
                      Fecha de Ingreso: <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="fechaNacimiento"
                      control={control}
                      render={({ field }) => (
                        <ReactDatePicker
                          {...field}
                          locale="es"
                          //required
                          selected={formValues.fechaIngreso}
                          onSelect={(e) =>
                            setFormValues({ ...formValues, fechaIngreso: e })
                          }
                          className="col-4 multisteps-form__input form-control p-2"
                          placeholderText="dd/mm/aaaa"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-floating input-group input-group-dynamic">
                    <textarea
                      className="form-control"
                      type="tel"
                      placeholder="Concepto"
                      {...register("businessTel")}
                    />
                    <label className="ms-2">Concepto:</label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div>
                  <label className="mt-6 form-control ms-0 fw-bolder text-center">
                    Detalles
                  </label>
                </div>
                <div id="myGrid" className="ag-theme-alpine ">
                  <div className="ag-theme-alpine" style={{ height: "250px" }}>
                    <AgGridReact
                      columnDefs={columnDetalles}
                      rowData={rowDataDetalles}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    ></AgGridReact>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-primary text-capitalize"
                  >
                    Revelacion
                  </button>
                </div>
              </div>

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
          </MarcaDeAgua1>
        </form>
      </div>
    </div>
  );
};

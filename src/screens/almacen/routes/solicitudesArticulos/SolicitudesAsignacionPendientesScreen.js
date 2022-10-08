import React, { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const SolicitudesAsignacionPendientesScreen = () => {
  
    const [formValues, setFormValues] = useState({
        fechaInicio: "",
      });
    
      const [native, setNative] = useState("");
      const onNativeChange = (e) => {
        setNative(e.target.value);
      };
    
      const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
      } = useForm();
    
      const onSubmit = (data) => {};
    
      const [rowData] = useState([
        {
            fecha: "",
            dependencia: " ",
            grupo: "",
            solicitante: "",
            tipo: "",
          },
        {
            fecha: "",
            dependencia: " ",
            grupo: "",
            solicitante: "",
            tipo: "",
          },
        {
            fecha: "",
            dependencia: " ",
            grupo: "",
            solicitante: "",
            tipo: "",
          },
        {
            fecha: "",
            dependencia: " ",
            grupo: "",
            solicitante: "",
            tipo: "",
          },
        {
            fecha: "",
            dependencia: " ",
            grupo: "",
            solicitante: "",
            tipo: "",
          },
        {
          fecha: "",
          dependencia: " ",
          grupo: "",
          solicitante: "",
          tipo: "",
        },
      ]);
    
      const columnDefs = [
        { headerName: "Fecha de solicitud", field: "fecha", minWidth: 150 },
        { headerName: "Dependencia", field: "dependencia", minWidth: 150 },
        { headerName: "Grupo", field: "grupo", minWidth: 150 },
        {headerName: "Solicitante", field: "solicitante", minWidth: 150, },
        { headerName: "Tipo", field: "tipo", minWidth: 150 },
      ];
    
      const optionsTipoDocumento = [
        { label: "C.C", value: "CC" },
        { label: "T.I", value: "TI" },
      ];
    
      let gridApi;
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
      const [startDate, setStartDate] = useState(new Date());
    
      const onGridReady = (params) => {
        gridApi = params.api;
      };
      return (
        <div className="row min-vh-100 ">
          <div className="col-12 mx-auto">
            <h3 className="mt-3 mb-0 text-center mb-6">
              Autorizar o rechazar solicitudes
            </h3>
            <form
              className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
              data-animation="FadeIn"
              onSubmit={handleSubmit(onSubmit)}
              id="configForm"
            >
              <form>
                <div
                  className="ag-theme-alpine mt-2 mb-4"
                  style={{ height: "300px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </form>
            </form>
          </div>
        </div>
      );
    };

export default SolicitudesAsignacionPendientesScreen
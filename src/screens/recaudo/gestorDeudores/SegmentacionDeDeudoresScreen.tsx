import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import Select from "react-select";
import Subtitle from "../../../components/Subtitle";
import IconoBuscar from "../../../assets/iconosBotones/buscar.svg";
import { Controller, useForm } from "react-hook-form";


export const SegmentacionDeDeudoresScreen = () => {

  const { handleSubmit } = useForm();

  const [cartere, setCartere] = useState({});
  const opcCartera = [
    { label: "Todas las carteras", value: "todo" },
    { label: "Cartera normal", value: "carnor" },
    { label: "Cartera mediano riesgo", value: "carmed" },
    { label: "Cartera alto riesgo", value: "caralto" },
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

  const columnCartera = [
    {
      headerName: "Nombre de usuario",
      field: "nombre",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Concepto deuda",
      field: "conceptodeu",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "NIT", field: "NIT", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Fecha facturación o acto administrativo",
      field: "fechafac",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Fecha de notificación",
      field: "fechano",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Fecha ejecución",
      field: "fechaEje",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Periodo", field: "periodo", minWidth: 150, maxWidth: 200 },
    { headerName: "Año", field: "anio", minWidth: 150, maxWidth: 200 },
    { headerName: "Edad", field: "edasd", minWidth: 150, maxWidth: 200 },
  ];



  const handleSubmitInformacion = () => {
    console.log("hasta aca iba bien");
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(handleSubmitInformacion)}
          id="configForm"
        >
          <h3 className="mt-3 ms-3 mb-0 text-start fw-light mb-4">
            Cartera por edades para cobro persuasivo
          </h3>
          <label className="text-terciary">
            Por favor seleccione como desea fitrar el listado de cartera por
            edades
          </label>

          <div className="row mb-4">
            <div className="col-6 col-sm-3">
              <label className="text-terciary">Tipo de cartera</label>
              
              <Controller
                name="concepto"
              // control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { label: "Todas las carteras", value: "todo" },
                      { label: "Cartera normal", value: "carnor" },
                      { label: "Cartera mediano riesgo", value: "carmed" },
                      { label: "Cartera alto riesgo", value: "caralto" },
                    ]}
                    placeholder="Seleccionar"
                  />
                )}
              />
            </div>
            <div className="col-6 col-sm-3">
              <label className="text-terciary">Año notificación</label>
              <Controller
                name="concepto"
              //  control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { label: "2022", value: 2022 },
                      { label: "2021", value: 2021 },
                      { label: "2020", value: 2020 },
                    ]}
                    placeholder="Seleccionar"
                  />
                )}
              />
            </div>
            <div className="col-6 col-sm-3">
              <label className="text-terciary">Concepto de la deuda</label>
              <Controller
                name="concepto"
            //    control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { label: "Tasa retributiva", value: "TR" },
                      { label: "Multas y Sanciones", value: "MS" },
                      { label: "Tasa por uso de agua", value: "TUA" },
                      { label: "Tasa por aprovechamiento", value: "TA" },
                      { label: "Visitas tecnicas" },
                    ]}
                    placeholder="Seleccionar"
                  />
                )}
              />
            </div>
            <div className="col-6 col-sm-3">
              <label className="text-terciary">Vigencia</label>
              <Controller
                name="concepto"
              //  control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { label: "Todas las vigencias", value: "TV" },
                      { label: "Actual", value: "actual" },
                      { label: "Anterior", value: "anterior" },
                    ]}
                    placeholder="Seleccionar"
                  />
                )}
              />
            </div>
            <div className="col-6 col-sm-3">
            <button
                      type="button"
                      className="btn  text-capitalize btn-outline-ligth px-3 mt-4"
                      title="Buscar profesional cormacarena"
                    >
                      <img src={IconoBuscar} alt="buscar" />
                    </button>
                    </div>
          </div>

          {cartere === "todo" ? (
            <div className="mt-3">
              <Subtitle title={"Todos los listados de cartera"} />
              <div className="row mt-3">
                
                <div className="col-6 col-sm-3">
                  <label className="text-terciary">
                    Cantidad de usuarios:{" "}
                    <input
                        className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                        type="float"
                        placeholder="Cantidad de usuarios"
                     
                        disabled={true}
                      />
                  </label>
                </div>
                <div className="col-6 col-sm-3">
                  <label className="text-terciary">
                    Cartera:{" "}
                    <input
                        className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                        type="float"
                        placeholder="Cartera"
                     
                        disabled={true}
                      />
                  </label>
                </div>
                <div className="col-6 col-sm-3">
                  <label className="text-terciary">
                    Concepto de deuda:{" "}
                    <input
                        className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                        type="float"
                        placeholder="Concepto de deuda"
                     
                        disabled={true}
                      />
                  </label>
                </div>
                <div className="col-6 col-sm-3">
                  <label className="text-terciary">
                    Año consultado:{" "}
                    <input
                        className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                        type="float"
                        placeholder="Año consultado"
                     
                        disabled={true}
                      />
                  </label>
                </div>
                <div className="col-6 col-sm-3">
              <label className="text-terciary">Tipo de Deudor</label>
              <Controller
                name="concepto"
               // control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { label: "Todas los deudores", value: "TD" },
                      { label: "Deudor renuente", value: "DRN" },
                      { label: "Deudor reincidente", value: "DRI" },
                    ]}
                    placeholder="Seleccionar"
                  />
                )}
              />
            </div>
            <div className="col-6 col-sm-3">
             <label className="text-terciary">Organizar por:</label>
             <Controller
                name="concepto"
               // control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { label: "Minima cuantia", value: "minc" },
                      { label: "Mayor cuantia", value: "mayc" },
                      { label: "Menor cuantia", value: "menc" },
                    ]}
                    placeholder="Seleccionar"
                  />
                )}
              />
           </div>
              </div>
              <div>
                <div id="myGrid" className="ag-theme-alpine mt-4">
                  <div className="ag-theme-alpine" style={{ height: "400px" }}>
                    <AgGridReact
                      columnDefs={columnCartera}
                      rowData={""}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    ></AgGridReact>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {cartere ==="carnor" ?(
             <div className="mt-3 ">
             <Subtitle title={"Listado de cartera Normal"} />
             <div className="row mt-3">
               
               <div className="col-6 col-sm-3">
                 <label className="text-terciary">
                   Cantidad de usuarios:{" "}
                   <input
                       className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                       type="float"
                       placeholder="Cantidad de usuarios"
                       disabled={true} />
                       
                     
                 </label>
               </div>
               <div className="col-6 col-sm-3">
                 <label className="text-terciary">
                   Cartera:{" "}
                   <input
                       className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                       type="float"
                       placeholder="Cartera"
                    
                       disabled={true}
                     />
                 </label>
               </div>
               <div className="col-6 col-sm-3">
                 <label className="text-terciary">
                   Concepto de deuda:{" "}
                   <input
                       className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                       type="float"
                       placeholder="Concepto de deuda"
                    
                       disabled={true}
                     />
                 </label>
               </div>
               <div className="col-6 col-sm-3">
                 <label className="text-terciary">
                   Año consultado:{" "}
                   <input
                       className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                       type="float"
                       placeholder="Año consultado"
                    
                       disabled={true}
                     />
                 </label>
               </div>
               <div className="col-6 col-sm-3">
             <label className="text-terciary">Tipo de Deudor</label>
             <Controller
                name="concepto"
               // control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { label: "Todas los deudores", value: "TD" },
                      { label: "Deudor renuente", value: "DRN" },
                      { label: "Deudor reincidente", value: "DRI" },
                    ]}
                    placeholder="Seleccionar"
                  />
                )}
              />
           </div>
           
             </div>
             <div>
               <div id="myGrid" className="ag-theme-alpine mt-4">
                 <div className="ag-theme-alpine" style={{ height: "400px" }}>
                   <AgGridReact
                     columnDefs={columnCartera}
                     rowData={""}
                     defaultColDef={defaultColDef}
                     onGridReady={onGridReady}
                   ></AgGridReact>
                 </div>
               </div>
             </div>
           </div>
          ):(
            ""
            )}
             {cartere ==="carmed" ?(
             <div className="mt-3">
             <Subtitle title={"Listados cartera mediano riesgo"} />
             <div className="row mt-3">
               
               <div className="col-6 col-sm-3">
                 <label className="text-terciary">
                   Cantidad de usuarios:{" "}
                   <input
                       className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                       type="float"
                       placeholder="Cantidad de usuarios"
                    
                       disabled={true}
                     />
                 </label>
               </div>
               <div className="col-6 col-sm-3">
                 <label className="text-terciary">
                   Cartera:{" "}
                   <input
                       className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                       type="float"
                       placeholder="Cartera"
                    
                       disabled={true}
                     />
                 </label>
               </div>
               <div className="col-6 col-sm-3">
                 <label className="text-terciary">
                   Concepto de deuda:{" "}
                   <input
                       className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                       type="float"
                       placeholder="Concepto de deuda"
                    
                       disabled={true}
                     />
                 </label>
               </div>
               <div className="col-6 col-sm-3">
                 <label className="text-terciary">
                   Año consultado:{" "}
                   <input
                       className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                       type="float"
                       placeholder="Año consultado"
                    
                       disabled={true}
                     />
                 </label>
               </div>
               <div className="col-6 col-sm-3">
             <label className="text-terciary">Tipo de Deudor</label>
             <Controller
                name="concepto"
           //     control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { label: "Todas los deudores", value: "TD" },
                      { label: "Deudor renuente", value: "DRN" },
                      { label: "Deudor reincidente", value: "DRI" },
                    ]}
                    placeholder="Seleccionar"
                  />
                )}
              />
           </div>
           
             </div>
             <div>
               <div id="myGrid" className="ag-theme-alpine mt-4">
                 <div className="ag-theme-alpine" style={{ height: "400px" }}>
                   <AgGridReact
                     columnDefs={columnCartera}
                     rowData={""}
                     defaultColDef={defaultColDef}
                     onGridReady={onGridReady}
                   ></AgGridReact>
                 </div>
               </div>
             </div>
           </div>
          ):(
            ""
            )}
             {cartere ==="caralto" ?(
             <div className="mt-3">
             <Subtitle title={"Listados cartera de Alto riesgo"} />
             <div className="row mt-3">
               
               <div className="col-6 col-sm-3">
                 <label className="text-terciary">
                   Cantidad de usuarios:{" "}
                   <input
                       className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                       type="float"
                       placeholder="Cantidad de usuarios"
                    
                       disabled={true}
                     />
                 </label>
               </div>
               <div className="col-6 col-sm-3">
                 <label className="text-terciary">
                   Cartera:{" "}
                   <input
                       className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                       type="float"
                       placeholder="Cartera"
                    
                       disabled={true}
                     />
                 </label>
               </div>
               <div className="col-6 col-sm-3">
                 <label className="text-terciary">
                   Concepto de deuda:{" "}
                   <input
                       className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                       type="float"
                       placeholder="Concepto de deuda"
                    
                       disabled={true}
                     />
                 </label>
               </div>
               <div className="col-6 col-sm-3">
                 <label className="text-terciary">
                   Año consultado:{" "}
                   <input
                       className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                       type="float"
                       placeholder="Año consultado"
                    
                       disabled={true}
                     />
                 </label>
               </div>
               <div className="col-6 col-sm-3">
             <label className="text-terciary">Tipo de Deudor</label>
             <Controller
                name="concepto"
               // control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { label: "Todas los deudores", value: "TD" },
                      { label: "Deudor renuente", value: "DRN" },
                      { label: "Deudor reincidente", value: "DRI" },
                    ]}
                    placeholder="Seleccionar"
                  />
                )}
              />
           </div>
           
             </div>
             <div>
               <div id="myGrid" className="ag-theme-alpine mt-4">
                 <div className="ag-theme-alpine" style={{ height: "400px" }}>
                   <AgGridReact
                     columnDefs={columnCartera}
                     rowData={""}
                     defaultColDef={defaultColDef}
                     onGridReady={onGridReady}
                   ></AgGridReact>
                 </div>
               </div>
             </div>
           </div>
          ):(
            ""
            )}
        </form>
      </div>
    </div>
  );
};

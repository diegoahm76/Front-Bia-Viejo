import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";
import Subtitle from "../../../components/Subtitle";

const SalidaArticulosScreen = () => {
  const [selectedEntrada, setSelectedEntrada] = useState({});
  const opcEntrada = [
    { label: "Compra", value: "Comp" },
    { label: "Convenio", value: "Conv" },
    { label: "Comodato", value: "Como" },
    { label: "Donacion", value: "Dona" },
    { label: "Incautacion", value: "Inca" },
    { label: "Embargo", value: "Emba" },
    { label: "Resarcimiento", value: "Resa" },
    { label: "Compensacion", value: "Compe" },
  ];

  const [selectedDocumento, setSelectedDocumento] = useState({});
  const opcDoc = [
    { label: "Cedula de ciudadania", value: "CC" },
    { label: "Tarjeta de identidad", value: "TI" },
    { label: "Cedula de extranjeria", value: "CE" },
    { label: "Pasaporte", value: "PP" },
    { label: "NIT", value: "NIT" },
  ];

  const [estado, setEstado] = useState({});
  const opcEstado = [
    { label: "Bueno", value: "GOOD" },
    { label: "Averiado/Defectuoso", value: "A/D" },
  ];

  const [selectedBodega, setSelectedBodega] = useState({});
  const opcBod = [
    { label: "Villeavicencio / Principal", value: "VP" },
    { label: "Villavicencio / San Antonio", value: "VS" },
    { label: "Macarena / Principal", value: "MP" },
  ];

  const [formValues, setFormValues] = useState({
    fechaIngreso: "",
  });

  const {
    register,
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    register: regiister2,
    setError: setError2,
    handleSubmit: handleSubmit2,
    control: control2,
    formState: { errors: errors2 },
  } = useForm();

  const {
    register: register3,
    setError: setError3,
    handleSubmit: handleSubmit3,
    control: control3,
    formState: { errors: errors3 },
  } = useForm();

  const {
    register: register4,
    setError: setError4,
    handleSubmit: handleSubmit4,
    control: control4,
    formState: { errors: errors4 },
  } = useForm();

  const [rowDataConsumo] = useState([
    {
      ID: "0001",
      Nombre: "21-03-0001 Resma de papel ECOGRAF",
      Cantidad: "50",
      "Valor Total": "$1428000",
    },
    {
      ID: "0002",
      Nombre: "21-03-0002 Ambientador de baño GLADE",
      Cantidad: "35",
      "Valor Total": "$175000",
    },
    {
      ID: "0003",
      Nombre: "21-03-0003 Limpiador de piso VITAFLOR",
      Cantidad: "20",
      "Valor Total": "$342000",
    },
    {
      ID: "0004",
      Nombre: "21-03-0004 Esfero PAPERMATE",
      Cantidad: "50",
      "Valor Total": "$342000",
    },
  ]);

  const columndevolutivoAso = [
    { headerName: "ID unico", field: "ID", maxWidth: 150 },
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
    {
      headerName: "Codigo QR/Codigo de Barras",
      field: "CDQR",
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
            Agregar
          </button>
        </div>
      ),
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const [rowDataDevolutivoAso] = useState([
    {
      ID: "0011",
      SerialPlaca: "446552SEFW66",
      Nombre: "20-02-01-0011 Computador Portatil Lenovo IdeaPad 5",
      CDQR: "97811556331/Ver QR",
    },
    {
      ID: "0021",
      SerialPlaca: "446552SEFW67",
      Nombre: "20-03-01-0021 Computador Portatil HP VICTUS con RTX PP",
      CDQR: "97811556332/Ver QR",
    },
  ]);

  const [rowDataDevolutivo] = useState([
    {
      ID: "0011",
      SerialPlaca: "446552SEFW66",
      Nombre: "20-02-01-0011 Computador Portatil Lenovo IdeaPad 5",
      Marca: "Lenovo",
      VidaUtil: "5 Años",
      CDQR: "97811556331/Ver QR",
      ValorN: "$1500000",
    },
    {
      ID: "0021",
      SerialPlaca: "446552SEFW67",
      Nombre: "20-03-01-0021 Computador Portatil HP VICTUS con RTX PP",
      Marca: "HP",
      VidaUtil: "5 Años",
      CDQR: "97811556332/Ver QR",
      ValorN: "$4500000",
    },
  ]);

  const [rowDataEntradaRela] = useState([
    {
      TipoEn: "Convenio",
      Consec: "446552SEFW66",
      Exped: "20-02-01-00115",
    },
    { TipoEn: "Embargo", Consec: "4465462254asd", Exped: "20-02-02-00115" },
  ]);

  const columnEntradaRela = [
    {
      headerName: "Tipo de Entrada",
      field: "TipoEn",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Consecutivo",
      field: "Consec",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Expediente",
      field: "Exped",
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const columnDevolutivo = [
    { headerName: "ID unico", field: "ID", maxWidth: 150 },
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
      headerName: "Vida Util",
      field: "VidaUtil",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Codigo QR/Codigo de Barras",
      field: "CDQR",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "valor nuevo",
      field: "ValorN",
      minWidth: 150,
      maxWidth: 250,
    },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn btn-2 btn-danger text-capitalize"
            type="button"
          >
            Borrar
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

  const [page, setPage] = useState(1);

  const submit = (data) => {
    if (page === 1) setPage(2);
    if (page === 2) console.log(data);
  };

  const handlePreviousPage = () => {
    setPage(1);
  };

  const handleOpenModalBusquedaPersonal = () => {
    setModalPersonal(true);
  };

  const [modalPersonal, setModalPersonal] = useState(false);

  const handleOpenModalArticulos = () => {
    setModalArticulos(true);
  };

  const [modalArticulos, setModalArticulos] = useState(false);

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <h3 className="mt-3 mb-0 ms-3 fw-light text-start mb-4">Salida de Articulos</h3>
          <MarcaDeAgua1>
            <div className={"row"} hidden={page === 2}>
              <div className={"row"}>
              <Subtitle
                  title={"Datos Generales"}
                />
                <div className="row ms-1">
                  <div className="col-12 col-md-4 mt-4 ">
                     <label className="text-terciary">Consecutivo de salida:</label>
                      <input
                        className="form-control border rounded-pill px-3 border border-terciary"
                        type="tel"
                        placeholder="Consecutivo"
                        {...register("businessTel")}
                      />
                     
                    
                  </div>

                  <div className="col-12 col-md-4 mt-4">
                    
                      <label className="text-terciary">
                        Fecha de Salida: <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="fechaNacimiento"
                        control={control}
                        render={({ field }) => (
                          <ReactDatePicker
                            {...field}
                            locale="es"
                            className="form-control border rounded-pill px-3 border border-terciary"
                            dateFormat="dd/MM/yyyy"
                             placeholderText="dd/mm/aaaa"
                            selected={formValues.fechaIngreso}
                            onSelect={(e) =>
                              setFormValues({ ...formValues, fechaIngreso: e })
                           
                            }
                            
                            
                          />
                        )}
                      />
                    
                  </div>
                </div>
              </div>

              <div className="row mt-5">
              <Subtitle
                  title={"Informacion de terceros"}
                />
                <div className="row mt-3 ms-1">
                  <div className="col-12 col-md-4">
                    <label className="text-terciary">Tipo de Documento</label>
                    <Controller
                      name="options"
                      control={control2}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={opcDoc}
                          placeholder="Seleccionar"
                        />
                      )}
                    />

                    {errors.options && (
                      <p className=" form-control ms-0 text-danger">
                        Este campo es obligatorio
                      </p>
                    )}
                  </div>
                  <div className="col-12 col-md-4">
                     <label className="ms-2 text-terciary">Numero de identificacion:</label>
                      <input
                        className="form-control border rounded-pill px-3 border border-terciary"
                        type="tel"
                        placeholder="Numero de identificacion"
                        {...register("businessTel")}
                      />
                     
                    
                  </div>
                  <div className="col-12 col-md-4">
                    <div>
                      <label className="text-terciary">Nombre: </label>
                    </div>

                    <label className="text-terciary">Empresa o persona</label>
                  </div>
                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <button
                      type="button"
                      className="btn btn-primary text-capitalize border rounded-pill px-3 "
                    >
                      buscar
                    </button>
                      <button
                      type="button"
                      className="btn btn-primary text-capitalize border rounded-pill px-3"
                      onClick={handleOpenModalBusquedaPersonal}
                    >
                      busqueda de tercero
                    </button>
                  </div>
                </div>
                
              </div>

              <div className="row">
              <Subtitle
                  title={"Entradas Relacionadas"}
                />
                <div className="row mt-3">
                  <div id="myGrid" className="ag-theme-alpine ">
                    <div
                      className="ag-theme-alpine"
                      style={{ height: "250px" }}
                    >
                      <AgGridReact
                        columnDefs={columnEntradaRela}
                        rowData={rowDataEntradaRela}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                      ></AgGridReact>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4 ms-0">
                <div className="col">
                  <label className="ms-2 text-terciary">Referencia de Apropiacion:</label>
                    <input
                      className="form-control border rounded-pill px-3 border border-terciary"
                      type="text"
                      placeholder="Referencia de apropiación"
                      {...register("refApro")}
                    />
                    
                  
                </div>
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

              <div className="row ms-0 text-terciary">
                <label>Anexar documentos</label>
                <div className="col-12 col-md-4 d-flex justify-content-end gap-2 mt-4">
                  <label htmlFor="formFileLg" className="form-label"></label>
                  <input
                    className=" form-control form-control-lg mt-1 border rounded-pill px-3 border border-terciary"
                    id="formFileLg"
                    type="file"
                  />
                </div>
              </div>
            </div>

            <div className={"row"} hidden={page === 1}>
              <div>
               <Subtitle
                  title={"Detalles"}
                />
              </div>

              <div className="row">
                <div className="col">
               
                  <label className="mt-3 form-control ms-0 fw-bolder text-center">
                  Entradas especiales
                </label>
                </div>
              </div>
              <div className="row mt-3">
                <div id="myGrid" className="ag-theme-alpine "style={{textAlign:"-webkit-center"}}>
                  <div className="ag-theme-alpine" style={{ height: "250px",width:"600px" }}>
                    <AgGridReact
                      columnDefs={columnEntradaRela}
                      rowData={rowDataEntradaRela}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    ></AgGridReact>
                  </div>
                </div>
                <div className="col">
                  <label className="mt-3 form-control ms-0 fw-bolder text-center">
                    Articulos Asociados
                  </label>
                </div>
                <div id="myGrid" className="ag-theme-alpine " style={{display:"flex", justifyContent:"center"}}>
                  <div className="ag-theme-alpine" style={{ height: "250px", width:"1000px" }}>
                    <AgGridReact
                      columnDefs={columndevolutivoAso}
                      rowData={rowDataDevolutivoAso}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    ></AgGridReact>
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-primary text-capitalize "
                  >
                    Agregar
                  </button>
                </div>

                <div className="row">
                  <div>
                  <Subtitle
                  title={"ARTICULOS QUE ENTRAN A HACER PARTE DE LA CORPORACION"}
                />
                  </div>

                  <div>
                    <div className="row mt-3">
                      <div id="myGrid" className="ag-theme-alpine ">
                        <div
                          className="ag-theme-alpine"
                          style={{ height: "250px" }}
                        >
                          <AgGridReact
                            columnDefs={columnDevolutivo}
                            rowData={rowDataDevolutivo}
                            defaultColDef={defaultColDef}
                            onGridReady={onGridReady}
                          ></AgGridReact>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            
            </div>
            <div className="row">
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-light text-capitalize "
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary text-capitalize "
                  >
                    Limpiar
                  </button>
                  <button
                    className={`btn btn-danger text-capitalize ${
                      page === 1 && "d-none"
                    }`}
                    type="button"
                    title="Send"
                    onClick={handlePreviousPage}
                  >
                    {" "}
                    {"<< Atrás"}{" "}
                  </button>
                  <button
                    className="btn btn-primary text-capitalize"
                    type="submit"
                    title="Send"
                    form="configForm"
                  >
                    {page === 1 ? "Siguiente >>" : "Continuar"}{" "}
                  </button>
                </div>
              </div>
          </MarcaDeAgua1>

            <BusquedaDePersonalModal
                isModalActive={modalPersonal}
                setIsModalActive={setModalPersonal}
              />
              <BusquedaArticuloModal
                isModalActive={modalArticulos}
                setIsModalActive={setModalArticulos}
              />
        </form>
      </div>
    </div>
  );
};
export default SalidaArticulosScreen;

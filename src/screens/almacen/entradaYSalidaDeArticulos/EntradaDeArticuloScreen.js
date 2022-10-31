import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ModalLocal from "../../../components/ModalLocal";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

export const EntradaDeArticuloScreen = () => {
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

  const columnConsumo = [
    { headerName: "ID unico", field: "ID", minWidth: 150, maxWidth: 200 },
    {
      headerName: "NOMBRE",
      field: "Nombre",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Cantidad", field: "Cantidad", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Valor total",
      field: "Valor Total",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn btn-2 btn-danger text-capitalize border rounded-pill px-3"
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

  const [rowDataDevolutivo] = useState([
    {
      ID: "0011",
      SerialPlaca: "446552SEFW66",
      Nombre: "20-02-01-0011 Computador Portatil Lenovo IdeaPad 5",
      Marca: "Lenovo",
      VidaUtil: "5 Años",
      CDQR: "97811556331/Ver QR",
    },
    {
      ID: "0021",
      SerialPlaca: "446552SEFW67",
      Nombre: "20-03-01-0021 Computador Portatil HP VICTUS con RTX PP",
      Marca: "HP",
      VidaUtil: "5 Años",
      CDQR: "97811556332/Ver QR",
    },
  ]);

  const columnDevolutivo = [
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
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn btn-2 btn-danger text-capitalize border rounded-pill px-3"
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

  const [crearUnidad, setCrearUnidad] = useState(false);

  const handleOpenModalCrearUnidad = () => {
    setCrearUnidad(true);
  };

  const handleCloseModalCrearUnidad = () => {
    setCrearUnidad(false);
  };

  const [crearMarca, setCrearMarca] = useState(false);

  const handleOpenModalCrearMarca = () => {
    setCrearMarca(true);
  };

  const handleCloseModalCrearMarca = () => {
    setCrearMarca(false);
  };

  const [crearNombreCientifico, setCrearNombreCientifico] = useState(false);

  const handleOpenModalCrearNombreCientifico = () => {
    setCrearNombreCientifico(true);
  };

  const handleCloseModalCrearNombreCientifico = () => {
    setCrearNombreCientifico(false);
  };

  const [modal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleOpenModalBusquedaPersonal = () => {
    setModalPersonal(true);
  };

  const [modalPersonal, setModalPersonal] = useState(false);

  const handleOpenModalArticulos = () => {
    setModalArticulos(true);
  };

  const [modalArticulos, setModalArticulos] = useState(false);

  const handleCloseModal = () => {
    setModal(false);
  };
  const [page, setPage] = useState(1);

  const submit = (data) => {
    if (page === 1) setPage(2);
    if (page === 2) console.log(data);
  };

  const handlePreviousPage = () => {
    setPage(1);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
       
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <MarcaDeAgua1>
          <h3 className="mt-3 mb-0 text-start mb-6">Entrada de Articulos</h3>
            <div className={"row"} hidden={page === 2}>
              <div className={"row"}>
                <label className="form-control ms-0 fw-bolder text-start text-white border rounded-pill px-3 "style={{backgroundImage:"linear-gradient(45deg, #6db227, #36a9e0)"}}>
                  Datos generales
                </label>
                <div className="row mt-4">
                  <div className="col-12 col-md-4 mt-3">
                    <label>
                        Consecutivo: <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="Consecutivo"
                        rules={{ required: true }}
                        {...register("Consecutivo")}
                      />
                      
                    
                    {errors.Consecutivo && (
                      <p className="text-danger">Este campo es obligatorio</p>
                    )}
                  </div>

                  <div className="col-12 col-md-4 mt-3">
                   
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
                            className="form-control border rounded-pill px-3"
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

                  <div className="col-12 col-md-4">
                    <label className="form-control ms-0">
                      Origen del articulo:{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="options"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={opcEntrada}
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
                  {selectedEntrada.value === "Comp" ? (
                    <div className="col-12 col-md-4">
                       <label >
                          Numero de factura de compra:{" "}
                          <span className="text-danger">*</span>
                        </label>
                                             
                        <input
                          
                          className="form-control border rounded-pill px-3"
                          type="tel"
                          placeholder="Numero de factura de compra"
                          {...register("businessTel")}
                        />
                        
                    </div>
                  ) : (
                    <div className="col-12 col-md-4">
                     
                        <label>
                          Numero de Expediente:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                         className="form-control border rounded-pill px-3"
                          type="tel"
                          placeholder="Numero de Expediente"
                          {...register("businessTel")}
                        />
                        
                      
                    </div>
                  )}
                </div>
              </div>

              <div className="row">
                <label className="mt-6 form-control ms-0 fw-bolder text-start text-white border rounded-pill px-3" style={{backgroundImage:"linear-gradient(45deg, #67b136, #39aad4)"}}>
                  Informacion de terceros:
                </label>
                <div className="row mt-2">
                  <div className="col-12 col-md-4">
                    <label>
                      Tipo de Documento: <span className="text-danger">*</span>{" "}
                    </label>
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
                     <label className="ms-2">
                        Numero de identificacion:{" "}
                        <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="Numero de identificacion"
                        {...register("NumeroDoc")}
                      />
                     
                    
                  </div>
                  <div className="col-12 col-md-4">
                    <label>Nombre: </label><br/>
                    <label>Profesional de cormacarena</label>
                  </div>
                  <div className=" d-flex justify-content-end gap-2 mt-3 ">
                    <button
                      type="button"
                      className="btn btn-primary text-capitalize border rounded-pill px-3"
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
              <div className="row mt-3">
                <div className="col">
                  <label className="ms-2">
                      Concepto: <span className="text-danger">*</span>{" "}
                    </label>
                    <textarea
                      className="form-control border rounded-pill px-3"
                      type="text"
                      placeholder="Concepto"
                      {...register("Concepto")}
                    />
                    
                  
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <label>Bodega</label>
                  <Controller
                    name="options"
                    control={control3}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={opcBod}
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
              </div>
              <div className="row mt-3">
                <div className="col-12 col-md-4">
                <label>
                  Anexar documentos: <span className="text-danger">*</span>{" "}
                </label>
                <div>
                  <label htmlFor="formFileLg" className="form-label"></label>
                  <input
                    className="form-control form-control-lg border rounded-pill px-3"
                    id="formFileLg"
                    type="file"
                    rules={{ required: true }}
                  />
                </div>
                </div>
              </div>
            </div>

            <div className={"row"} hidden={page === 1}>
              <div>
                <label className=" form-control ms-0 fw-bolder text-center">
                  Detalles
                </label>
              </div>

              <div className="row">
                <div className="col">
                  <label className="mt-3 form-control ms-0 fw-bolder text-start text-white border rounded-pill px-3" style={{backgroundImage:"linear-gradient(45deg, #67b136, #39aad4)"}}>
                    Identificacion de articulos
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-4">
                    <label className="ms-2">
                      Codigo: <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      className="form-control border rounded-pill px-3"
                      type="text"
                      required={page === 2}
                      placeholder="Codigo"
                      {...register("Cod")}
                    />
                  
                  
                </div>
                <div className="col-12 col-md-4">
               <label className="ms-2">Nombre de articulo:</label>
                    <input
                      className="form-control border rounded-pill px-3"
                      type="text"
                      required={page === 2}
                      placeholder="Nombre Articulo"
                      disabled="true"
                    />
                    
                  
                </div>
                <div className="col-12 col-md-4 mt-4 " style={{displayFlex:"flex",justifyContent:"flex-end"}}>
                  <button
                    type="button"
                    className="btn btn-primary text-capitalize border rounded-pill px-3"
                  >
                    buscar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary text-capitalize ms-1 border rounded-pill px-3"
                    onClick={handleOpenModalArticulos}
                  >
                    Busqueda de articulo
                  </button>
                </div>
                <div className="col">
                  <label>Tipo de Articulo</label>
                </div>
                
              </div>
              <div className="row">
                <div>
                  <label className="mt-3 form-control ms-0 fw-bolder text-start text-white border rounded-pill px-3" style={{backgroundImage:"linear-gradient(45deg, #67b136, #39aad4)"}}>
                    Informacion de articulo
                  </label>
                </div>

                <div>
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <div>
                      <label>
                          Unidad de Medida:{" "}
                          <span className="text-danger">*</span>{" "}
                        </label><br/>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          required={page === 2}
                          placeholder="Unidad de medida"
                          {...register("UniMe")}
                        />
                       

                        <button
                          type="button"
                          className="btn btn-primary text-capitalize border rounded-pill px-3"
                          onClick={handleOpenModalCrearUnidad}
                        >
                          Crear
                        </button>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                       <label className="ms-2">
                          Cantidad: <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="number"
                          required={page === 2}
                          placeholder="Cantidad"
                          {...register("Cantidad")}
                        />
                       
                      
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="ms-2">
                          Valor unitario: <span className="text-danger">*</span>{" "}
                        </label>
                       <input
                         className="form-control border rounded-pill px-3"
                          type="numb"
                          required={page === 2}
                          placeholder="Valor unitario"
                          {...register("ValUni")}
                        />
                        
                      
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-12 col-md-4">
                       <label className="ms-2">
                          Porcentaje IVA: <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="numb"
                          required={page === 2}
                          placeholder="Porcentaje IVA"
                          {...register("PorceIVA")}
                        />
                       
                      
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="ms-2">
                          Valor IVA: <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="numb"
                          required={page === 2}
                          placeholder="Valor IVA"
                          {...register("ValorIVA")}
                          disabled="true"
                        />
                        
                      
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="ms-2">Valor unitario Total:</label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="numb"
                          required={page === 2}
                          placeholder="Valor unitario Total"
                          {...register("ValUni")}
                          disabled="true"
                        />
                        
                      
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12 col-md-4">
                      <label className="form-control ms-0">
                        Estado del articulo: :{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="options"
                        control={control4}
                        rules={{ required: page === 2 }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={opcEstado}
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
                      <div >
                        <label className="mb-2">
                          Nombre Cientifico (viveros):{" "}
                          <span className="text-danger">*</span>
                        </label><br/>
                        <input
                         className="form-control border rounded-pill px-3 mt-2"
                          type="text"
                          required={page === 2}
                          placeholder="Nombre Cientifico"
                          {...register("NombreCient")}
                        />
                        
                        
                      </div>
                    </div>
                    <div className="col-12 col-md-4 mt-5">
                      
                      <button
                          type="button"
                          className="btn btn-primary text-capitalize border rounded-pill px-3"
                          onClick={handleOpenModalCrearNombreCientifico}
                        >
                          Agregar
                        </button>
                    </div>
                    <div >
                      <label className="mt-2">
                          Observaciones: <span className="text-danger">*</span>{" "}
                        </label>
                        <textarea
                          className="form-control border rounded-pill px-3"
                          type="text"
                          required={page === 2}
                          placeholder="Observaciones"
                          {...register("Observaciones")}
                        />
                        
                      
                    </div>
                  </div>
                </div>

                <div>
                  <div className="row mt-3">
                    <div className="col-12 col-md-4">
                      <div >
                         <label className="ms-2">
                          Unidad de Medida:{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          required={page === 2}
                          placeholder="Unidad de medida"
                          {...register("UniMed")}
                        />
                       
                        <button
                          type="button"
                          className="btn btn-primary text-capitalize border rounded-pill px-3"
                          onClick={handleOpenModalCrearUnidad}
                        >
                          Crear
                        </button>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <div >
                         <label className="ms-2 me-2 ">
                          Marca: <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          required={page === 2}
                          placeholder="Marca"
                          {...register("Marca")}
                        />
                       

                        <button
                          type="button"
                          className=" ms-2 btn btn-primary text-capitalize border rounded-pill px-3"
                          onClick={handleOpenModalCrearMarca}
                        >
                          Crear
                        </button>
                      </div>
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="ms-2">
                          Modelo: <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          required={page === 2}
                          placeholder="Modelo"
                          {...register("Model")}
                        />
                        
                      
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-4">
                      <label className="ms-2">
                          Cantidad: <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="float"
                          required={page === 2}
                          placeholder="Cantidad"
                          {...register("Cant")}
                        />
                        
                      
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="ms-2">
                          Vida util: <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          required={page === 2}
                          placeholder="Vida util"
                          {...register("VidaU")}
                        />
                        
                      
                    </div>
                    <div className="col-12 col-md-4">
                     <label className="ms-2">
                          Porcentaje IVA: <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="float"
                          required={page === 2}
                          placeholder="Porcentaje IVA"
                          {...register("PorcentIVA")}
                        />
                        
                      
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-4">
                      <label className="ms-2">
                          Valor unitario: <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="numb"
                          required={page === 2}
                          placeholder="Valor Unitario"
                          {...register("ValUni")}
                        />
                        
                      
                    </div>
                    <div className="col-12 col-md-4">
                     <label className="ms-2">Valor IVA:</label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="float"
                          required={page === 2}
                          placeholder="Valor IVA"
                          {...register("ValorIVA")}
                          disabled="true"
                        />
                        
                    
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="ms-2">
                          Valor unitario Total:{" "}
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="float"
                          required={page === 2}
                          placeholder="Valor unitario Total"
                          {...register("ValUniTotal")}
                          disabled="true"
                        />
                        
                      
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <label className="form-control ms-0">
                        Estado del articulo: :{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="options"
                        control={control4}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={opcEstado}
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
                    <div className="col-12 col-md-4 mt-1">
                      <label className="ms-2">
                          Valor Residual: <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                         className="form-control border rounded-pill px-3 mt-1"
                          type="numb"
                          required={page === 2}
                          placeholder="Valor Residual"
                          {...register("ValorRes")}
                        />
                        
                      
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="ms-2">
                          Garantia: <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                        className="form-control border rounded-pill px-3 mt-1"
                          type="text"
                          required={page === 2}
                          placeholder="Garantia"
                          {...register("Garantia")}
                        />
                        
                      
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-4">
                       <label className="ms-2">
                          Dias de uso: <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="numb"
                          required={page === 2}
                          placeholder="Dias de uso"
                          {...register("DiasUso")}
                        />
                       
                      
                    </div>
                    <div className="col-8 col-md-4">
                      <label className="ms-2">
                          Observaciones: <span className="text-danger">*</span>{" "}
                        </label>
                        <textarea
                          className="form-control border rounded-pill px-3"
                          type="text"
                          required={page === 2}
                          placeholder="Observaciones"
                          {...register("Observ")}
                        />
                        
                      
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <button
                    type="button"
                    className="col-3 col-md-4 ms-2 mt-4 btn btn-secondary text-capitalize border rounded-pill px-3"
                  >
                    Agregar
                  </button>
                </div>
                <div className="row">
                  <div className="d-flex justify-content-end gap-4 mt-4">
                    <label className="mt-3 fw-bolder text-center">
                      Resumen de la entrada:
                    </label>
                    <button
                      type="button"
                      className={`btn btn-primary text-capitalize border rounded-pill px-3 ${
                        page === 1 && "d-none"
                      }`}
                      style={{minWidth:"100px"}}
                      onClick={handleOpenModal}
                    >
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="d-flex justify-content-end gap-4 mt-4">
                <button
                  type="button"
                  className="btn btn-light text-capitalize border rounded-pill px-3"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill px-3"
                >
                  Limpiar
                </button>

                <button
                  className={`btn btn-danger text-capitalize border rounded-pill px-3 ${
                    page === 1 && "d-none"
                  }`}
                  type="button"
                  title="Regresar a la pagina anterior"
                  onClick={handlePreviousPage}
                >
                  {" "}
                  {"<< Atrás"}{" "}
                </button>
                <button
                  className="btn btn-primary text-capitalize border rounded-pill px-3"
                  type="submit"
                  title="Finalizar"
                  form="configForm"
                >
                  {page === 1 ? "Siguiente >>" : "Continuar"}{" "}
                </button>
              </div>
            </div>
          </MarcaDeAgua1>
          <ModalLocal localState={modal}>
            <MarcaDeAgua1>
              <div className="row">
                <div className="col">
                  <label className="mt-3 form-control ms-0 fw-bolder text-center">
                    Resumen
                  </label>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="mt-3 form-control ms-0 fw-bolder text-center border rounded-pill px-3 text-white" style={{backgroundImage:"linear-gradient(45deg, #67b136, #39aad4)"}}>
                      Articulos a Ingresar
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="mt-3 form-control ms-0 fw-bolder text-center">
                      Articulos de Consumo
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div id="myGrid" className="ag-theme-alpine ">
                    <div
                      className="ag-theme-alpine"
                      style={{ height: "400px" }}
                    >
                      <AgGridReact
                        columnDefs={columnConsumo}
                        rowData={rowDataConsumo}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                      ></AgGridReact>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="mt-3 form-control ms-0 fw-bolder text-center">
                      Articulos Devolutivos
                    </label>
                  </div>
                  <div id="myGrid" className="ag-theme-alpine ">
                    <div
                      className="ag-theme-alpine"
                      style={{ height: "400px" }}
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
                <div className="row">
                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <label className="mt-3 form-control ms-0 fw-bolder text-center">
                      Imprimir Codigo de Barras / QR
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <button
                      type="button"
                      className="btn btn-secondary text-capitalize border rounded-pill px-3"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-danger text-capitalize border rounded-pill px-3"
                    onClick={handleCloseModal}
                  >
                    Regresar
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary text-capitalize border rounded-pill px-3"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </MarcaDeAgua1>
          </ModalLocal>
          <BusquedaDePersonalModal
            isModalActive={modalPersonal}
            setIsModalActive={setModalPersonal}
          />
          <BusquedaArticuloModal
            isModalActive={modalArticulos}
            setIsModalActive={setModalArticulos}
          />
          <ModalLocal localState={crearUnidad}>
            <div className="row">
              <div className="col">
                <label className="mt-3 form-control ms-0 fw-bolder text-center">
                  Registro Unidad
                </label>
              </div>

              <div className="row">
                <label className="mt-3 ms-4 form-control ms-0 fw-bolder text-start border rounded-pill px-3 text-white" style={{backgroundImage:"linear-gradient(45deg, #67b136, #39aad4)"}}>
                  Informacion de la unidad de medida
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-4 mt-4 ms-4">
                <label>Codigo:</label>
                 <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="Codigo"
                    {...register("Cod")}
                  />
                  
                
              </div>
              <div className="col-12 col-md-4 mt-4 ms-4">
                 <label>Nombre:</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="Nombre"
                    {...register("Nombre")}
                  />
                 
                
              </div>
            </div>

            <div className="row">
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill px-3"
                >
                  Limpiar
                </button>
                <button
                  type="button"
                  className="btn btn-danger text-capitalize border rounded-pill px-3"
                  onClick={handleCloseModalCrearUnidad}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill px-3"
                >
                  Guardar
                </button>
              </div>
            </div>
          </ModalLocal>
          <ModalLocal localState={crearMarca}>
            <div className="row">
              <div className="col">
                <label className="mt-3 form-control ms-0 fw-bolder text-center">
                  Registro Marca
                </label>
              </div>
            </div>
            <div className="row">
              <label className="mt-3 ms-4  form-control ms-0 fw-bolder text-start border rounded-pill px-3 text-white" style={{width:"-webkit-fill-available", backgroundImage:"linear-gradient(45deg, #67b136, #39aad4)"}}>
                Informacion de la Marca
              </label>
            </div>
            <div className="row">
              <div className="col-12 col-md-4 mt-4 ms-4">
               <label>Codigo:</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="Codigo"
                    {...register("Cod")}
                  />
                  
                
              </div>
              <div className="col-12 col-md-4 mt-4 ms-4">
                <label>Nombre:</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="Nombre"
                    {...register("Nombre")}
                  />
                  
                
              </div>
            </div>
            <div className="row">
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill px-3"
                >
                  Limpiar
                </button>
                <button
                  type="button"
                  className="btn btn-danger text-capitalize border rounded-pill px-3"
                  onClick={handleCloseModalCrearMarca}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill px-3"
                >
                  Guardar
                </button>
              </div>
            </div>
          </ModalLocal>
          <ModalLocal localState={crearNombreCientifico}>
            <div className="row">
              <div className="col">
                <label className="mt-3 form-control ms-0 fw-bolder text-center">
                  Registro Nombre Cientifico
                </label>
              </div>
            </div>
            <div className="row">
            <label className="mt-3 ms-4  form-control ms-0 fw-bolder text-start border rounded-pill px-3 text-white" style={{width:"-webkit-fill-available", backgroundImage:"linear-gradient(45deg, #67b136, #39aad4)"}}>
                Informacion del articulo
              </label>
            </div>
            <div className="row mt-4">
              <div className="col-12 col-md-4 ms-2">
                <label>Codigo:</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="Codigo"
                    {...register("Cod")}
                  />
                  
                
              </div>
              <div className="col-12 col-md-4 ms-1">
                <label>Nombre:</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="Nombre"
                    {...register("Nombre")}
                  />
                  
                
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-4 mt-1 ms-1">
                 <label>Nombre Cientifico:</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="Nombre cientifico"
                    {...register("NombCient")}
                  />
                 
                
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill px-3"
                  onClick={handleOpenModalArticulos}
                >
                  buscar
                </button>
              </div>
            </div>
            <div className="row">
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill px-3"
                >
                  Limpiar
                </button>
                <button
                  type="button"
                  className="btn btn-danger text-capitalize border rounded-pill px-3"
                  onClick={handleCloseModalCrearNombreCientifico}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill px-3"
                >
                  Guardar
                </button>
              </div>
            </div>

            <BusquedaArticuloModal
              isModalActive={modalArticulos}
              setIsModalActive={setModalArticulos}
            />
          </ModalLocal>
        </form>
      </div>
    </div>
  );
};

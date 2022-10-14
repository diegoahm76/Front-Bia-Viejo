import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ModalLocal from "../../../components/ModalLocal";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";

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
    { label: "NIT", value:"NIT"}
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
          <button class="btn btn-2 btn-danger text-capitalize" type="button">
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
          <button class="btn btn-2 btn-danger text-capitalize" type="button">
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
        <h3 className="mt-3 mb-0 text-center mb-6">Entrada de Articulos</h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <div className={"row"} hidden={page === 2}>
            <div className={"row"}>
              <label className="form-control ms-0 fw-bolder text-center">
                Datos generales
              </label>
              <div className="row">
                <div className="col-12 col-md-4 mt-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Consecutivo"
                      rules={{ required: true }}
                      {...register("Consecutivo")}
                    />
                    <label>Consecutivo: <span className="text-danger">*</span></label>
                  </div>
                  {errors.Consecutivo && (
                          <p className="text-danger">
                            Este campo es obligatorio
                          </p>
                        )}
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

                <div className="col-12 col-md-4">
                  <label className="form-control ms-0">
                    Origen del articulo:{" "}<span className="text-danger">*</span>
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
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="tel"
                        placeholder="Numero de factura de compra"
                        {...register("businessTel")}
                      />
                      <label className="ms-2">
                        Numero de factura de compra: <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="tel"
                        placeholder="Numero de Expediente"
                        {...register("businessTel")}
                      />
                      <label className="ms-2">Numero de Expediente: <span className="text-danger">*</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <label className="mt-6 form-control ms-0 fw-bolder text-center">
                Informacion de terceros:
              </label>
              <div className="row mt-2">
                <div className="col-12 col-md-4">
                  <label>Tipo de Documento: <span className="text-danger">*</span> </label>
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
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Numero de identificacion"
                      {...register("NumeroDoc")}
                    />
                    <label className="ms-2">Numero de identificacion: <span className="text-danger">*</span>  </label>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <label>Nombre: </label>
                  <label>Profesional de cormacarena</label>
                </div>
                <div className=" d-flex justify-content-end gap-2 mt-3 ">
                  <button
                    type="button"
                    className="btn btn-primary text-capitalize "
                  >
                    buscar
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <label>Busqueda de tercero: </label>
                  <button
                    type="button"
                    className="btn btn-primary text-capitalize "
                    onClick={handleOpenModalBusquedaPersonal}
                  >
                    buscar
                  </button>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col">
                <div className="form-floating input-group input-group-dynamic">
                  <textarea
                    className="form-control"
                    type="text"
                    placeholder="Concepto"
                    {...register("Concepto")}
                  />
                  <label className="ms-2">Concepto: <span className="text-danger">*</span>  </label>
                </div>
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
              <label>Anexar documentos: <span className="text-danger">*</span> </label>
              <div>
                <label for="formFileLg" class="form-label"></label>
                <input
                  class="form-control form-control-lg mt-1"
                  id="formFileLg"
                  type="file"
                  rules={{required:true}}
                />
              </div>
            </div>
          </div>

          <div className={"row"} hidden={page === 1}>
            <div>
              <label className="mt-3 form-control ms-0 fw-bolder text-center">
                Detalles
              </label>
            </div>

            <div className="row">
              <div className="col">
                <label className="mt-3 form-control ms-0 fw-bolder text-center">
                  Identificacion de articulos
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    required={page === 2}
                    placeholder="Codigo"
                    {...register("Cod")}
                  />
                  <label className="ms-2">Codigo: <span className="text-danger">*</span> </label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    required={page === 2}
                    placeholder="NombreArt"
                    disabled="true"
                  
                  />
                  <label className="ms-2">Nombre de articulo:</label>
                </div>
              </div>
              <div className="col-12 col-md-4 d-flex justify-content-end gap-2 ">
                <button
                  type="button"
                  className="btn btn-primary text-capitalize "
                >
                  buscar
                </button>
              </div>
              <div className="col">
                <label>Tipo de Articulo</label>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-4">
              <label className="ms-2">Buscar articulo: </label>
                <button
                  type="button"
                  className="btn btn-primary text-capitalize"
                  onClick={handleOpenModalArticulos}
                >
                  Buscar
                </button>
              </div>
            </div>
            <div className="row">
              <div>
                <label className="mt-3 form-control ms-0 fw-bolder text-center">
                  Informacion de articulo
                </label>
              </div>

              <div>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        required={page === 2}
                        placeholder="Unidad de medida"
                        {...register("UniMe")}
                      />
                      <label className="ms-2">Unidad de Medida: <span className="text-danger">*</span> </label>

                      <button
                        type="button"
                        className="btn btn-primary text-capitalize"
                        onClick={handleOpenModalCrearUnidad}
                      >
                        Crear
                      </button>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="numb"
                        required={page === 2}
                        placeholder="Cantidad"
                        {...register("Cantidad")}
                      />
                      <label className="ms-2">Cantidad: <span className="text-danger">*</span>  </label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="numb"
                        required={page === 2}
                        placeholder="Valor unitario"
                        {...register("ValUni")}
                      />
                      <label className="ms-2">Valor unitario: <span className="text-danger">*</span> </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="numb"
                        required={page === 2}
                        placeholder="Porcentaje IVA"
                        {...register("PorceIVA")}
                      />
                      <label className="ms-2">Porcentaje IVA: <span className="text-danger">*</span>  </label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="numb"
                        required={page === 2}
                        placeholder="Valor IVA"
                        {...register("ValorIVA")}
                        disabled="true"
                      />
                      <label className="ms-2">Valor IVA: <span className="text-danger">*</span> </label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="numb"
                        required={page === 2}
                        placeholder="Valor unitario Total"
                        {...register("ValUni")}
                        disabled="true"
                      />
                      <label className="ms-2">Valor unitario Total:</label>
                    </div>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-12 col-md-4">
                    <label className="form-control ms-0">
                      Estado del articulo:{" "} : <span className="text-danger">*</span> 
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
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        required={page === 2}
                        placeholder="Nombre Cientifico"
                        {...register("NombreCient")}
                      />
                      <label className="ms-2">
                        Nombre Cientifico (viveros): <span className="text-danger">*</span> 
                      </label>
                      <button
                        type="button"
                        className="btn btn-primary text-capitalize"
                        onClick={handleOpenModalCrearNombreCientifico}
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <textarea
                        className="form-control"
                        type="text"
                        required={page === 2}
                        placeholder="Observaciones"
                        {...register("Observaciones")}
                      />
                      <label className="ms-2">Observaciones: <span className="text-danger">*</span> </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="row mt-3">
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        required={page === 2}
                        placeholder="Unidad de medida"
                        {...register("UniMed")}
                      />
                      <label className="ms-2">Unidad de Medida: <span className="text-danger">*</span>  </label>
                      <button
                        type="button"
                        className="btn btn-primary text-capitalize"
                        onClick={handleOpenModalCrearUnidad}
                      >
                        Crear
                      </button>
                    </div>
                    
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        required={page === 2}
                        placeholder="Marca"
                        {...register("Marca")}
                      />
                      <label className="ms-2 me-2 ">Marca: <span className="text-danger">*</span>  </label>

                      <button
                        type="button"
                        className=" ms-2 btn btn-primary text-capitalize"
                        onClick={handleOpenModalCrearMarca}
                      >
                        Crear
                      </button>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        required={page === 2}
                        placeholder="Modelo"
                        {...register("Model")}
                      />
                      <label className="ms-2">Modelo: <span className="text-danger">*</span>  </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="numb"
                        required={page === 2}
                        placeholder="Cantidad"
                        {...register("Cant")}
                      />
                      <label className="ms-2">Cantidad: <span className="text-danger">*</span>  </label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        required={page === 2}
                        placeholder="Vida util"
                        {...register("VidaU")}
                      />
                      <label className="ms-2">Vida util: <span className="text-danger">*</span> </label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="numb"
                        required={page === 2}
                        placeholder="Porcentaje IVA"
                        {...register("PorcentIVA")}
                      />
                      <label className="ms-2">Porcentaje IVA: <span className="text-danger">*</span> </label>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="numb"
                        required={page === 2}
                        placeholder="Valor Unitario"
                        {...register("ValUni")}
                      />
                      <label className="ms-2">Valor unitario: <span className="text-danger">*</span>  </label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="numb"
                        required={page === 2}
                        placeholder="Valor IVA"
                        {...register("ValorIVA")}
                        disabled="true"
                      />
                      <label className="ms-2">Valor IVA:</label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="numb"
                        required={page === 2}
                        placeholder="Valor unitario Total"
                        {...register("ValUniTotal")}
                        disabled="true"
                      />
                      <label className="ms-2">Valor unitario Total: <span className="text-danger">*</span> </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <label className="form-control ms-0">
                      Estado del articulo:{" "}: <span className="text-danger">*</span> 
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
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="numb"
                        required={page === 2}
                        placeholder="Valor Residual"
                        {...register("ValorRes")}
                      />
                      <label className="ms-2">Valor Residual: <span className="text-danger">*</span> </label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        required={page === 2}
                        placeholder="Garantia"
                        {...register("Garantia")}
                      />
                      <label className="ms-2">Garantia: <span className="text-danger">*</span> </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="numb"
                        required={page === 2}
                        placeholder="Dias de uso"
                        {...register("DiasUso")}
                      />
                      <label className="ms-2">Dias de uso: <span className="text-danger">*</span> </label>
                    </div>
                  </div>
                  <div className="col-8 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <textarea
                        className="form-control"
                        type="text"
                        required={page === 2}
                        placeholder="Observaciones"
                        {...register("Observ")}
                      />
                      <label className="ms-2">Observaciones: <span className="text-danger">*</span> </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  className="col-3 col-md-4 ms-2 mt-4 btn btn-secondary text-capitalize"
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
                className={`btn btn-primary text-capitalize ${
                  page === 1 && "d-none"
                }`}
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
              <button type="button" className="btn btn-light text-capitalize ">
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary text-capitalize "
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
          <ModalLocal localState={modal}>
            <div className="row">
              <div className="col">
                <label className="mt-3 form-control ms-0 fw-bolder text-center">
                  Resumen
                </label>
              </div>
              <div className="row">
                <div className="col">
                  <label className="mt-3 form-control ms-0 fw-bolder text-center">
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
                  <div className="ag-theme-alpine" style={{ height: "400px" }}>
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
                  <div className="ag-theme-alpine" style={{ height: "400px" }}>
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
                    className="btn btn-secondary text-capitalize"
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
                  className="btn btn-danger text-capitalize"
                  onClick={handleCloseModal}
                >
                  Regresar
                </button>

                <button
                  type="button"
                  className="btn btn-primary text-capitalize"
                >
                  Guardar
                </button>
              </div>
            </div>
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
                <label className="mt-3 ms-4 form-control ms-0 fw-bolder text-start">
                  Informacion de la unidad de medida
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-4 mt-4 ms-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Codigo"
                    {...register("Cod")}
                  />
                  <label>Codigo:</label>
                </div>
              </div>
              <div className="col-12 col-md-4 mt-4 ms-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Nombre"
                    {...register("Nombre")}
                  />
                  <label>Nombre:</label>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-primary text-capitalize"
                >
                  Limpiar
                </button>
                <button
                  type="button"
                  className="btn btn-danger text-capitalize"
                  onClick={handleCloseModalCrearUnidad}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="btn btn-primary text-capitalize"
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
              <label className="mt-3 ms-4 form-control ms-0 fw-bolder text-start">
                Informacion de la Marca
              </label>
            </div>
            <div className="row">
              <div className="col-12 col-md-4 mt-4 ms-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Codigo"
                    {...register("Cod")}
                  />
                  <label>Codigo:</label>
                </div>
              </div>
              <div className="col-12 col-md-4 mt-4 ms-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Nombre"
                    {...register("Nombre")}
                  />
                  <label>Nombre:</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-primary text-capitalize"
                >
                  Limpiar
                </button>
                <button
                  type="button"
                  className="btn btn-danger text-capitalize"
                  onClick={handleCloseModalCrearMarca}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="btn btn-primary text-capitalize"
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
              <label className="mt-3 ms-4 form-control ms-0 fw-bolder text-start">
                Informacion de la Marca
              </label>
            </div>
            <div className="row">
              <div className="col-12 col-md-4 mt-4 ms-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Codigo"
                    {...register("Cod")}
                  />
                  <label>Codigo:</label>
                </div>
              </div>
              <div className="col-12 col-md-4 mt-4 ms-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Nombre"
                    {...register("Nombre")}
                  />
                  <label>Nombre:</label>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-primary text-capitalize"
                    onClick={handleOpenModalArticulos}
                  >
                    buscar
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-4 mt-4 ms-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Nombre cientifico"
                    {...register("NombCient")}
                  />
                  <label>Nombre Cientifico:</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-primary text-capitalize"
                >
                  Limpiar
                </button>
                <button
                  type="button"
                  className="btn btn-danger text-capitalize"
                  onClick={handleCloseModalCrearNombreCientifico}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="btn btn-primary text-capitalize"
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

import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import ModalLocal from "../../../components/ModalLocal";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";
import Subtitle from "../../../components/Subtitle";
import CrearUnidadMedidaModal from "../../../components/CrearUnidadMedidaModal";
import { textChoiseAdapter } from "../../../adapters/textChoices.adapter";
import clienteAxios from "../../../config/clienteAxios";
import IconoGuardar from "../../../assets/iconosBotones/guardar.svg";
import IconoCancelar from "../../../assets/iconosBotones/cancelar.svg";
import IconoBuscar from "../../../assets/iconosBotones/buscar.svg";
import IconoAgregar from "../../../assets/iconosBotones/agregar.svg";
import IconoLimpiar from "../../../assets/iconosBotones/limpiar.svg";
import IconoSiguiente from "../../../assets/iconosBotones/continuar.svg";
import IconoAtras from "../../../assets/iconosBotones/atrás.svg";
import IconoVer from "../../../assets/iconosBotones/ver.svg";
import BusquedaAvanzadaModal from "../../../components/BusquedaAvanzadaModal";
import CrearMarcaModal from "../../../components/CrearMarcaModal";
import CrearPorcentajeIvaModal from "../../../components/CrearPorcentajeIvaModal";

export const EntradaDeArticuloScreen = () => {
  const [selectedEntrada, setSelectedEntrada] = useState({ value: "" });
  const [EstadoArticulos, setEstadoArticulos] = useState([]);
  useEffect(() => {
    const getSelectsOptions = async () => {
      try {
        const { data: EstadoArticulosNoFormat } = await clienteAxios.get(
          "almacen/choices/estados-articulo/"
        );
        const estadosArticulosFormat = textChoiseAdapter(
          EstadoArticulosNoFormat
        );
        // setEstadoArticulos(estadosArticulosFormat);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);
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

  const [crearUnidadMedidaOpen, setCrearUnidadMedidaOpen] = useState(false);
  const [crearPorcentajeOpen, setCrearPorcentajeOpen] = useState(false);

  const [crearMarcaOpen, setCrearMarcaOpen] = useState(false);

  const [crearNombreCientifico, setCrearNombreCientifico] = useState(false);

  const handleOpenModalCrearNombreCientifico = () => {
    setCrearNombreCientifico(true);
  };

  const handleCloseModalCrearNombreCientifico = () => {
    setCrearNombreCientifico(false);
  };

  const [modal, setModal] = useState(false);

  const handleOpenModalIva = () => {
    setCrearPorcentajeOpen(true);
  };

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleOpenModalAvanzadaModal = () => {
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
            <h3 className="mt-3 ms-3 mb-0 text-start fw-light mb-4">
              Entrada de Articulos
            </h3>
            <div className={"row"} hidden={page === 2}>
              <div className={"row"}>
                <Subtitle title={"Datos generales"} />
                <div className="row ms-1 mt-4">
                  <div className="col-6 col-sm-3 mt-3">
                    <label className="text-terciary">
                      Consecutivo: <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control border rounded-pill px-3 border border-terciary"
                      type="text"
                      placeholder="Consecutivo"
                      required
                      {...register("Consecutivo")}
                    />

                    {errors.Consecutivo && (
                      <p className="text-danger">Este campo es obligatorio</p>
                    )}
                  </div>

                  <div className="col-6 col-sm-3 mt-3">
                    <label
                      htmlFor="exampleFormControlInput1 "
                      className="text-terciary"
                    >
                      Fecha de Ingreso: <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="fechaNacimiento"
                      control={control}
                      render={({ field }) => (
                        <ReactDatePicker
                          {...field}
                          locale="es"
                          className="form-control border rounded-pill px-3 border border-terciary "
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

                  <div className="col-6 col-sm-3 mt-1">
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

                  <div className="col-6 col-sm-3 mt-3">
                    {selectedEntrada.value === "Comp" ? (
                      <div>
                        <label className="text-terciary ">
                          Numero de factura de compra:{" "}
                          <span className="text-danger">*</span>
                        </label>

                        <input
                          className="form-control border rounded-pill px-3 border border-terciary"
                          type="tel"
                          placeholder="Numero de factura de compra"
                          {...register("businessTel")}
                        />
                      </div>
                    ) : (
                      <div>
                        <label>
                          Numero de Expediente:{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control border rounded-pill px-3 border border-terciary"
                          type="tel"
                          placeholder="Numero de Expediente"
                          {...register("businessTel")}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <Subtitle title={"Informacion de terceros"} />
                <div className="row ms-1 mt-2">
                  <div className="col-6 col-sm-3">
                    <label className="text-terciary">
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
                  <div className="col-6 col-sm-3">
                    <label className="ms-2 text-terciary">
                      Numero de identificacion:{" "}
                      <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      className="form-control border rounded-pill px-3 border border-terciary"
                      type="text"
                      placeholder="Numero de identificacion"
                      {...register("NumeroDoc")}
                    />
                  </div>
                  <div className="col-6 col-sm-2 mt-2">
                    <button
                      type="button"
                      className="btn  text-capitalize btn-outline-ligth px-3 mt-4"
                      title="Buscar profesional cormacarena"
                    >
                      <img src={IconoBuscar} alt="buscar" />
                    </button>
                  </div>
                  <div className="col-6 col-sm-3 mt-2">
                    <button
                      type="button"
                      className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                      onClick={handleOpenModalAvanzadaModal}
                    >
                      busqueda avanzada
                    </button>
                  </div>
                </div>
              </div>
              <div className="row ms-1 mt-3">
                <div className="col">
                  <label className="ms-2 text-terciary">
                    Concepto: <span className="text-danger">*</span>{" "}
                  </label>
                  <textarea
                    className="form-control border rounded-pill px-3 border border-terciary"
                    typeof="text"
                    placeholder="Concepto"
                    {...register("Concepto")}
                  />
                </div>
              </div>
              <div className="row ms-1 mt-3">
                <div className="col">
                  <label className="text-terciary">Bodega</label>
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
              <div className="row ms-1 mt-3">
                <div className="col-12 col-md-4">
                  <label className="text-terciary">
                    Anexar documentos: <span className="text-danger">*</span>{" "}
                  </label>
                  <div>
                    <label htmlFor="formFileLg" className="form-label"></label>
                    <input
                      className="form-control form-control-lg border rounded-pill px-3 border border-terciary"
                      id="formFileLg"
                      type="file"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={"row"} hidden={page === 1}>
              <div>
                <label className=" form-control ms-0 fw-border text-start ms-2">
                  Detalles
                </label>
              </div>

              <div className="row">
                <div className="col">
                  <Subtitle title={"Identificacion de articulos"} />
                </div>
              </div>
              <div className="row ms-1 align-items-end">
                <div className="col-6 col-sm-3">
                  <label className="ms-2 text-terciary">
                    Codigo: <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="text"
                    required={page === 2}
                    placeholder="Codigo"
                    {...register("Cod")}
                  />
                </div>
                <div className="col-6 col-sm-3">
                  <label className="ms-2 text-terciary">
                    Nombre de articulo:
                  </label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="text"
                    required={page === 2}
                    placeholder="Nombre Articulo"
                    disabled={true}
                  />
                </div>
                <div
                  className="col-6 col-sm-3 mt-4 d-inline-block"
                  title="Buscar"
                >
                  <button
                    type="button"
                    className="btn text-capitalize btn-outline-ligth px-3 mb-0"
                  >
                    <img src={IconoBuscar} alt="buscar" />
                  </button>
                </div>
                <div className="col-6 col-sm-3">
                  <button
                    type="button"
                    className="btn btn-primary text-capitalize ms-1 border rounded-pill px-3 mb-0"
                    onClick={handleOpenModalArticulos}
                  >
                    Busqueda de articulo
                  </button>
                </div>
              </div>

              <div className="row mt-4">
                <div>
                  <Subtitle title={"Informacion de articulo"} />
                </div>

                <div>
                  <div className=" row ms-2">
                    <div className="col-6 col-sm-3">
                      <div>
                        <label className="text-terciary">
                          Unidad de Medida{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <br />
                        <input
                          className="form-control border rounded-pill px-3 border border-terciary"
                          type="text"
                          required={page === 2}
                          placeholder="Unidad de medida"
                          {...register("UniMe")}
                        />
                      </div>
                    </div>
                    <div className="col-6 col-sm-3 d-grid gap-2 d-md-flex justify-content-md-rigth mt-3">
                      <button
                        type="button"
                        className="btn btn-primary text-capitalize border rounded-pill px-3 mt-3 btn-min-width"
                        onClick={() => setCrearUnidadMedidaOpen(true)}
                      >
                        Crear
                      </button>
                    </div>
                    <div className="col-6 col-sm-3">
                      <label className="ms-2 text-terciary">
                        Cantidad <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control border rounded-pill px-3 border border-terciary"
                        type="number"
                        required={page === 2}
                        placeholder="Cantidad"
                        {...register("Cantidad")}
                      />
                    </div>
                    <div className="col-6 col-sm-3">
                      <label className="ms-2 text-terciary">
                        Valor unitario <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control border rounded-pill px-3 border border-terciary"
                        type="numb"
                        required={page === 2}
                        placeholder="Valor unitario"
                        {...register("ValUni")}
                      />
                    </div>
                    <div className="col-6 col-sm-3">
                      <label className="ms-2 text-terciary">
                        Porcentaje IVA <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control border rounded-pill px-3 border border-terciary"
                        type="numb"
                        required={page === 2}
                        placeholder="Porcentaje IVA"
                        {...register("PorceIVA")}
                      />
                    </div>
                    <div className="col-6 col-sm-3 d-grid gap-2 d-md-flex justify-content-md-rigth mt-3">
                      <button
                        type="button"
                        className="btn btn-primary text-capitalize border rounded-pill px-3 mt-3 btn-min-width"
                        onClick={handleOpenModalIva}
                      >
                        Crear
                      </button>
                    </div>
                    <div className="col-6 col-sm-3 mt-1">
                      <label className="ms-2 text-terciary">
                        Valor IVA <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control border rounded-pill px-3 mt-2 border border-terciary"
                        type="numb"
                        required={page === 2}
                        placeholder="Valor IVA"
                        {...register("ValorIVA")}
                        disabled={true}
                      />
                    </div>
                    <div className="col-6 col-sm-3">
                      <label className="ms-2 text-terciary">
                        Valor unitario Total
                      </label>
                      <input
                        className="form-control border rounded-pill px-3 mt-2 border border-terciary"
                        type="numb"
                        required={page === 2}
                        placeholder="Valor unitario Total"
                        {...register("ValUni")}
                        disabled={true}
                      />
                    </div>
                    <div className="col-6 col-sm-3">
                      <label className="form-control ms-0">
                        Estado del articulo{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="options"
                        control={control4}
                        rules={{ required: page === 2 }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={EstadoArticulos}
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
                    <div className="col-6 col-sm-3">
                      <label className="text-terciary">
                        Nombre Cientifico <span className="text-danger">*</span>
                      </label>
                      <br />
                      <input
                        className="form-control border rounded-pill px-3 mt-2 border border-terciary"
                        type="text"
                        required={page === 2}
                        placeholder="Nombre Cientifico"
                        {...register("NombreCient")}
                      />
                    </div>
                    <div className="col-6 col-sm-3 d-grid gap-2 d-md-flex justify-content-md-rigth mt-3">
                      <button
                        type="button"
                        className="btn text-capitalize btn-outline-ligth px-3 mt-4 btn-min-width"
                        title="Agregar"
                        onClick={handleOpenModalCrearNombreCientifico}
                      >
                        <img src={IconoAgregar} alt="agregar" />
                      </button>
                    </div>
                  </div>
                  <div className="row ms-3">
                    <label className="text-terciary">
                      Observaciones: <span className="text-danger">*</span>{" "}
                    </label>
                    <textarea
                      className="form-control border rounded-pill px-3 border border-terciary"
                      typeof="text"
                      required={page === 2}
                      placeholder="Observaciones"
                      {...register("Observaciones")}
                    />
                  </div>
                </div>

                <div>
                  <div className="row ms-2 mt-5">
                    <Subtitle title={"Entrada de activo"} mb={4} />
                    <div className="col-6 col-sm-3">
                      <div>
                        <label className="ms-2 text-terciary">
                          Unidad de Medida:{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control border rounded-pill px-3 border border-terciary"
                          type="text"
                          required={page === 2}
                          placeholder="Unidad de medida"
                          {...register("UniMed")}
                        />
                      </div>
                    </div>
                    <div className="col-6 col-sm-3 d-grid gap-2 d-md-flex justify-content-md-rigth mt-3">
                      <button
                        type="button"
                        className="btn btn-primary text-capitalize border rounded-pill px-3 mt-3 btn-min-width"
                        onClick={() => setCrearUnidadMedidaOpen(true)}
                      >
                        Crear
                      </button>
                    </div>
                    <div className="col-6 col-sm-3">
                      <div>
                        <label className="ms-2 me-2 text-terciary ">
                          Marca: <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control border rounded-pill px-3 border border-terciary"
                          type="text"
                          required={page === 2}
                          placeholder="Marca"
                          {...register("Marca")}
                        />
                      </div>
                    </div>

                    <div className="col-6 col-sm-3 d-grid gap-2 d-md-flex justify-content-md-rigth mt-3">
                      <button
                        type="button"
                        className=" btn btn-primary text-capitalize border rounded-pill px-3 mt-3 btn-min-width"
                        onClick={() => setCrearMarcaOpen(true)}
                      >
                        Crear
                      </button>
                    </div>
                  </div>

                  <div className="row ms-2 align-items-end">
                    <div className="col-6 col-sm-3">
                      <label className="ms-2 text-terciary">
                        Modelo: <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control border rounded-pill px-3 border border-terciary"
                        type="text"
                        required={page === 2}
                        placeholder="Modelo"
                        {...register("Model")}
                      />
                    </div>

                    <div className="col-6 col-sm-3">
                      <label className="ms-2 text-terciary">
                        Cantidad: <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control border rounded-pill px-3 border border-terciary"
                        type="float"
                        required={page === 2}
                        placeholder="Cantidad"
                        {...register("Cant")}
                      />
                    </div>
                    <div className="col-6 col-sm-3">
                      <label className="ms-2 text-terciary">
                        Vida util: <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control border rounded-pill px-3 border border-terciary"
                        type="text"
                        required={page === 2}
                        placeholder="Vida util"
                        {...register("VidaU")}
                      />
                    </div>
                    <div className="col-6 col-sm-3">
                      <label className="ms-2 text-terciary">
                        Porcentaje IVA: <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control border rounded-pill px-3 border border-terciary"
                        type="float"
                        required={page === 2}
                        placeholder="Porcentaje IVA"
                        {...register("PorcentIVA")}
                      />
                    </div>
                    <div className="col-6 col-sm-3">
                      <label className="ms-2 text-terciary">
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
                    <div className="col-6 col-sm-3">
                      <label className="ms-2">Valor IVA:</label>
                      <input
                        className="form-control border rounded-pill px-3 border border-terciary"
                        type="float"
                        required={page === 2}
                        placeholder="Valor IVA"
                        {...register("ValorIVA")}
                        disabled={true}
                      />
                    </div>
                    <div className="col-6 col-md-3 mt-2">
                      <label className="ms-2 text-terciary">
                        Valor unitario Total:{" "}
                      </label>
                      <input
                        className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                        type="float"
                        required={page === 2}
                        placeholder="Valor unitario Total"
                        {...register("ValUniTotal")}
                        disabled={true}
                      />
                    </div>

                    <div className="col-6 col-sm-3">
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
                            options={EstadoArticulos}
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
                    <div className="col-6 col-sm-3 mt-2">
                      <label className="ms-2 text-terciary">
                        Valor Residual: <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                        type="numb"
                        required={page === 2}
                        placeholder="Valor Residual"
                        {...register("ValorRes")}
                      />
                    </div>
                    <div className="col-6 col-sm-3 mt-2">
                      <label className="ms-2 text-terciary">
                        Garantia: <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                        type="text"
                        required={page === 2}
                        placeholder="Garantia"
                        {...register("Garantia")}
                      />
                    </div>
                    <div className="col-6 col-sm-3">
                      <label className="ms-2 text-terciary">
                        Dias de uso: <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control border rounded-pill px-3 border border-terciary"
                        type="numb"
                        required={page === 2}
                        placeholder="Dias de uso"
                        {...register("DiasUso")}
                      />
                    </div>
                  </div>
                  <div className="row ms-2 mt-3">
                    <div className="col ">
                      <label className="ms-2 text-terciary">
                        Observaciones: <span className="text-danger">*</span>{" "}
                      </label>
                      <textarea
                        className="form-control border rounded-pill px-3 border border-terciary"
                        typeof="text"
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
                    className="col-3 col-md-4 ms-4 mt-4 btn  text-capitalize btn-outline-ligth px-3"
                    title="Agregar"
                  >
                    <img src={IconoAgregar} alt="agregar" />
                  </button>
                </div>
                <div className="row">
                  <div className="d-flex justify-content-end gap-4 mt-4">
                    <button
                      type="button"
                      className={`btn text-capitalize btn-outline-ligth px-3 ${page === 1 && "d-none"
                        }`}
                      style={{ minWidth: "100px" }}
                      onClick={handleOpenModal}
                      title="Ver resumen de entrada"
                    >
                      <img src={IconoVer} alt="ver" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="d-flex justify-content-end gap-4 mt-4">
                <button
                  type="button"
                  className="btn  text-capitalize btn-outline-ligth px-3"
                  title="Cancelar"
                >
                  <img src={IconoCancelar} alt="cancelar" />
                </button>
                <button
                  type="button"
                  className="btn btn-outline-ligth text-capitalize  px-3"
                  aria-label="Cancelar"
                  title="Limpiar"
                >
                  <img src={IconoLimpiar} alt="limpiar" />
                </button>

                <button
                  className={`btn btn-outline-ligthtext-capitalize  px-3 ${page === 1 && "d-none"
                    }`}
                  type="button"
                  title="Regresar a la pagina anterior"
                  onClick={handlePreviousPage}
                >
                  <img src={IconoAtras} alt="atras" />
                </button>
                <button
                  className="btn  text-capitalize btn-outline-ligth px-3"
                  type="submit"
                  form="configForm"
                >
                  {page === 1 ? (
                    <img
                      src={IconoSiguiente}
                      title="Siguiente"
                      alt="siguiente"
                    />
                  ) : (
                    "Continuar"
                  )}{" "}
                </button>
              </div>
            </div>
          </MarcaDeAgua1>
          <ModalLocal localState={modal}>
            <MarcaDeAgua1>
              <div className="row">
                <div className="col">
                  <h2 className="mt-3 ms-3 form-control ms-0 fw-bolder text-start">
                    Resumen
                  </h2>
                </div>
                <div className="row">
                  <div className="col">
                    <Subtitle title={"Articulos a ingresar"} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="mt-3 ms-3 form-control ms-0 fw-bolder text-start">
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
                    <label className="mt-3 ms-3 form-control ms-0 fw-bolder text-start">
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
          <BusquedaAvanzadaModal
            isModalActive={modalPersonal}
            setIsModalActive={setModalPersonal}
          />
          <BusquedaArticuloModal
            isModalActive={modalArticulos}
            setIsModalActive={setModalArticulos}
          />

          <ModalLocal localState={crearNombreCientifico}>
            <div className="row">
              <div className="col">
                <label className="mt-3 ms-3 form-control ms-0 fw-bolder text-start">
                  Registro Nombre Cientifico
                </label>
              </div>
            </div>
            <div className="row">
              <Subtitle title={"Informacion del Articulo"} />
            </div>
            <div className="row mt-4">
              <div className="col-12 col-md-4 ms-2">
                <label className="text-terciary">Codigo:</label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="Codigo"
                  {...register("Cod")}
                />
              </div>
              <div className="col-12 col-md-4 ms-1">
                <label className="text-terciary">Nombre:</label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="Nombre"
                  {...register("Nombre")}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-4 mt-1 ms-1">
                <label className="text-terciary">Nombre Cientifico:</label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
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
      <CrearUnidadMedidaModal
        isModalActive={crearUnidadMedidaOpen}
        setIsModalActive={setCrearUnidadMedidaOpen}
      />
      <CrearMarcaModal
        isModalActive={crearMarcaOpen}
        setIsModalActive={setCrearMarcaOpen}
      />
      <CrearPorcentajeIvaModal
        isModalActive={crearPorcentajeOpen}
        setIsModalActive={setCrearPorcentajeOpen}>
      </CrearPorcentajeIvaModal>
    </div>
  );
};

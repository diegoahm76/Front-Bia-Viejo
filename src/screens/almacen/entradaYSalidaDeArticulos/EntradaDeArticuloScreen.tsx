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
import { useAppSelector } from '../../../store/hooks/hooks';
import { IGeneric } from '../../../Interfaces/Generic';

export const EntradaDeArticuloScreen = () => {
  const [selectedEntrada, setSelectedEntrada] = useState({ value: "" });
  const [unitys, setUnitys] = useState([]);
  const [state, setState] = useState([]);
  const [brand, setBrand] = useState([]);
  const [porcentage, setPorcentage] = useState([]);
  const [store, setStore] = useState([]);
  const [EstadoArticulos, setEstadoArticulos] = useState([]);

  const bienSeleccionado = useAppSelector(
    (state) => state.bien.bienSeleccionado
  );

  const initialOptions: IGeneric[] = [
    {
      label: "",
      value: "",
    },
  ];
  
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
    setValue,
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
    watch: watch4,
    formState: { errors: errors4 },
  } = useForm();
  const data4 = watch4();
  console.log(data4, "data4");
  

  const columnConsumo = [
    { headerName: "Codigo bien", field: "ID", minWidth: 150, maxWidth: 200 },
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
  const [rowDataConsumo] = useState([
    {
      ID: "2100200001",
      Nombre: "21-03-0001 Resma de papel ECOGRAF",
      Cantidad: "50",
      "Valor Total": "$1428000",
    },
    {
      ID: "2100200002",
      Nombre: "21-03-0002 Ambientador de baño GLADE",
      Cantidad: "35",
      "Valor Total": "$175000",
    },
    {
      ID: "2100200003",
      Nombre: "21-03-0003 Limpiador de piso VITAFLOR",
      Cantidad: "20",
      "Valor Total": "$342000",
    },
    {
      ID: "2100200004",
      Nombre: "21-03-0004 Esfero PAPERMATE",
      Cantidad: "50",
      "Valor Total": "$342000",
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

  useEffect(() => {
    getState();
    getUnitys();
    getBrand();
    getPercentage();
    getStore();
  }, []);

  const getUnitys = async () => {
    try {
      const { data } = await clienteAxios.get(
        "almacen/unidades-medida/get-list/"
      );
      setUnitys(
        data.map((item) => ({
          value: item.id_unidad_medida,
          label: item.nombre,
        }))
      );
    } catch (error: any) {}
  };
  const getState = async () => {
    try {
      const { data } = await clienteAxios.get(
        "almacen/estados-articulo/get-list/"
      );
      setState(
        data.map((item) => ({ value: item.id_marca, label: item.nombre }))
      );
    } catch (error: any) {}
  };
  const getBrand = async () => {
    try {
      const { data } = await clienteAxios.get("almacen/marcas/get-list/");
      setBrand(
        data.map((item) => ({ value: item.id_marca, label: item.nombre }))
      );
    } catch (error: any) {}
  };
  const getPercentage = async () => {
    try {
      const { data } = await clienteAxios.get("almacen/porcentajes/get-list/");
      setPorcentage(
        data.map((item) => ({
          value: item.id_porcentaje_iva,
          label: item.porcentaje,
        }))
      );
    } catch (error: any) {}
  };
  const getStore = async () => {
    try {
      const { data } = await clienteAxios.get("almacen/bodega/get-list/");
      setStore(
        data.map((item) => ({ value: item.id_bodega, label: item.nombre }))
      );
    } catch (error: any) {}
  };
  // const fetchData = async () => {
  //   try {
  //     setBotonAdministrador(true);
  //     const response = await Axios({
  //       url: "https://backend-bia-beta-production.up.railway.app/api/almacen/unidades-medida/get-list/",
  //     });
  //     setUnidades(response.data);
  //     console.log("obtener lista");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const busquedaAvanzadaModel = {
    tipoDocumento: { value: "", label: "" },
    cedula: "",
    nombreCompleto: "",
    idResponsable: 0,
  };

  const busquedaArticuloModel = {
    cod_tipo_bien: "",
    codigo_bien: "",
    cod_tipo_activo: "",
    marca: { label: "", value: "" },
    nombre: "",
    doc_identificador_nro: { label: "", value: "" },
    accion: "",
    porcentaje_iva: { label: 0, value: 0 }
  }

  const [busquedaArticulo, setBusquedaArticulo] = useState(
    busquedaArticuloModel
  );
  const [busquedaModel, setBusquedaModel] = useState(busquedaAvanzadaModel);
  console.log(busquedaArticulo);

  const changeSelectTipoDoc = (e) => {
    let doc = { ...busquedaModel };
    doc.tipoDocumento = {
      value: e.value,
      label: e.label,
    };

    setValue("tipoDocumento", doc.tipoDocumento);
    setBusquedaModel(doc);
  };

  const changeSelectMarca = (e) => {
    let marcaEjem = { ...busquedaArticulo };
    marcaEjem.marca = {
      value: e.value,
      label: e.label,
    };

    setValue("marca", marcaEjem.marca);
    setBusquedaArticulo(marcaEjem);
    console.log(marcaEjem.marca);
  };

  const changePorcentaje = (e) => {
    let porcentaje = {...busquedaArticulo};
    porcentaje.porcentaje_iva = {
      value: e.value,
      label: e.label,
    };

    setValue('porcentaje_iva', porcentaje.porcentaje_iva);
    setBusquedaArticulo(porcentaje);
  };

  const changeDoc = (e) => {
    const { name, value } = e.target;
    setBusquedaModel({ ...busquedaModel, [name]: value });
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
            <h3 className="mt-3 ms-3 mb-0 text-start fw-light mb-4">
              Entrada de Artículos
            </h3>
            
            <div className={"row"} hidden={page === 2}>
              <div className={"row"}>
                <Subtitle title={"Datos maestro"} />
                <div className="row ms-1 mt-2">
                  <div className="col-6 col-sm-3 mt-3">
                    <label className="text-terciary">
                      Número de entrada: <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control border rounded-pill px-3 border border-terciary"
                      type="text"
                      placeholder="Consecutivo"
                      // required
                      // {...register("Consecutivo")}
                    />

                    {/* {errors.Consecutivo && (
                      <p className="text-danger">Este campo es obligatorio</p>
                    )} */}
                  </div>

                  <div className="col-6 col-sm-3 mt-3">
                    <label
                      htmlFor="exampleFormControlInput1 "
                      className="text-terciary"
                    >
                      Fecha: <span className="text-danger">*</span>
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
                      Tipo de entrada:{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="options"
                      control={control}
                      rules={{ required: false }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={opcEntrada}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {/* {errors.options && (
                      <p className=" form-control ms-0 text-danger">
                        Este campo es obligatorio
                      </p>
                    )} */}
                  </div>

                  <div className="col-6 col-sm-3 mt-3">
                    {selectedEntrada.value === "Comp" ? (
                      <div>
                        <label className="text-terciary ">
                          Número de factura de compra:{" "}
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
                          Número de Expediente:{" "}
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
                <Subtitle title={"Información de terceros"} />
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
                          isDisabled
                          value={busquedaModel.tipoDocumento}
                          // {...field}
                          options={opcDoc}
                          placeholder="Seleccionar"
                          {...register("tipoDocumento")}
                          onChange={changeSelectTipoDoc}
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
                      Numero de identificación:{" "}
                      <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      className="form-control border rounded-pill px-3 border border-terciary"
                      {...register("cedula")}
                      onChange={changeDoc}
                      type="number"
                      placeholder="Numero de identificacion"
                      value={busquedaModel.cedula}
                      disabled
                    />
                  </div>
                  <div className="col-6 col-sm-2 mt-1">
                    <button
                      type="button"
                      className="btn  text-capitalize btn-outline-ligth px-3 mt-4"
                      title="Buscar profesional cormacarena"
                    >
                      <i
                        className="fa-solid fa-magnifying-glass fs-3"
                        title="Buscar"
                      ></i>
                    </button>
                  </div>
                  <div className="col-6 col-sm-3 mt-1">
                    <button
                      type="button"
                      className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                      onClick={handleOpenModalAvanzadaModal}
                    >
                      Busqueda avanzada
                    </button>
                  </div>
                </div>
              </div>
              <div className="row ms-1 ">
                <div className="col">
                  <label className="ms-2 text-terciary">
                    Motivo: <span className="text-danger">*</span>{" "}
                  </label>
                  <textarea
                    className="form-control border rounded-pill px-3 border border-terciary"
                    typeof="text"
                    placeholder="Motivo"
                    {...register("Motivo")}
                  />
                </div>
              </div>
              <div className="row ms-1 ">
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
              <div className="row ms-1 ">
                <div className="col">
                  <label className="ms-2 text-terciary">
                    Observaciones: <span className="text-danger">*</span>{" "}
                  </label>
                  <textarea
                    className="form-control border rounded-pill px-3 border border-terciary"
                    typeof="text"
                    placeholder="Observaciones"
                    {...register("Observaciones")}
                  />
                </div>
              </div>
              <div className="row ms-1 mt-3">
                <div className="col">
                  <label className="text-terciary">Bodega</label>
                  <Controller
                    name="bodegas"
                    control={control3}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={store}
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
                      required={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={"row"} hidden={page === 1}>
              <div className="col">
                <Subtitle title={"Detalles"} />
              </div>
              <div className="row"> {/* CONSULTAR ARTICULO */}
                <div className="col-12 col-lg-3  mt-3">
                  <label className="ms-2 text-terciary">
                    Código bien: <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="text"
                    required={page === 2}
                    placeholder="Codigo"
                    {...register("codigo_bien")}
                    value={busquedaArticulo.codigo_bien}
                  />
                </div>
                <div className="col-12 col-lg-3  mt-3">
                  <label className="ms-2 text-terciary">
                    Nombre del artículo:
                  </label>
                  <input
                    className="form-control border rounded-pill px-3 border border-terciary"
                    type="text"
                    required={page === 2}
                    placeholder="Nombre Articulo"
                    disabled={true}
                    value={busquedaArticulo.nombre}
                  />
                </div>
                <div className="col-12 col-lg-2  mt-3 d-flex ">
                  <button
                    type="button"
                    className="btn text-capitalize btn-outline-ligth mt-4"
                  >
                    <i
                      className="fa-solid fa-magnifying-glass fs-3 "
                      title="Buscar"
                    ></i>
                  </button>
                </div>
                <div className="col-12 col-lg-3  mt-3 d-flex ">
                  <button
                    type="button"
                    className="btn btn-primary text-capitalize mt-4"
                    onClick={handleOpenModalArticulos}
                  >
                    Busqueda de articulo
                  </button>
                </div>
              </div>

              <div className="row"> {/* CONSUMO */}
                {busquedaArticulo.cod_tipo_bien === "C" ? (
                  <div>
                    <div>
                      <Subtitle title={"Entrada de consumo"} mt={3} />
                    </div>
                    <div className=" row ">
                      <div className="col-12 col-lg-3  mt-3">
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
                      <div className="col-12 col-lg-3  mt-3">
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
                      <div className="col-12 col-lg-3  mt-3">
                        <label className="ms-2 me-2 text-terciary ">
                          Porcentaje IVA: <span className="text-danger">*</span>{" "}
                        </label>
                        <Controller
                          name="options"
                          control={control4}
                          rules={{ required: page === 2 }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={porcentage}
                              placeholder="Seleccionar"
                              {...register('porcentaje_iva')}
                              value={busquedaArticulo.porcentaje_iva}
                              onChange={ changePorcentaje }
                            />
                          )}
                        />
                        {errors.options && (
                          <p className=" form-control ms-0 text-danger">
                            Este campo es obligatorio
                          </p>
                        )}
                      </div>
                      <div className="col-12 col-lg-3  mt-3">
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

                      <div className="col-12 col-lg-3  mt-3">
                        <label className="ms-2 text-terciary">
                          Valor unitario Total
                        </label>
                        <input
                          className="form-control border rounded-pill px-3  border border-terciary"
                          type="numb"
                          required={page === 2}
                          placeholder="Valor unitario Total"
                          {...register("ValUni")}
                          disabled={true}
                        />
                      </div>
                      <div className="col-12 col-lg-3  mt-4">
                        <button
                          type="button"
                          className="btn btn-primary text-capitalize mt-4"
                        >
                          Agregar
                        </button>
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
                  </div>
                ) : (
                  ""
                )}
              </div>
              
              <div className="row"> {/* ACTIVO */}
                {busquedaArticulo.cod_tipo_bien === "A" ? (
                  <div>
                    <div className="row ms-2 mt-5">
                      <Subtitle title={"Entrada de activo"} mb={4} />
                      <div className="col-6 col-sm-3">
                        <label className="ms-2 me-2 text-terciary ">
                          Unidad de medida:{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <Controller
                          name="optionsUnidadMedida"
                          control={control4}
                          rules={{ required: page === 2 }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={unitys}
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
                      <div className="col-6 col-sm-3 d-grid gap-2 d-md-flex justify-content-md-rigth mt-3">
                        <button
                          type="button"
                          className="btn btn-primary text-capitalize border rounded-pill px-3 mt-3 btn-min-width"
                          onClick={() => setCrearUnidadMedidaOpen(true)}
                        >
                          Crear unidad de medida
                        </button>
                      </div>
                      <div className="col-6 col-sm-3">
                        <label className="ms-2 me-2 text-terciary ">
                          Marca: <span className="text-danger">*</span>{" "}
                        </label>
                        <Controller
                          name="marcas"
                          control={control4}
                          rules={{ required: page === 2 }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={brand}
                              placeholder="Seleccionar"
                              {...register("marca")}
                              value={busquedaArticulo.marca}
                              onChange={changeSelectMarca}
                            />
                          )}
                        />
                        {errors.options && (
                          <p className=" form-control ms-0 text-danger">
                            Este campo es obligatorio
                          </p>
                        )}
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
                      <div className="col-6 col-sm-3">
                        <label className="ms-2 text-terciary">
                          Porcentaje IVA: <span className="text-danger">*</span>{" "}
                        </label>
                        <Controller
                          name="optionsActive"
                          control={control4}
                          rules={{ required: page === 2 }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={porcentage}
                              placeholder="Seleccionar"
                              {...register('porcentaje_iva')}
                              value={busquedaArticulo.porcentaje_iva}
                              onChange={ changePorcentaje }
                            />
                          )}
                        />
                        {errors.options && (
                          <p className=" form-control ms-0 text-danger">
                            Este campo es obligatorio
                          </p>
                        )}
                      </div>
                      <div className="col-6 col-sm-3 d-grid gap-2 d-md-flex justify-content-md-rigth mt-3">
                        <button
                          type="button"
                          className="btn btn-primary text-capitalize border rounded-pill px-3 mt-3 btn-min-width"
                          onClick={handleOpenModalIva}
                        >
                          Crear porcentaje de iva
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
                          Vida útil: <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control border rounded-pill px-3 border border-terciary"
                          type="text"
                          required={page === 2}
                          placeholder="Vida útil"
                          {...register("VidaU")}
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
                          Estado del artículo{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <Controller
                          name="EstadosArticulo2"
                          control={control4}
                          rules={{ required: page === 2 }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={state}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
                        {errors.EstadosArticulo2 && (
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
                          Garantía: <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                          type="text"
                          required={page === 2}
                          placeholder="Garantía"
                          {...register("Garantia")}
                        />
                      </div>
                      <div className="col-6 col-sm-3">
                        <label className="ms-2 text-terciary">
                          Días de uso: <span className="text-danger">*</span>{" "}
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
                          Observaciones:
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
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="row">
              {" "}
              {/* BOTONES DE GUARDAR */}
              <div className="row">
                <div className="col-12 col-lg-12  mt-4  d-flex justify-content-end">
                  <button
                    className={`btn btn-outline-ligthtext-capitalize  px-3 ${
                      page === 1 && "d-none"
                    }`}
                    type="button"
                    title="Regresar a la pagina anterior"
                    onClick={handlePreviousPage}
                  >
                    <i
                      className="fa-solid fa-angles-left fs-3"
                      title="atras"
                    ></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-ligth text-capitalize  px-3"
                    title="Limpiar"
                  >
                    <i className="fa-solid fa-eraser fs-3" title=""></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-ligth text-capitalize  px-3"
                  >
                    <i
                      className="fa-solid fa-magnifying-glass fs-3"
                      title="Consultar"
                    ></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary text-capitalize border rounded-pill px-3 btn-min-width"
                  >
                    Anular
                  </button>

                  <button
                    type="button"
                    className="btn  text-capitalize btn-outline-ligth px-3"
                    title="Salir"
                  >
                    <i className="fa-solid fa-x fs-3" title=""></i>
                  </button>
                  <button
                    className="btn  text-capitalize btn-outline-ligth px-3"
                    type="submit"
                    form="configForm"
                  >
                    {page === 1 ? (
                      <i
                        className="fa-solid fa-angles-right fs-3"
                        title="Siguiente"
                      ></i>
                    ) : (
                      <i
                        className="fa-regular fa-floppy-disk fs-3"
                        title="Guardar"
                      ></i>
                    )}{" "}
                  </button>
                </div>
              </div>
            </div>
          <ModalLocal localState={modal}>
            
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
          </ModalLocal>
          <BusquedaAvanzadaModal
            isModalActive={modalPersonal}
            setIsModalActive={setModalPersonal}
            setModel={setBusquedaModel}
          />
          <BusquedaArticuloModal
            articuloModel={busquedaArticulo}
            setModel={setBusquedaArticulo}
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
        setIsModalActive={setCrearPorcentajeOpen}
      ></CrearPorcentajeIvaModal>
    </div>
  );
};

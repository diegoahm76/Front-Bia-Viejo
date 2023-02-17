import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Subtitle from "../../../components/Subtitle";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { IBienes } from "../../../Interfaces/Bienes";
import { IGeneric } from "../../../Interfaces/Generic";
import clienteAxios from "../../../config/clienteAxios";
import {
  crearBien,
  editarBien,
  obtenerTodosBienes,
} from "../../../store/slices/catalogoBienes/indexCatalogoBien";

const editState: any = {
  id_bien: 0,
  codigo_bien: "",
  nro_elemento_bien: 0,
  nombre: "",
  cod_tipo_bien: { value: "", label: "" },
  cod_tipo_activo: { value: "", label: "" },
  nivel_jerarquico: 0,
  nombre_cientifico: "",
  descripcion: "",
  doc_identificador_nro: "",
  cod_metodo_valoracion: { value: "", label: "" },
  cod_tipo_depreciacion: { value: "", label: "" },
  cantidad_vida_util: 0,
  valor_residual: 0,
  stock_minimo: 0,
  stock_maximo: 0,
  solicitable_vivero: false,
  tiene_hoja_vida: false,
  maneja_hoja_vida: false,
  visible_solicitudes: false,
  id_marca: { value: "", label: "" },
  id_unidad_medida: { value: "", label: "" },
  id_porcentaje_iva: { value: "", label: "" },
  id_unidad_medida_vida_util: { value: "", label: "" },
  id_bien_padre: 0,
};

export const CreacionArticulosFijosScreen = () => {
  const initialOptions: IGeneric[] = [
    {
      label: "",
      value: "",
    },
  ];

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const data = watch();
  console.log(data, "data");
  const navigate = useNavigate();
  //state
  const bienSeleccionado: IBienes = useAppSelector(
    (state) => state.bien.bienSeleccionado
  );

  console.log(bienSeleccionado, "bienSeleccionado");
  const dataEdit = useAppSelector((state) => state.bien.dataEdit);

  //choice
  const [tipoBienOptions, setTipoBienOptions] = useState(initialOptions);
  const [tipoActivoOptions, setTipoActivoOptions] = useState(initialOptions);
  const [unidadMedidaOptions, setUnidadMedidaOptions] =
    useState(initialOptions);
  const [metodoValoracionOptions, setmetodoValoracionOptionss] =
    useState(initialOptions);
  const [porcentajeOptions, setPorcentajeOptions] = useState(initialOptions);
  const [depresiacionOptions, setDepresiacionOptions] =
    useState(initialOptions);
  const [marcaOptions, setMarcaOptions] = useState(initialOptions);
  //checkbox
  const [checkboxSoli, setCheckboxSoli] = useState(false);
  const [checkboxHoja, setCheckboxHoja] = useState(false);
  const [checkboxVivero, setcheckboxVivero] = useState(false);
  const [flag, setFlag] = useState(false);
  const [maxLength, setMaxLength] = useState(1);

  //estados definicion inicial
  const [isEdit, setIsdit] = useState(dataEdit.edit);

  const [bienEdit, setBienEdit] = useState(editState);
  //estado edit --bienSeleccionado

  const { loading } = useAppSelector((state) => state.loading);
  const dispatch = useAppDispatch();
  // False = crear
  // true = editar

  useEffect(() => {
    getTipoBien();
    getTipoActivo();
    getUnidadMedida();
    getPorcentaje();
    getDepresiacion();
    getMarca();
    getMetodoValoracion();
  }, []); //las funciones depende d euna de estas variables, si estan solos se va ejecutar solo una vez

  useEffect(() => {
    cargarDatosIniciales();
  }, [
    porcentajeOptions, tipoBienOptions, unidadMedidaOptions, metodoValoracionOptions,
    depresiacionOptions, marcaOptions
  ]);

  const cargarDatosIniciales = () => {
    let catalogoBien;
    // if (isEdit) {

    const bienEdit = tipoBienOptions.filter((perce) => {
      return perce.value.toString() === bienSeleccionado.cod_tipo_bien?.toString();
    });
    const activoEdit = tipoActivoOptions.filter((perce) => {
      return perce.value.toString() === bienSeleccionado.cod_tipo_activo?.toString();
    });
    const porcentajeEdit = porcentajeOptions.filter((perce) => {
      return perce.value.toString() === bienSeleccionado.id_porcentaje_iva?.toString();
    });
    const marcaEdit = marcaOptions.filter((marca) => {
      return marca.value.toString() === bienSeleccionado.id_marca?.toString();
    });
    const valoraEdit = metodoValoracionOptions.filter((val) => {
      return val.value.toString() === bienSeleccionado.cod_metodo_valoracion?.toString();
    });

    const unidadVidaEdit = unidadMedidaOptions.filter((unidad) => {
      return unidad.value.toString() === bienSeleccionado.id_unidad_medida_vida_util?.toString();
    });
    const depresiacionEdit = depresiacionOptions.filter((unidad) => {
      return unidad.value.toString() === bienSeleccionado.cod_tipo_depreciacion?.toString();
    });



    catalogoBien = {
      ...bienSeleccionado,
      cod_tipo_bien: { value: bienEdit[0]?.value, label: bienEdit[0]?.label },
      cod_tipo_activo: { value: activoEdit[0]?.value, label: activoEdit[0]?.label },

      cod_metodo_valoracion: {
        value: valoraEdit[0]?.value,
        label: valoraEdit[0]?.label,
      },
      cod_tipo_depreciacion: {
        value: depresiacionEdit[0]?.value,
        label: depresiacionEdit[0]?.label,
      },
      id_marca: { value: marcaEdit[0]?.value, label: marcaEdit[0]?.label },
      id_unidad_medida: {
        value: unidadVidaEdit[0]?.value,
        label: unidadVidaEdit[0]?.label,
      },
      id_porcentaje_iva: {
        value: porcentajeEdit[0]?.value,
        label: porcentajeEdit[0]?.label,
      },
      id_unidad_medida_vida_util: {
        value: unidadVidaEdit[0]?.value,
        label: unidadVidaEdit[0]?.label,
      },
    };
    // } else {
    // catalogoBien = {
    //   ...bienEdit,
    //   id_bien: bienSeleccionado.id_bien,
    //   id_bien_padre: bienSeleccionado.id_bien_padre,
    //   nivel_jerarquico: bienSeleccionado.nivel_jerarquico,
    // };

    // }
    setBienEdit(catalogoBien);
  };

  const getTipoBien = async () => {
    const { data } = await clienteAxios.get("almacen/choices/tipo-bien");
    const tipoBienMaped = data.map((bien) => ({
      label: bien[1],
      value: bien[0],
    }));
    setTipoBienOptions(tipoBienMaped);
  };

  const getTipoActivo = async () => {
    const { data } = await clienteAxios.get("almacen/choices/tipo-activo");
    const tipoActivoMaped = data.map((activo) => ({
      label: activo[1],
      value: activo[0],
    }));
    setTipoActivoOptions(tipoActivoMaped);
  };

  const getUnidadMedida = async () => {
    const { data } = await clienteAxios.get("almacen/unidades-medida/get-list");
    const unidadMedidaMaped = data.map((bien) => ({
      label: bien.nombre,
      value: bien.id_unidad_medida,
    }));
    setUnidadMedidaOptions(unidadMedidaMaped);
  };

  const getPorcentaje = async () => {
    const { data } = await clienteAxios.get("almacen/porcentajes/get-list");
    const porcentajeMaped = data.map((porcentaje) => ({
      label: porcentaje.porcentaje,
      value: porcentaje.id_porcentaje_iva,
    }));
    setPorcentajeOptions(porcentajeMaped);
  };

  const getDepresiacion = async () => {
    const { data } = await clienteAxios.get(
      "almacen/choices/tipo-depreciacion-activo"
    );
    const depresiacionMaped = data.map((depresiacion) => ({
      label: depresiacion[1],
      value: depresiacion[0],
    }));
    setDepresiacionOptions(depresiacionMaped);
  };

  const getMarca = async () => {
    const { data } = await clienteAxios.get("almacen/marcas/get-list");
    const marcaMaped = data.map((marca) => ({
      label: marca.nombre,
      value: marca.id_marca,
    }));
    setMarcaOptions(marcaMaped);
  };

  const getMetodoValoracion = async () => {
    const { data } = await clienteAxios.get(
      "almacen/choices/metodo-valoracion-articulo/"
    );
    const metodoMaped = data.map((metodo) => ({
      label: metodo[1],
      value: metodo[0],
    }));
    setmetodoValoracionOptionss(metodoMaped);
  };

  const crearModeloData = () => {
    const bienModel: IBienes = {
      id_bien: bienEdit.id_bien !== 0 ? bienEdit.id_bien : null,
      cantidad_vida_util: bienEdit.cantidad_vida_util,
      cod_metodo_valoracion: bienEdit.cod_metodo_valoracion.value,
      cod_tipo_activo: bienEdit.cod_tipo_activo.value,
      cod_tipo_bien: bienEdit.cod_tipo_bien.value,
      cod_tipo_depreciacion: bienEdit.cod_tipo_depreciacion.value,
      codigo_bien: bienEdit.codigo_bien, //quemado
      descripcion: bienEdit.descripcion,
      doc_identificador_nro: bienEdit.doc_identificador_nro,
      maneja_hoja_vida: checkboxHoja,
      nivel_jerarquico:
        bienEdit.nivel_jerarquico !== 0 ? bienEdit.nivel_jerarquico : 1,
      nombre: bienEdit.nombre,
      nombre_cientifico: bienEdit.nombre_cientifico,
      nro_elemento_bien: bienEdit.nro_elemento_bien,
      solicitable_vivero: checkboxHoja,
      stock_maximo: bienEdit.stock_maximo,
      stock_minimo: bienEdit.stock_minimo,
      tiene_hoja_vida: checkboxHoja,
      valor_residual: bienEdit.valor_residual,
      visible_solicitudes: checkboxSoli,
      id_bien_padre:
        bienEdit.id_bien_padre !== 0 ? bienEdit.id_bien_padre : null,
      id_marca: bienEdit.id_marca.value,
      id_porcentaje_iva: bienEdit.id_porcentaje_iva.value,
      id_unidad_medida: bienEdit.id_unidad_medida.value,
      id_unidad_medida_vida_util: bienEdit.id_unidad_medida_vida_util.value,
    };
    return bienModel;
  };

  //   const dataForm: IBienes = {
  //     id_bien: bienSeleccionado.id_bien,
  //     codigo_bien: bienSeleccionado.codigo_bien,
  //     nro_elemento_bien: bienSeleccionado.nro_elemento_bien,
  //     nombre: bienSeleccionado.nombre,
  //     cod_tipo_bien: bienSeleccionado.cod_tipo_bien,
  //     cod_tipo_activo: bienSeleccionado!.cod_tipo_activo,
  //     nivel_jerarquico: bienSeleccionado.nivel_jerarquico,
  //     nombre_cientifico: bienSeleccionado.nombre_cientifico,
  //     descripcion: bienSeleccionado.descripcion,
  //     doc_identificador_nro: bienSeleccionado.doc_identificador_nro,
  //     cod_metodo_valoracion: bienSeleccionado.cod_metodo_valoracion,
  //     cod_tipo_depreciacion: bienSeleccionado.cod_tipo_depreciacion,
  //     cantidad_vida_util: bienSeleccionado.cantidad_vida_util,
  //     valor_residual: bienSeleccionado.valor_residual,
  //     stock_minimo: bienSeleccionado.stock_minimo,
  //     stock_maximo: bienSeleccionado.stock_maximo,
  //     solicitable_vivero: bienSeleccionado.solicitable_vivero,
  //     tiene_hoja_vida: bienSeleccionado.tiene_hoja_vida,
  //     maneja_hoja_vida: bienSeleccionado.maneja_hoja_vida,
  //     visible_solicitudes: bienSeleccionado.visible_solicitudes,
  //     id_marca: bienSeleccionado.id_marca,
  //     id_unidad_medida: bienSeleccionado.id_unidad_medida,
  //     id_porcentaje_iva: bienSeleccionado.id_porcentaje_iva,
  //     id_unidad_medida_vida_util: bienSeleccionado.id_unidad_medida_vida_util,
  //     id_bien_padre: bienSeleccionado.id_bien_padre,
  //   };
  //   //setValue("t006mensajeUp", alarmaSeleccionada.t006mensajeUp);
  //   //setBienEdit(dataForm);
  // };

  const onSubmit = () => {
    if (isEdit) {
      editarBien(dispatch, crearModeloData());
      obtenerTodosBienes(dispatch);
      navigate("/dashboard/almacen/entrada-y-salida-de-articulos/catalogo-bienes");
    } else {
      crearBien(dispatch, crearModeloData());
      obtenerTodosBienes(dispatch);
      navigate("/dashboard/almacen/entrada-y-salida-de-articulos/catalogo-bienes");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBienEdit({ ...bienEdit, [name]: value });
  };

  const changeSelectTipoActivo = (e) => {
    let catalogoBien = { ...bienEdit };
    catalogoBien.cod_tipo_activo = {
      value: e.value,
      label: e.label,
    };
    setBienEdit(catalogoBien);
  };

  const changeSelectTipoBien = (e) => {
    let catalogoBien = { ...bienEdit };
    catalogoBien.cod_tipo_bien = {
      value: e.value,
      label: e.label,
    };
    setBienEdit(catalogoBien);
  };

  const changeSelectTipoUnidadMedida = (e) => {
    let catalogoBien = { ...bienEdit };
    catalogoBien.id_unidad_medida = {
      value: e.value,
      label: e.label,
    };
    setBienEdit(catalogoBien);
  };

  const changeSelectTipoMarca = (e) => {
    let catalogoBien = { ...bienEdit };
    catalogoBien.id_marca = {
      value: e.value,
      label: e.label,
    };
    setBienEdit(catalogoBien);
  };

  const changeSelectTipoPorcentaje = (e) => {
    let catalogoBien = { ...bienEdit };
    catalogoBien.id_porcentaje_iva = {
      value: e.value,
      label: e.label,
    };
    setBienEdit(catalogoBien);
  };

  const changeSelectTipoDepreciacion = (e) => {
    let catalogoBien = { ...bienEdit };
    catalogoBien.cod_tipo_depreciacion = {
      value: e.value,
      label: e.label,
    };
    setBienEdit(catalogoBien);
  };

  const changeSelectTipoMetodoValoracion = (e) => {
    let catalogoBien = { ...bienEdit };
    catalogoBien.cod_metodo_valoracion = {
      value: e.value,
      label: e.label,
    };
    setBienEdit(catalogoBien);
  };

  const changeSelectTipoVidaUtil = (e) => {
    let catalogoBien = { ...bienEdit };
    catalogoBien.id_unidad_medida_vida_util = {
      value: e.value,
      label: e.label,
    };
    setBienEdit(catalogoBien);
  };

  const volver = () => {
    navigate("/dashboard/Recaudo/gestor-notificacion/catalogo-bienes-Screen");
  };

  useEffect(() => {
    console.log(bienEdit.codigo_bien.split(''), ".split()");
    console.log(bienEdit.codigo_bien.split('')[0], "[0]");
    console.log(bienEdit.codigo_bien.split('').length, "bienEdit.codigo_bien.split()[0]");
    if (bienEdit.codigo_bien.split('').length === 0) {
      return console.log('entro hijo 1'), setMaxLength(1);
    }
    if (bienEdit.codigo_bien.split('')[0] !== '' && bienEdit.codigo_bien.split('').length === 1) {
      return console.log('entro hijo 2'), setMaxLength(2);
    }
    if (bienEdit.codigo_bien.split('').length === 2) {
      return console.log('entro hijo 4'), setMaxLength(4);
    }
    if (bienEdit.codigo_bien.split('').length === 4) {
      return console.log('entro hijo 7'), setMaxLength(7);
    }
    if (bienEdit.codigo_bien.split('').length === 7) {
      return console.log('entro hijo 12'), setMaxLength(12);
    }
  }, [flag]);
  console.log(bienEdit, "este es el bienEdir")


  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
          <h3 className="text-rigth  fw-light mt-4 mb-2">
            <b>Creación de artículo</b>
          </h3>

          <Subtitle title={"Informacíon del articulo"} />

          <div className="row">
            <div className="col-12 col-lg-3  mt-2">
              <label className="form-floating input-group input-group-dynamic ms-2">
                Tipo de bien<span className="text-danger">*</span>
              </label>
              <Controller
                name="tipoBien"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={tipoBienOptions}
                    placeholder="Seleccionar"
                    value={bienEdit.cod_tipo_bien}
                    onChange={changeSelectTipoBien}
                  />
                )}
              />
              {errors.tipoBien && (
                <small className="text-danger">Este campo es obligatorio</small>
              )}
            </div>
            <div className="col-12 col-md-3 mt-2"></div>
          </div>

          {bienEdit.cod_tipo_bien.value == "A" ? (
            <div>
              <form
                className="row"
                onSubmit={handleSubmit(onSubmit)}
                id="configForm"
              >
                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">
                      Código<span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control border border-terciary border rounded-pill px-3"
                      type="text"
                      onMouseOver={() => setFlag(true)}
                      maxLength={maxLength}
                      placeholder="Código"
                      disabled={dataEdit.edit!}
                      value={bienEdit.codigo_bien}
                      {...register("codigo_bien")}
                      onChange={handleChange}
                    />
                    {errors.codigo && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Nombre<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        placeholder="Nombre"
                        {...register("nombre")}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.nombre && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Tipo de activo
                    </label>
                    <Controller
                      name="cod_tipo_activo"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={tipoActivoOptions}
                          placeholder="Seleccionar"
                          value={bienEdit.cod_tipo_activo}
                          onChange={changeSelectTipoActivo}
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">
                      Carpeta padre<span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control border border-terciary border rounded-pill px-3"
                      type="text"
                      placeholder="Carpeta Padre"
                      value={bienEdit.nombre}
                      disabled={true}
                    />
                    {errors.padre && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Unidad de medida<span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="unidadmedida"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={unidadMedidaOptions}
                          placeholder="Seleccionar"
                          value={bienEdit.id_unidad_medida}
                          onChange={changeSelectTipoUnidadMedida}
                        />
                      )}
                    />
                    {errors.unidadmedida && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Porcentaje IVA<span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="porcentaje"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={porcentajeOptions}
                          placeholder="Seleccionar"
                          value={bienEdit.id_porcentaje_iva}
                          onChange={changeSelectTipoPorcentaje}
                        />
                      )}
                    />
                    {errors.porcentaje && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Tipo de depreciación
                    </label>
                    <Controller
                      name="depresiacion"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={depresiacionOptions}
                          placeholder="Seleccionar"
                          value={bienEdit.cod_tipo_depreciacion}
                          onChange={changeSelectTipoDepreciacion}
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Unidad de vida útil
                    </label>
                    <Controller
                      name="unidadvida"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={unidadMedidaOptions}
                          placeholder="Seleccionar"
                          value={bienEdit.id_unidad_medida_vida_util}
                          onChange={changeSelectTipoVidaUtil}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Cantidad de vida útil
                      </label>
                      <input
                        name="cantidad_vida_util"
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        value={bienEdit.cantidad_vida_util}
                        placeholder="Cantidad de vida util"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Valor residual
                      </label>
                      <input
                        name="valor_residual"
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        value={bienEdit.valor_residual}
                        placeholder="Valor residual"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Marca
                    </label>
                    <Select
                      name="marca"
                      options={marcaOptions}
                      placeholder="Seleccionar"
                      value={bienEdit.id_marca}
                      onChange={changeSelectTipoMarca}
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3 d-flex">
                    <div className="col-12 col-lg-6">
                      <label className="form-floating input-group input-group-dynamic ms-2">
                        Solicitudes
                      </label>
                      <button
                        className="btn btn-sm btn-tablas "
                        type="button"
                        title="Solicitudes"
                        onClick={() => setCheckboxSoli(!checkboxSoli)}
                      >
                        {checkboxSoli == false ? (
                          <i
                            className="fa-solid fa-toggle-off fs-3"
                            style={{ color: "black" }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-toggle-on fs-3"
                            style={{ color: "#8cd81e" }}
                          ></i>
                        )}
                      </button>
                    </div>
                    <div className="col-12 col-lg-6">
                      <label className="form-floating input-group input-group-dynamic ms-2">
                        Hoja de vida
                      </label>
                      <button
                        className="btn btn-sm btn-tablas "
                        type="button"
                        title="Solicitudes"
                        onClick={() => setCheckboxHoja(!checkboxHoja)}
                      >
                        {checkboxHoja == false ? (
                          <i
                            className="fa-solid fa-toggle-off fs-3"
                            style={{ color: "black" }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-toggle-on fs-3"
                            style={{ color: "#8cd81e" }}
                          ></i>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-12 mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Descripción
                    </label>
                    <textarea
                      className="form-control border rounded-pill px-4 border border-terciary"
                      placeholder="Descripción"
                      value={bienEdit.descripcion}
                      rows={3}
                      name="descripcion"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row ">
                  <div className="d-flex justify-content-end mt-3">
                    <button
                      type="button"
                      className="btn   text-capitalize"
                      onClick={() => volver()}
                    >
                      <i className="fa-solid fa-x fs-3"></i>
                    </button>
                    <button type="submit" className="btn   text-capitalize">
                      <i className="fa-regular fa-floppy-disk fs-3"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
          {bienEdit.cod_tipo_bien.value == "C" ? (
            <div>
              <form
                className="row"
                onSubmit={handleSubmit(onSubmit)}
                id="configForm"
              >
                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">
                      Código<span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control border border-terciary border rounded-pill px-3"
                      type="text"
                      placeholder="Código"
                      value={bienEdit.codigo_bien}
                      {...register("codigo")}
                      disabled
                      // onChange={handleChange}
                    />
                    {errors.codigo && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Nombre<span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        placeholder="Nombre"
                        {...register("nombre")}
                        value={bienEdit.nombre}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.nombre && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Metodo de valoración
                    </label>
                    <Controller
                      name="tipoactivo"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={metodoValoracionOptions}
                          placeholder="Seleccionar"
                          value={bienEdit.cod_metodo_valoracion}
                          onChange={changeSelectTipoMetodoValoracion}
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">
                      Carpeta padre<span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control border border-terciary border rounded-pill px-3"
                      type="text"
                      placeholder="Carpeta Padre"
                      {...register("padre")}
                      value={bienEdit.nombre}
                      required
                      disabled
                    />
                    {errors.padre && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Unidad de medida<span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="unidadmedida"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={unidadMedidaOptions}
                          placeholder="Seleccionar"
                          value={bienEdit.id_unidad_medida}
                          onChange={changeSelectTipoUnidadMedida}
                        />
                      )}
                    />
                    {errors.unidadmedida && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Stock minimo
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        name="stock_minimo"
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        placeholder="Stock minimo"
                        value={bienEdit.stock_minimo}
                        onChange={handleChange}
                      />
                      {errors.stockminimo && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Stock maximo
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        name="stock_maximo"
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        placeholder="Stock maximo"
                        value={bienEdit.stock_maximo}
                        onChange={handleChange}
                      />
                      {errors.stockmaximo && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Porcentaje IVA<span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="porcentaje"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={porcentajeOptions}
                          placeholder="Seleccionar"
                          value={bienEdit.id_porcentaje_iva}
                          onChange={changeSelectTipoPorcentaje}
                        />
                      )}
                    />
                    {errors.porcentaje && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3  mt-3 d-flex">
                    <div className="col-12 col-lg-6">
                      <label className="form-floating input-group input-group-dynamic ms-2">
                        Solicitudes
                      </label>
                      <button
                        className="btn btn-sm btn-tablas "
                        type="button"
                        title="Solicitudes"
                        onClick={() => setCheckboxSoli(!checkboxSoli)}
                      >
                        {checkboxSoli === false ? (
                          <i
                            className="fa-solid fa-toggle-off fs-3"
                            style={{ color: "black" }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-toggle-on fs-3"
                            style={{ color: "#8cd81e" }}
                          ></i>
                        )}
                      </button>
                    </div>
                    <div className="col-12 col-lg-6">
                      <label className="form-floating input-group input-group-dynamic ms-2">
                        Vivero
                      </label>
                      <button
                        className="btn btn-sm btn-tablas"
                        type="button"
                        title="Vivero"
                        onClick={() => setcheckboxVivero(!checkboxVivero)}
                      >
                        {checkboxVivero == false ? (
                          <i
                            className="fa-solid fa-toggle-off fs-3"
                            style={{ color: "black" }}
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-toggle-on fs-3"
                            style={{ color: "#8cd81e" }}
                          ></i>
                        )}
                      </button>
                    </div>
                  </div>
                  {checkboxHoja == true ? (
                    <div className="col-12 col-lg-3  mt-3">
                      <div>
                        <label className="ms-2 text-terciary">
                          Nombre cientifico
                        </label>
                        <input
                          name="nombre_cientifico"
                          className="form-control border border-terciary border rounded-pill px-3"
                          type="text"
                          placeholder="Nombre cientifico"
                          value={bienEdit.nombre_cientifico}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="row">
                  <div className="col-12 col-lg-12 mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Descripción
                    </label>
                    <textarea
                      className="form-control border rounded-pill px-4 border border-terciary"
                      placeholder="Descripción"
                      value={bienEdit.descripcion}
                      rows={3}
                      name="descripcion"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row ">
                  <div className="d-flex justify-content-end mt-3">
                    <button
                      type="submit"
                      className="btn   text-capitalize"
                      onClick={() => volver()}
                    >
                      <i className="fa-solid fa-x fs-3"></i>
                    </button>
                    <button type="submit" className="btn   text-capitalize">
                      <i className="fa-regular fa-floppy-disk fs-3"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default CreacionArticulosFijosScreen;

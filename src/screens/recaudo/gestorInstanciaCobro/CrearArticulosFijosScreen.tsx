import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Subtitle from "../../../components/Subtitle";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { IBienes } from "../../../Interfaces/Bienes";
import { editarBien } from "../../../store/slices/bienes/indexBien";
import { IGeneric } from "../../../Interfaces/Generic";
import clienteAxios from "../../../config/clienteAxios";

const editState = {
  id_bien: 0,
  codigo_bien: "",
  nro_elemento_bien: 0,
  nombre: "",
  cod_tipo_bien: "",
  cod_tipo_activo: "",
  nivel_jerarquico: 0,
  nombre_cientifico: "",
  descripcion: "",
  doc_identificador_nro: "",
  cod_metodo_valoracion: 0,
  cod_tipo_depreciacion: 0,
  cantidad_vida_util: 0,
  valor_residual: 0,
  stock_minimo: 0,
  stock_maximo: 0,
  solicitable_vivero: false,
  tiene_hoja_vida: false,
  maneja_hoja_vida: false,
  visible_solicitudes: false,
  id_marca: 0,
  id_unidad_medida: 0,
  id_porcentaje_iva: 0,
  id_unidad_medida_vida_util: 0,
  id_bien_padre: 0,
};

export const CreacionArticulosFijosScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    //isEdit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  
  //choice
  const [tipoBienOptions, setTipoBienOptions] = useState<IGeneric[]>([]);
  const [tipoActivoOptions, setTipoActivoOptions] = useState<IGeneric[]>([]);
  const [unidadMedidaOptions, setUnidadMedidaOptions] = useState<IGeneric[]>(
    []
  );
  const [metodoValoracionOptions, setUniOptions] = useState<IGeneric[]>(
    []
  );
  const [porcentajeOptions, setPorcentajeOptions] = useState<IGeneric[]>([]);
  const [depresiacionOptions, setDepresiacionOptions] = useState<IGeneric[]>(
    []
  );
  const [marcaOptions, setMarcaOptions] = useState<IGeneric[]>([]);
  //checkbox
  const [checkboxSoli, setCheckboxSoli] = useState(true);
  const [checkboxHoja, setCheckboxHoja] = useState(true);

  //estados
  const [isEdit, setIsdit] = useState(true);
  const [tipoBien, setTipoBien] = useState<IGeneric>({ label: "", value: "" });
  const [bienEdit, setBienEdit] = useState(editState);
  const { loading } = useAppSelector((state) => state.loading);
  const bienSeleccionado = useAppSelector(
    (state) => state.bien.bienSeleccionado
  );
  const dispatch = useAppDispatch();
  // False = crear
  // true = editar

  useEffect(() => {
    setDataEdit();
    getTipoBien();
    getTipoActivo();
    getUnidadMedida();
    getPorcentaje();
    getDepresiacion();
    getMarca();
  }, [bienSeleccionado]);

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
      label: depresiacion.porcentaje,
      value: depresiacion.id_porcentaje_iva,
    }));
    setDepresiacionOptions(depresiacionMaped);
  };

  const getMarca = async () => {
    const { data } = await clienteAxios.get("almacen/marcas/get-list");
    const marcaMaped = data.map((marca) => ({
      label: marca.id_marca,
      value: marca.nombre,
    }));
    setMarcaOptions(marcaMaped);
  };

  const setDataEdit = () => {
    const dataForm: IBienes = {
      id_bien: bienSeleccionado.id_bien,
      codigo_bien: bienSeleccionado.codigo_bien,
      nro_elemento_bien: bienSeleccionado.nro_elemento_bien,
      nombre: bienSeleccionado.nombre,
      cod_tipo_bien: bienSeleccionado.cod_tipo_bien,
      cod_tipo_activo: bienSeleccionado!.cod_tipo_activo,
      nivel_jerarquico: bienSeleccionado.nivel_jerarquico,
      nombre_cientifico: bienSeleccionado.nombre_cientifico,
      descripcion: bienSeleccionado.descripcion,
      doc_identificador_nro: bienSeleccionado.doc_identificador_nro,
      cod_metodo_valoracion: bienSeleccionado.cod_metodo_valoracion,
      cod_tipo_depreciacion: bienSeleccionado.cod_tipo_depreciacion,
      cantidad_vida_util: bienSeleccionado.cantidad_vida_util,
      valor_residual: bienSeleccionado.valor_residual,
      stock_minimo: bienSeleccionado.stock_minimo,
      stock_maximo: bienSeleccionado.stock_maximo,
      solicitable_vivero: bienSeleccionado.solicitable_vivero,
      tiene_hoja_vida: bienSeleccionado.tiene_hoja_vida,
      maneja_hoja_vida: bienSeleccionado.maneja_hoja_vida,
      visible_solicitudes: bienSeleccionado.visible_solicitudes,
      id_marca: bienSeleccionado.id_marca,
      id_unidad_medida: bienSeleccionado.id_unidad_medida,
      id_porcentaje_iva: bienSeleccionado.id_porcentaje_iva,
      id_unidad_medida_vida_util: bienSeleccionado.id_unidad_medida_vida_util,
      id_bien_padre: bienSeleccionado.id_bien_padre,
    };
    //setValue("t006mensajeUp", alarmaSeleccionada.t006mensajeUp);
    //setBienEdit(dataForm);
  };
  const onSubmitTipoBien = (data) => {
    setTipoBien({ label: data.tipoBien.label, value: data.tipoBien.value });
  };

  const onSubmit = () => {
    if (isEdit) {
      editarBien(dispatch, isEdit);
    } else {
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBienEdit({ ...bienEdit, [name]: value });
  };

  const navigate = useNavigate();
  const volver = () => {
    navigate("/dashboard/Recaudo/gestor-notificacion/catalogo-bienes-Screen");
  };
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
          <form
            className="row"
            onSubmit={handleSubmit(onSubmitTipoBien)}
            id="configForm"
          >
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
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={tipoBienOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.tipoBien && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-md-3 mt-2">
                <button type="submit" className="btn text-capitalize mt-4">
                  <i className="fa-solid fa-circle-check fs-3"></i>
                </button>
              </div>
            </div>
          </form>

          {tipoBien.value == "A" ? (

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
                      {...register("codigo", {
                        required: true,
                      })}
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
                        {...register("nombre", {
                          required: true,
                        })}
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
                      name="tipoactivo"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={tipoActivoOptions}
                          placeholder="Seleccionar"
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
                      {...register("padre", {
                        required: true,
                      })}
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
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={unidadMedidaOptions}
                          placeholder="Seleccionar"
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
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={porcentajeOptions}
                          placeholder="Seleccionar"
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
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={depresiacionOptions}
                          placeholder="Seleccionar"
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
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={unidadMedidaOptions}
                          placeholder="Seleccionar"
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
                        name="cantidadvida"
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        placeholder="Cantidad de vida util"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Valor residual
                      </label>
                      <input
                        name="valorresidual"
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        placeholder="Valor residual"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Marca
                    </label>
                    <Controller
                      name="marca"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={marcaOptions}
                          placeholder="Seleccionar"
                        />
                      )}
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
                        {checkboxSoli == true ? (
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
                        {checkboxHoja == true ? (
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
                      value=""
                      rows={3}
                      name="Acciones"
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
          {tipoBien.value == "C" ? (
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
                      {...register("codigo", {
                        required: true,
                      })}
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
                        {...register("nombre", {
                          required: true,
                        })}
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
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={[
                            { label: "Computo ", value: "com" },
                            { label: "Vehiculo", value: "vei" },
                            { label: "Otros Activos", value: "oac" },
                          ]}
                          placeholder="Seleccionar"
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
                      {...register("padre", {
                        required: true,
                      })}
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
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={unidadMedidaOptions}
                          placeholder="Seleccionar"
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
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        placeholder="Cantidad de vida util"
                        {...register("stockminimo", {
                          required: true,
                        })}
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
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        placeholder="Cantidad de vida util"
                        {...register("stockmaximo", {
                          required: true,
                        })}
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
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={porcentajeOptions}
                          placeholder="Seleccionar"
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
                        {checkboxSoli == true ? (
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
                        vivero
                      </label>
                      <button
                        className="btn btn-sm btn-tablas"
                        type="button"
                        title="Solicitudes"
                        onClick={() => setCheckboxHoja(!checkboxHoja)}
                      >
                        {checkboxHoja == true ? (
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
                  {checkboxHoja == false ? (
                    <div className="col-12 col-lg-3  mt-3">
                      <div>
                        <label className="ms-2 text-terciary">
                          Nombre cientifico
                        </label>
                        <input
                          name="nombrecien"
                          className="form-control border border-terciary border rounded-pill px-3"
                          type="text"
                          placeholder="Cantidad de vida util"
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
                      value=""
                      rows={3}
                      name="Acciones"
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

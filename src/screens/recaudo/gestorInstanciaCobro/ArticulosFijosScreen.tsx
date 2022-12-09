import  React,{useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Subtitle from "../../../components/Subtitle";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { IBienes } from "../../../Interfaces/Bienes";
import { editarBien } from "../../../store/slices/bienes/indexBien";


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
}

export const CreacionArticulosFijosScreen = (
  isEdit,
  handleSubmit,
  register,
  control,
  reset,
  setValue,
  watch,
) => {
  //checkbox
  const [checkboxSoli, setCheckboxSoli] = useState(true);
  const [checkboxHoja, setCheckboxHoja] = useState(true);

  //estados
  const [bienEdit, setBienEdit] = useState(editState);
  const { loading } = useAppSelector((state) => state.loading);
  const bienSeleccionado = useAppSelector((state) => state.bien.bienSeleccionado);
  const dispatch = useAppDispatch();
  // False = crear
  // true = editar


  useEffect(() => {
    setDataEdit()
  }, [bienSeleccionado]);


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
    }
    //setValue("t006mensajeUp", alarmaSeleccionada.t006mensajeUp);
    setBienEdit(dataForm);
  }

  const onSubmit = () => {
    if (isEdit) {
      editarBien(dispatch, isEdit);
    } else {

    }
  
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setBienEdit({ ...bienEdit, [name]: value });
  }
  

  const {
    formState: { errors },
  } = useForm();
  


  const navigate = useNavigate();
  const volver = () => {
    navigate(
      "/dashboard/Recaudo/gestor-notificacion/catalogo-bienes-Screen"
    );
  };
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
          <form
            className="row"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="text-rigth  fw-light mt-4 mb-2">
              <b>Creación de artículo</b>
            </h3>

            <Subtitle title={"Informacíon del articulo"} />

            <div className="row">
              <div className="col-12 col-lg-3  mt-2">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de bien
                </label>
                <Controller
                  name="TipoBien"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "Activo", value: "a" },
                        { label: "Consumo", value: "c" },
                      ]}
                      placeholder="Seleccionar"
                      defaultValue={{label: "Activo", value: "a"}}
                      isDisabled
                    />
                  )}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <label className="ms-2 text-terciary">
                  Código<span className="text-danger">*</span>
                </label>
                <input
                  name="codigo"
                  className="form-control border border-terciary border rounded-pill px-3"
                  type="text"
                  placeholder="Código"
                  disabled
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
                    name="nombre"
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="Nombre"
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
                  Tipo de activo<span className="text-danger">*</span>
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
                        { label: "Vehiculo" , value: "vei"},
                        { label: "Otros Activos", value: "oac" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                  defaultValue={{label:"Computo", value: "com"}}
                />
                {errors.tipoactivo && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="ms-2 text-terciary">
                  Carpeta padre<span className="text-danger">*</span>
                </label>
                <input
                  name="padre"
                  className="form-control border border-terciary border rounded-pill px-3"
                  type="text"
                  placeholder="Carpeta Padre"
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
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "kilogramo " , value: "kg" },
                        { label: "kilometro" , value: "km"},
                        { label: "segundos" , value: "seg"},
                      ]}
                      placeholder="Seleccionar"
                      defaultValue={{label:"Unidades", value: "uni"}}
                      isDisabled
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
                      options={[
                        { label: "19%" , value: "19"},
                        { label: "14%" , value: "14"},
                        { label: "22%" , value: "23"},
                      ]}
                      placeholder="Seleccionar"
                      defaultValue={{label:"19%", value: "19"}}
                      
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
                  Tipo de depreciación<span className="text-danger">*</span>
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
                      options={[
                        { label: "linea recta" , value: "lin"},
                        { label: "hora uso" , value: "hor"},
                      ]}
                      placeholder="Seleccionar"
                      defaultValue={{label:"Linea recta", value: "lin"}}
                      
                    />
                  )}
                />
                {errors.depresiacion && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Unidad de vida útil<span className="text-danger">*</span>
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
                      options={[
                        { label: "años ", value: "ano" },
                        { label: "meses" , value: "mes"},
                        { label: "dias", value: "dia" },
                      ]}
                      placeholder="Seleccionar"
                      defaultValue={{label:"Años", value: "ano"}}
                    />
                  )}
                />
                {errors.unidadvida && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">
                    Cantidad de vida útil<span className="text-danger">*</span>
                  </label>
                  <input
                    name="cantidadvida"
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="Cantidad de vida util"
                    required
                  />
                </div>
                {errors.cantidadvida && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">
                    Valor residual<span className="text-danger">*</span>
                  </label>
                  <input
                    name="valorresidual"
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="Valor residual"
                    required
                  />
                </div>
                {errors.valorresidual && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Marca<span className="text-danger">*</span>
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
                      options={[
                        { label: "Lenovo", value: "len" },
                        { label: "Nokia", value: "nok" },
                        { label: "Dell", value: "del" },
                      ]}
                      placeholder="Seleccionar"
                      defaultValue={{label:"Lenovo"}}
                    />
                    
                  )}
                />
                {errors.marca && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
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
              <div className="col-12 col-lg-12 ">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Depreciación
                </label>
                <textarea
                  className="form-control border rounded-pill px-4 border border-terciary"
                  placeholder="Observaciones"
                  value="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, "
                  rows={3}
                  name="Acciones"
                />
              </div>
            </div>
            <div className="row ">
              <div className="d-flex justify-content-end mt-3">
                <button type="button" className="btn   text-capitalize" onClick={() => volver()}>
                  <i className="fa-solid fa-x fs-3"></i>
                </button>
                <button type="button" className="btn   text-capitalize">
                  i
                  <i className="fa-regular fa-floppy-disk fs-3"></i>
                </button>
                
              </div>
            </div>
            <button type="button" className="btn   text-capitalize">
            
            <i className="fa-solid fa-wand-magic-sparkles">G</i>
                </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreacionArticulosFijosScreen;
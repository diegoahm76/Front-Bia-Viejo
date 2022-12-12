import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Subtitle from "../../../components/Subtitle";
import { render } from "react-dom";
import { useNavigate } from "react-router-dom";

import { Column } from "primereact/column";
import { TreeTable } from "primereact/treetable";

import { obtenerTodosBienes } from "../../../store/slices/catalogoBienes/indexCatalogoBien";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { IBienes } from "../../../Interfaces/Bienes";
import { INodo } from "../../../Interfaces/Nodo";
//import clienteAxios from "../../../config/clienteAxios";
//import { IGeneric } from "../../../Interfaces/Generic";

const CatalogoDeBienesScreen = () => {
  const [buscarProducto, setBuscarProducto] = useState(true);
  const bienes = useAppSelector((state) => state.bien);
  const bienesExample: IBienes[] = [
    {
      id_bien: 1,
      codigo_bien: "",
      nro_elemento_bien: 0,
      nombre: "",
      cod_tipo_bien: "",
      cod_tipo_activo: "",
      nivel_jerarquico: 1,
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
    },
    {
      id_bien: 2,
      codigo_bien: "",
      nro_elemento_bien: 0,
      nombre: "",
      cod_tipo_bien: "",
      cod_tipo_activo: "",
      nivel_jerarquico: 2,
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
      id_bien_padre: 1,
    },
    {
      id_bien: 3,
      codigo_bien: "",
      nro_elemento_bien: 0,
      nombre: "",
      cod_tipo_bien: "",
      cod_tipo_activo: "",
      nivel_jerarquico: 2,
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
      id_bien_padre: 1,
    },
    {
      id_bien: 4,
      codigo_bien: "",
      nro_elemento_bien: 0,
      nombre: "",
      cod_tipo_bien: "",
      cod_tipo_activo: "",
      nivel_jerarquico: 1,
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
    },
    {
      id_bien: 5,
      codigo_bien: "",
      nro_elemento_bien: 0,
      nombre: "",
      cod_tipo_bien: "",
      cod_tipo_activo: "",
      nivel_jerarquico: 2,
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
      id_bien_padre: 4,
    },
    {
      id_bien: 6,
      codigo_bien: "",
      nro_elemento_bien: 0,
      nombre: "",
      cod_tipo_bien: "",
      cod_tipo_activo: "",
      nivel_jerarquico: 3,
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
      id_bien_padre: 5,
    },
  ];

  function armarArbol() {
    let contador = 0;
    bienesExample.forEach((bienElement) => {
      agregarNodosBase(bienElement, contador);
      contador=arrayTotal.length;
    });
  }
  let arrayRecorrido: number[] = [];
  let arrayTotal: INodo[] = [];

  function tieneHijos(bien) {
    let bandera = 0;
    bienesExample.forEach((bienElement) => {
      if (bien.id_bien === bienElement.id_bien_padre) {
        bandera++;
      }
    });
    return bandera > 0 ? true : false;
  }

  function nodoRecorrido(bien) {
    return arrayRecorrido.includes(bien.id_bien) ? false : true;
  }

  function agregarNodosBase(bien, contador) {
    let hijos: INodo[] = [];
    let keynode = contador.toString() + "-";
    let nodo: INodo = {
      key: contador.toString(),
      data: {
        nombre: bien.nombre,
        acciones: "123", //agregar icosnos
        id_nodo: bien.id_bien,
      },
      children: hijos,
    };
    let existe = nodoRecorrido(bien);
    if (existe && bien.nivel_jerarquico == 1) {
      if (tieneHijos(bien)) {
        debugger;
        let children = [...crearNiveles(bien, keynode)];
        nodo.children = [...children];
        arrayTotal.push({ ...nodo });
      } else {
        arrayTotal.push({ ...nodo });
        arrayRecorrido.push({ ...bien }.id_bien);
      }
    }
  }

  function crearNiveles(bien, keynode) {
    let contadorInterno = 0;
    let hijos: INodo[] = [];
    let nodoHijo: INodo = {
      key: "",
      data: { nombre: bien.codigo_bien, acciones: "123" },
      children: hijos,
    };
    let existe = nodoRecorrido(bien);
    if (existe) {
      bienesExample.forEach((bienElement) => {
        if (bienElement.id_bien_padre === bien.id_bien) {
          let existe2 = nodoRecorrido(bienElement);
          if (existe2) {
            nodoHijo.key = keynode + contadorInterno.toString();
            nodoHijo.data.nombre = bienElement.nombre;
            nodoHijo.data.acciones = "true false true";
            if (tieneHijos(bienElement)) {
              let hijo = crearNiveles(
                bienElement,
                keynode + contadorInterno.toString() + "-"
              );
              nodoHijo.children = [...hijo];
            } else {
              nodoHijo.children = [];
            }
            arrayRecorrido.push(bienElement.id_bien);
            hijos.push({ ...nodoHijo });
          }
          contadorInterno++;
        }
      });
    }
    arrayRecorrido.push(bien.id_bien);
    debugger;
    return [...hijos];
  }

  // const nodes = [
  //   {
  //     key: "0",
  //     data: {
  //       name: "Applications",
  //       size: "100kb",
  //       type: "Folder",
  //     },
  //     children: [
  //       {
  //         key: "0-0",
  //         data: {
  //           name: "React",
  //           size: "25kb",
  //           type: "Folder",
  //         },
  //         children: [
  //           {
  //             key: "0-0-0",
  //             data: {
  //               name: "react.app",
  //               size: "10kb",
  //               type: "Application",
  //             },
  //           },
  //           {
  //             key: "0-0-1",
  //             data: {
  //               name: "native.app",
  //               size: "10kb",
  //               type: "Application",
  //             },
  //           },
  //           {
  //             key: "0-0-2",
  //             data: {
  //               name: "mobile.app",
  //               size: "5kb",
  //               type: "Application",
  //             },
  //           },
  //         ],
  //       },
  //       {
  //         key: "0-1",
  //         data: {
  //           name: "editor.app",
  //           size: "25kb",
  //           type: "Application",
  //         },
  //       },
  //       {
  //         key: "0-2",
  //         data: {
  //           name: "settings.app",
  //           size: "50kb",
  //           type: "Application",
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     key: "1",
  //     data: {
  //       name: "Cloud",
  //       size: "20kb",
  //       type: "Folder",
  //     },
  //     children: [
  //       {
  //         key: "1-0",
  //         data: {
  //           name: "backup-1.zip",
  //           size: "10kb",
  //           type: "Zip",
  //         },
  //       },
  //       {
  //         key: "1-1",
  //         data: {
  //           name: "backup-2.zip",
  //           size: "10kb",
  //           type: "Zip",
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     key: "2",
  //     data: {
  //       name: "Desktop",
  //       size: "150kb",
  //       type: "Folder",
  //     },
  //     children: [
  //       {
  //         key: "2-0",
  //         data: {
  //           name: "note-meeting.txt",
  //           size: "50kb",
  //           type: "Text",
  //         },
  //       },
  //       {
  //         key: "2-1",
  //         data: {
  //           name: "note-todo.txt",
  //           size: "100kb",
  //           type: "Text",
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     key: "3",
  //     data: {
  //       name: "Documents",
  //       size: "75kb",
  //       type: "Folder",
  //     },
  //     children: [
  //       {
  //         key: "3-0",
  //         data: {
  //           name: "Work",
  //           size: "55kb",
  //           type: "Folder",
  //         },
  //         children: [
  //           {
  //             key: "3-0-0",
  //             data: {
  //               name: "Expenses.doc",
  //               size: "30kb",
  //               type: "Document",
  //             },
  //           },
  //           {
  //             key: "3-0-1",
  //             data: {
  //               name: "Resume.doc",
  //               size: "25kb",
  //               type: "Resume",
  //             },
  //           },
  //         ],
  //       },
  //       {
  //         key: "3-1",
  //         data: {
  //           name: "Home",
  //           size: "20kb",
  //           type: "Folder",
  //         },
  //         children: [
  //           {
  //             key: "3-1-0",
  //             data: {
  //               name: "Invoices",
  //               size: "20kb",
  //               type: "Text",
  //             },
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     key: "4",
  //     data: {
  //       name: "Downloads",
  //       size: "25kb",
  //       type: "Folder",
  //     },
  //     children: [
  //       {
  //         key: "4-0",
  //         data: {
  //           name: "Spanish",
  //           size: "10kb",
  //           type: "Folder",
  //         },
  //         children: [
  //           {
  //             key: "4-0-0",
  //             data: {
  //               name: "tutorial-a1.txt",
  //               size: "5kb",
  //               type: "Text",
  //             },
  //           },
  //           {
  //             key: "4-0-1",
  //             data: {
  //               name: "tutorial-a2.txt",
  //               size: "5kb",
  //               type: "Text",
  //             },
  //           },
  //         ],
  //       },
  //       {
  //         key: "4-1",
  //         data: {
  //           name: "Travel",
  //           size: "15kb",
  //           type: "Text",
  //         },
  //         children: [
  //           {
  //             key: "4-1-0",
  //             data: {
  //               name: "Hotel.pdf",
  //               size: "10kb",
  //               type: "PDF",
  //             },
  //           },
  //           {
  //             key: "4-1-1",
  //             data: {
  //               name: "Flight.pdf",
  //               size: "5kb",
  //               type: "PDF",
  //             },
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     key: "5",
  //     data: {
  //       name: "Main",
  //       size: "50kb",
  //       type: "Folder",
  //     },
  //     children: [
  //       {
  //         key: "5-0",
  //         data: {
  //           name: "bin",
  //           size: "50kb",
  //           type: "Link",
  //         },
  //       },
  //       {
  //         key: "5-1",
  //         data: {
  //           name: "etc",
  //           size: "100kb",
  //           type: "Link",
  //         },
  //       },
  //       {
  //         key: "5-2",
  //         data: {
  //           name: "var",
  //           size: "100kb",
  //           type: "Link",
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     key: "6",
  //     data: {
  //       name: "Other",
  //       size: "5kb",
  //       type: "Folder",
  //     },
  //     children: [
  //       {
  //         key: "6-0",
  //         data: {
  //           name: "todo.txt",
  //           size: "3kb",
  //           type: "Text",
  //         },
  //       },
  //       {
  //         key: "6-1",
  //         data: {
  //           name: "logo.png",
  //           size: "2kb",
  //           type: "Picture",
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     key: "7",
  //     data: {
  //       name: "Pictures",
  //       size: "150kb",
  //       type: "Folder",
  //     },
  //     children: [
  //       {
  //         key: "7-0",
  //         data: {
  //           name: "barcelona.jpg",
  //           size: "90kb",
  //           type: "Picture",
  //         },
  //       },
  //       {
  //         key: "7-1",
  //         data: {
  //           name: "primeng.png",
  //           size: "30kb",
  //           type: "Picture",
  //         },
  //       },
  //       {
  //         key: "7-2",
  //         data: {
  //           name: "prime.jpg",
  //           size: "30kb",
  //           type: "Picture",
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     key: "8",
  //     data: {
  //       name: "Videos",
  //       size: "1500kb",
  //       type: "Folder",
  //     },
  //     children: [
  //       {
  //         key: "8-0",
  //         data: {
  //           name: "primefaces.mkv",
  //           size: "1000kb",
  //           type: "Video",
  //         },
  //       },
  //       {
  //         key: "8-1",
  //         data: {
  //           name: "intro.avi",
  //           size: "500kb",
  //           type: "Video",
  //         },
  //       },
  //     ],
  //   },
  // ];

  const dispatch = useAppDispatch();
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    //obtenerTodosBienes(dispatch);
    armarArbol();
    debugger;
  });

  const submit = (data) => {};

  const navigate = useNavigate();
  const CrearArticulo = () => {
    navigate(
      "/dashboard/Recaudo/gestor-notificacion/crear-entrada-articulos-fijos"
    );
  };
  const Articulo = () => {
    navigate("/dashboard/Recaudo/gestor-notificacion/entrada-articulos-fijos");
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <div className="row">
            <h3 className="text-rigth  fw-light mt-4 mb-2">
              {" "}
              Catálogo de bienes
            </h3>
            <div className="d-flex justify-content">
              <div className="d-grid d-flex">
                <button
                  className="btn-icon-blue btn px-3  mt-4 "
                  type="button"
                  title="Buscar"
                  onClick={() => setBuscarProducto(!buscarProducto)}
                >
                  <i className="fa-solid fa-magnifying-glass fs-3"></i>
                </button>
              </div>
              <div className="d-grid d-flex">
                <button
                  className="btn-icon-green btn px-3 mt-4"
                  type="button"
                  title="Agregar"
                  onClick={() => CrearArticulo()}
                >
                  <i className="fa-regular fa-plus fs-3"></i>
                </button>
              </div>
            </div>
            {buscarProducto === false ? (
              <div className="row">
                <Subtitle title={"Buscar artículo"} />
                <div className="col-12 col-md-3">
                  <div>
                    <label className="ms-2 text-terciary">Código</label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="number"
                      {...register("codigo", {
                        required: true,
                      })}
                    />
                  </div>
                  {errors.numeroDocumento && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-3">
                  <div>
                    <label className="ms-2 text-terciary">Nombre</label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      {...register("nombre", {
                        required: true,
                      })}
                    />
                  </div>
                  {errors.numeroDocumento && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-3">
                  <label className="ms-3 text-terciary">Tipo de bien</label>
                  <Controller
                    name="tipo"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select {...field} placeholder="Seleccionar" />
                    )}
                  />
                  {errors.tipo && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-3">
                  <label className="ms-3 text-terciary">
                    {" "}
                    Tipo de activo <span className="text-danger">*</span>{" "}
                  </label>
                  <Controller
                    name="tipo2"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isDisabled
                        className="col-12"
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="multisteps-form__content mt-4">
              <div>
                <div
                  className="ag-theme-alpine mt-auto mb-3 px-4"
                  style={{ height: "470px" }}
                >
                  <TreeTable value={arrayTotal}>
                    <Column field="nombre" header="Nombre" expander></Column>
                    <Column field="acciones" header="Acciones"></Column>
                  </TreeTable>
                  ;
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CatalogoDeBienesScreen;

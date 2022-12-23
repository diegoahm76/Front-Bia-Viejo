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
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { 
  obtenerTodosBienes,
  obtenerBien,
} from "../../../store/slices/catalogoBienes/indexCatalogoBien";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { IBienes } from "../../../Interfaces/Bienes";
import { INodo } from "../../../Interfaces/Nodo";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";


const CatalogoDeBienesScreen = () => {
  const bien = useAppSelector((state) => state.bien.bien);
  const dispatch = useAppDispatch();

  //const [buscarProducto, setBuscarProducto] = useState(true);
  //const [bienesExampleH, setBienesExampleNodes] = useState<IBienes[]>([]);
  const [globalFilter1, setGlobalFilter1] = useState(null);
  const [globalFilter2, setGlobalFilter2] = useState(null);
  const [arrayTotal, setArrayTotal] = useState<INodo[]>([]);
  const [arrayRecorrido, setArrayRecorrido] = useState<number[]>([]);

  const armarArbol = useCallback((bienNuevo) => {
    let contador = 0;
    console.log("BIEN cargado", bienNuevo);
    bienNuevo?.forEach((bienElement) => {
      agregarNodosBase(bienElement, contador, bienNuevo);
      contador = arrayTotal.length;
    });
  }, []);
  useEffect(() => {
    obtenerTodosBienes(dispatch);
  }, [dispatch]);
  useEffect(
    () => console.log(" after first render or message updated", bien),
    [bien]
  );
  useEffect(() => {
    armarArbol(bien);
  }, [bien]);

  // useEffect(() => {
  //   armarArbol(bien);
  // }, [bien]);

  // function armarArbol(bienArray) {
  //   let contador = 0;
  //   bien.forEach((bienElement) => {
  //     agregarNodosBase(bienElement, contador);
  //     contador = arrayTotal.length;
  //   });
  //}

  const treeTableFuncMap = {
    globalFilter1: setGlobalFilter1,
    globalFilter2: setGlobalFilter2,
  };

  const getHeader = (globalFilterKey) => {
    return (
      <div className="text-right">
        <div className="p-input-icon-left">
          <i className="pi pi-search"></i>
          <InputText
            type="search"
            onInput={(e: any) =>
              treeTableFuncMap[`${globalFilterKey}`](e.target.value)
            }
            placeholder="Global Search"
            size={50}
          />
        </div>
      </div>
    );
  };

  let header1 = getHeader("globalFilter1");
  let header2 = getHeader("globalFilter2");

  //armarArbol();
  const header = "Catalogo de bienes- Viewer";
  const footer = (
    <div style={{ textAlign: "left" }}>
      <Button icon="pi pi-refresh" tooltip="Reload" />
    </div>
  );
  const actionTemplate = (node, column) => {
    return (
      <div>
        <Button
          type="button"
          icon="fa-regular fa-plus fs-3"
          className="p-button-success"
          style={{ marginRight: ".5em" }}
          onClick={() => {
            enviarDatos(node);
          }}
          disabled={node.data.crear}
        ></Button>
        <Button
          type="button"
          icon="fa-regular fa-pen-to-square fs-3"
          className="p-button-warning"
          style={{ marginRight: ".5em" }}
          disabled={node.data.editar}
        ></Button>
        <Button
          type="button"
          icon="fa-regular fa-trash-can fs-3"
          className="p-button-danger"
          style={{ marginRight: ".5em" }}
          disabled={node.data.eliminar}
        ></Button>
      </div>
    );
  };

  //let arrayTotal: INodo[] = [];

  function tieneHijos(bien, bienNuevo) {
    let bandera = 0;
    bienNuevo.forEach((bienElement) => {
      if (bien.id_bien === bienElement.id_bien_padre) {
        bandera++;
      }
    });
    return bandera > 0 ? true : false;
  }

  function nodoRecorrido(bien) {
    return arrayRecorrido.includes(bien.id_bien) ? false : true;
  }

  function agregarNodosBase(bien, contador, bienNuevo) {
    let hijos: INodo[] = [];
    let keynode = contador.toString() + "-";
    let nodo: INodo = {
      key: contador.toString(),
      data: {
        nombre: bien.nombre + " (" + contador.toString() + ")",
        codigo: bien.codigo_bien,
        id_nodo: bien.id_bien,
        editar: false,
        eliminar: false,
        crear: false,
      },
      children: hijos,
    };
    let existe = nodoRecorrido(bien);
    if (existe && bien.nivel_jerarquico == 1) {
      if (tieneHijos(bien, bienNuevo)) {
        let children = [...crearNiveles(bien, keynode, bienNuevo)];
        nodo.children = [...children];
        nodo.data.eliminar = true;
        arrayTotal.push({ ...nodo });
      } else {
        arrayTotal.push({ ...nodo });
        nodo.data.eliminar = false;
        arrayRecorrido.push({ ...bien }.id_bien);
      }
    }
  }

  function crearNiveles(bien, keynode, bienNuevo) {
    let contadorInterno = 0;
    let hijos: INodo[] = [];
    let nodoHijo: INodo = {
      key: "",
      data: {
        nombre: "",
        codigo: "",
        id_nodo: 0,
        editar: false,
        crear: false,
      },
      children: hijos,
    };
    let existe = nodoRecorrido(bien);
    if (existe) {
      bienNuevo.forEach((bienElement) => {
        if (bienElement.id_bien_padre === bien.id_bien) {
          let existe2 = nodoRecorrido(bienElement);
          if (existe2) {
            nodoHijo.key = keynode + contadorInterno.toString();
            if (tieneHijos(bienElement, bienNuevo)) {
              let hijo = [
                ...crearNiveles(
                  bienElement,
                  keynode + contadorInterno.toString() + "-",
                  bienNuevo
                ),
              ];
              nodoHijo.data = {
                id_nodo: bienElement.id_bien,
                codigo: bienElement.codigo_bien,
                nombre:
                  bienElement.nombre +
                  " (" +
                  keynode +
                  " " +
                  contadorInterno.toString() +
                  ")",
                eliminar: true,
              };
              nodoHijo.data.id_nodo = { ...bienElement }.id_bien;
              nodoHijo.children = [...hijo];
            } else {
              nodoHijo.data = {
                id_nodo: bienElement.id_bien,
                codigo: bienElement.codigo_bien,
                nombre:
                  bienElement.nombre +
                  " (" +
                  keynode +
                  " " +
                  contadorInterno.toString() +
                  ")",
                eliminar: false,
              };
              nodoHijo.children = [];
              nodoHijo.data.eliminar = false;
            }
            arrayRecorrido.push(bienElement.id_bien);
            hijos.push({ ...nodoHijo });
          }
          contadorInterno++;
        }
      });
    }
    arrayRecorrido.push(bien.id_bien);
    return [...hijos];
  }

  function enviarDatos(nodo) {
    obtenerBien(dispatch, nodo);
    navigate(
      "/dashboard/Recaudo/gestor-notificacion/crear-entrada-articulos-fijos"
    );
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

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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
                  className="btn-icon-green btn px-3 mt-4"
                  type="button"
                  title="Agregar"
                  onClick={() => CrearArticulo()}
                >
                  <i className="fa-regular fa-plus fs-3"></i>
                </button>
              </div>
            </div>
            <div className="card">
              <TreeTable value={arrayTotal} footer={footer} filterMode="strict">
                <Column
                  field="nombre"
                  header="Nombre"
                  expander
                  style={{ width: "550px" }}
                  filter
                  filterPlaceholder="Filter por nombre"
                ></Column>
                <Column
                  field="codigo"
                  header="Código"
                  style={{ width: "450px" }}
                  filter
                  filterPlaceholder="Filter por código"
                ></Column>
                <Column
                  header="Acciones"
                  body={actionTemplate}
                  style={{ textAlign: "center", width: "850px" }}
                />
                {/* <Column field="agregar" header="Agregar"></Column>
                    <Column field="editar" header="Editar"></Column>
                    <Column field="eliminar" header="Eliminar"></Column> */}
              </TreeTable>
              ;
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CatalogoDeBienesScreen;

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
  seleccionarBienEdit,
  seleccionarBienCreate,
  eliminarBien,
} from "../../../store/slices/catalogoBienes/indexCatalogoBien";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { IBienes } from "../../../Interfaces/Bienes";
import { INodo } from "../../../Interfaces/Nodo";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import clienteAxios from "../../../config/clienteAxios";

const CatalogoDeBienesScreen = () => {
  const bien = useAppSelector((state) => state.bien.bien);
  const dispatch = useAppDispatch();

  //const [buscarProducto, setBuscarProducto] = useState(true);
  //const [bienesExampleH, setBienesExampleNodes] = useState<IBienes[]>([]);
  const [globalFilter1, setGlobalFilter1] = useState(null);
  const [globalFilter2, setGlobalFilter2] = useState(null);
  const [arrayTotal, setArrayTotal] = useState<INodo[]>([]);
  const [arrayRecorrido, setArrayRecorrido] = useState<number[]>([]);


  useEffect(() => {
    getBienes();
  }, []);

  const getBienes = async () => {
    await clienteAxios
      .get("almacen/bienes/catalogo-bienes/get-list")
      .then((bienes) => {
        setArrayTotal(bienes.data.array_total);
      })
      .catch(() => {
      });
  }

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
            enviarDatos(node, false); //crear
          }}
          disabled={node.data.crear}
        ></Button>
        <Button
          type="button"
          icon="fa-regular fa-pen-to-square fs-3"
          className="p-button-warning"
          style={{ marginRight: ".5em" }}
          onClick={() => {
            enviarDatos(node, true); //true
          }}
          disabled={node.data.editar}
        ></Button>
        <Button
          type="button"
          icon="fa-regular fa-trash-can fs-3"
          className="p-button-danger"
          style={{ marginRight: ".5em" }}
          disabled={node.data.eliminar}
          onClick={() => {
            eliminarNodo(node); //true
          }}
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
        bien: bien,
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
    // ...Children retorman esto 
    let nodoHijo: INodo = {
      key: "",
      data: {
        nombre: "",
        codigo: "",
        id_nodo: 0,
        editar: false,
        crear: false,
        bien: bien,
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
                bien: bienElement,
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
                bien: bienElement,
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

  function enviarDatos(nodo, accion) {
    if (accion) {
      seleccionarBienEdit(dispatch, nodo.data.bien)
    } else {
      seleccionarBienCreate(dispatch, nodo.data.bien)
    }


    navigate(
      "/dashboard/Recaudo/gestor-notificacion/crear-entrada-articulos-fijos"
    );
  }

  function eliminarNodo(nodo) {
    eliminarBien(dispatch, nodo.data.bien);
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const CrearArticulo = () => {
    navigate(
      "/dashboard/Recaudo/gestor-notificacion/crear-entrada-articulos-fijos"
    );
  };


  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
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

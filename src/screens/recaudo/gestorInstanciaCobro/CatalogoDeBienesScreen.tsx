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
  initialStateBien,
} from "../../../store/slices/catalogoBienes/indexCatalogoBien";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { IBienes } from "../../../Interfaces/Bienes";
import { INodo } from "../../../Interfaces/Nodo";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import clienteAxios from "../../../config/clienteAxios";
import clienteBack from "../../../config/clienteBack";

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
    await clienteBack
      .get("almacen/bienes/catalogo-bienes/get-list")
      .then((bienes) => {
        setArrayTotal(bienes.data.data);
      })
      .catch(() => {});
  };
  console.log(arrayTotal, "estos son todos los datos");

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
          icon="fa-regular fa-plus fs-4"
          className="p-button-success p-button-outlined"
          style={{ marginRight: ".5em", color: "black", border: "none" }}
          onClick={() => {
            enviarDatos(node, false); //crear
          }}
          disabled={!node.data.crear}
        ></Button>
        <Button
          type="button"
          icon="fa-regular fa-pen-to-square fs-4"
          className="p-button-white p-button-outlined"
          style={{ marginRight: ".5em", color: "black", border: "none" }}
          onClick={() => {
            enviarDatos(node, true); //true
          }}
          disabled={!node.data.editar}
        ></Button>
        <Button
          type="button"
          icon="fa-regular fa-trash-can fs-4"
          className="p-button-danger p-button-outlined"
          style={{ marginRight: ".5em", color: "black", border: "none" }}
          disabled={!node.data.eliminar}
          onClick={() => {
            eliminarNodo(node); //true
          }}
        ></Button>
      </div>
    );
  };

  function enviarDatos(nodo, accion) {
    if (accion) {
      seleccionarBienEdit(dispatch, nodo.data.bien);
    } else {
      seleccionarBienCreate(dispatch, nodo.data.bien);
    }
    navigate(
      "/dashboard/Recaudo/gestor-notificacion/crear-entrada-articulos-fijos"
    );
  }

  function eliminarNodo(nodo) {
    eliminarBien(dispatch, nodo.data);
    obtenerTodosBienes(dispatch);
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const CrearArticulo = () => {
    console.log("crear", initialStateBien);
    seleccionarBienCreate(dispatch, initialStateBien.bienSeleccionado);
    navigate(
      "/dashboard/Recaudo/gestor-notificacion/crear-entrada-articulos-fijos"
    );
  };

  const actionTemplate2 = () => {
    return (
      <div>
        <i className="fa-regular fa-folder"></i>
      </div>
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
          </div>

          <div className="row">
            <Subtitle title={"Craciaciòn de Articulos"} />

            <div className="col-12 col-md-3  mt-4">
              <h5 className="mt-2">Crear nodo padre :</h5>
            </div>

            <div className="col-12 col-md-3 ">
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
              
             
              expander
                body={<i className="fa-regular fa-folder fs-4"></i>}
                style={{ width: "200px" }}
                
                
              ></Column>
              <Column header="Nombre"
                field="nombre"
                style={{ width: "800px" }}
                filter
                filterPlaceholder="Filter por nombre"
              ></Column>
              <Column
                field="codigo"
                header="Código"
                style={{ width: "300px" }}
                filter
                filterPlaceholder="Filter por código"
              ></Column>
              <Column
                header="Acciones"
                body={actionTemplate}
                style={{ textAlign: "center", width: "400px" }}
              />
              {/* <Column field="agregar" header="Agregar"></Column>
                    <Column field="editar" header="Editar"></Column>
                    <Column field="eliminar" header="Eliminar"></Column> */}
            </TreeTable>
            ;
          </div>
        </form>
      </div>
    </div>
  );
};
export default CatalogoDeBienesScreen;

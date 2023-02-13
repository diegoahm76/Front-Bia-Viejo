// import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Subtitle from "../../../components/Subtitle"
import IconoBuscar from "../../../assets/iconosBotones/buscar.svg";
import { seleccionarVivero } from '../../../store/slices/administradorViveros/indexAdministradorViveros';




const rowDataInicial = [
 
    { latitud: "4°05'10.0''N", longitud: "73°33'49.1''W ", accion: "" },
    
  ];

const options = [
  { label: "Vivero 1", value: "V1" },
  { label: "Vivero 2", value: "V2" },
  { label: "Vivero 3", value: "V3" },
  { label: "Vivero 4", value: "V4" },
  { label: "Vivero 5", value: "V5" },
  { label: "Vivero 6", value: "V6" },
  { label: "Vivero 7", value: "V7" },
];


function AperturayCierreViveroScreen() {

  const [cambioBoton, setCambioBoton] = useState(false);
  const changeDisabled = () => setCambioBoton(!cambioBoton)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    control: control2,
    formState: { errors: errors2 },
  } = useForm();

  const [rowData, setRowData] = useState(rowDataInicial)
  const [inactivar, setInactivar] = useState(false)
  const [activar, setActivar] = useState(true)
  const change = () => setInactivar(!inactivar)
  const activate = () => setActivar(activar)

  const onSubmitGuardar = (data) => {
    setBotonGuardar({
      tamano: data.tamano,
      cantidad: data.cantidad,
      etapaMaterialVegetal: data.etapaMaterialVegetal,
    });
  };

  const [botonGuardar, setBotonGuardar] = useState({
    tamano: "",
    cantidad: "",
    etapaMaterialVegetal: "",
  });


  // const gridRef = useRef(); // Optional - for accessing Grid's API


  const [selector, setSelector] = useState({
    seleccioneVivero: "",
  });

  const onSubmit = (data) => {
    setSelector({
      seleccioneVivero: data.seleccioneVivero,
    });
  };
  const onSubmit2 = (data) => {
    setSelector({
      seleccioneVivero: data.seleccioneVivero,
    });
  };



  const guardarDatos = () => {
    //agarrar datos de latitud y longitud, acomodarlos en un objeto
  }

  const opcionMunicipio = [
    { label: "Acacías", value: "Acac" },
    { label: "Barranca de Upía", value: "Barra" },
    { label: "Cabuyaro", value: "Cabuy" },
    { label: "Castilla La Nueva", value: "Cast" },
    { label: "Cubarral", value: "Cuba" },
    { label: "Cumaral", value: "Cuma" },
    { label: "El Calvario", value: "Elca" },
    { label:"Villavicencio", value:"Vi"}
  ];



  // Each Column Definition results in one Column.
  let gridApi;
  const columnDefs = [
    { headerName: "Latitud", field: "latitud" },
    { headerName: "Longitud", field: "longitud" },
    {
      headerName: "Acción", field: "accion", cellRendererFramework: (params) => (
        <div className="col-12 ">
          <button className=" border rounded-pill px-3 " type="button" title="Send">
          <i className="fa-regular fa-trash-can fs-3"></i>
          </button>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    sortable: true,
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
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };
  // const onExportClick = () => {
  //   gridApi.exportDataAsCsv();
  // };

  // const handleInputChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...inputList];
  //   list[index][name] = value;
  //   setInputList(list);
  // };

  // handle click event of the Remove button
  // const handleRemoveClick = (index) => {
  //   const list = [...inputList];
  //   list.splice(index, 1);
  //   setInputList(list);
  // };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Apertura y cierre de vivero
            </h3>
            <div className="col-12 col-md-3 mb-3">
            <label className="text-terciary">
                  Seleccione vivero:<span className="text-danger">*</span>
                </label>

                <Select
                  options={[
                   seleccionarVivero
                  ]}
                  placeholder="Tipo de vivero"
                  required={true}
                />
                </div>
                <div className="col-12 col-md-3 mt-2" style={{ display: "flex" }}>
                <button
                  type="button"
                  className="btn  text-capitalize btn-outline-ligth ms-2 mt-4"
                  title="Buscar profesional Cormacarena"
                >
                  <img src={IconoBuscar} alt="buscar" />
                </button>
                </div>
            <Subtitle title="Justificación" mt={3} />
           
            <div className="input-group input-group-dynamic flex-column mt-4">
              <label htmlFor="exampleFormControlInput1" className="text-terciary">
                Justificación apertura/cierre: <span className="text-danger">*</span>
              </label>
              <textarea className=" form-control w-auto border-rounded-pill px-3" />
            </div>

            <div className="row">
            <div style={{textAlign:"end"}}>
              <button
                className="btn border rounded-pill mt-2 px-3 ms-2"
                type="submit"
                title="Guardar"
              >
                <i className="fa-regular fa-floppy-disk fs-3"></i>
              </button>
                <button
                className="btn border rounded-pill mt-2 px-3 ms-2"
                
                title="Cancelar"
              >
              <i className="fa-solid fa-x fs-3"></i>
              </button>
              </div>
            </div>
          </form>
        
        </div>
      </div>
    </div >
  );
}

export default AperturayCierreViveroScreen;

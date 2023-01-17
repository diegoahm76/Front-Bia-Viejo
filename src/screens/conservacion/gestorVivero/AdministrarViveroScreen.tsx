import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import React, { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Subtitle from "../../../components/Subtitle";
import IconoBuscar from "../../../assets/iconosBotones/buscar.svg";
import BusquedaAvanzadaModal from "../../../components/BusquedaAvanzadaModal";
import ReactDatePicker from "react-datepicker";

function AdministrarViveroScreen() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [setVivero] = useState("");
  const [setSiembra] = useState("");

  // const handleAddGrid = (dataAdd) => {
  //   console.log(dataAdd)
  // }

  const onSubmit = (data) => {
    console.log(data);
  };

  const optionViveroCreados = [
    { label: "Recursos propios de la corporación", value: "RP" },
    { label: "Compensación", value: "CO" },
    { label: "Donación", value: "DO" },
  ];

  const options = [
    { label: "Acacías", value: "Acac" },
    { label: "Barranca de Upía", value: "Barra" },
    { label: "Cabuyaro", value: "Cabuy" },
    { label: "Castilla La Nueva", value: "Cast" },
    { label: "Cubarral", value: "Cuba" },
    { label: "Cumaral", value: "Cuma" },
    { label: "El Calvario", value: "Elca" },
    { label: "Villavicencio", value: "vi" },
  ];
  // const opcionMunicipio = [
  //   { label: "Acacías", value: "Acac" },
  //   { label: "Barranca de Upía", value: "Barra" },
  //   { label: "Cabuyaro", value: "Cabuy" },
  //   { label: "Castilla La Nueva", value: "Cast" },
  //   { label: "Cubarral", value: "Cuba" },
  //   { label: "Cumaral", value: "Cuma" },
  //   { label: "El Calvario", value: "Elca" },
  // ];
  let gridApi;
  const columnDefs = [
    { headerName: "Latitud", field: "latitud" },
    { headerName: "Longitud", field: "longitud" },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div className="button-row justify-align-content-center col-12 col-sm-4 col-lg-4">
          <button
            className="btn-min-width border rounded-pill px-3"
            type="button"
            title="Send"
          >
            <i className="fa-regular fa-trash-can fs-3"></i>
          </button>
        </div>
      ),
    },
  ];
  const rowData = [
    { latitud: "4°05'10.0''N", longitud: "73°33'49.1''W ", accion: "" },
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
  // const onExportClick = () => {
  //   gridApi.exportDataAsCsv();
  // };

  // const handleInputChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const list = [...inputList];
  //   list[index][name] = value;
  //   setInputList(list);
  // };

  // // handle click event of the Remove button
  // const handleRemoveClick = (index) => {
  //   const list = [...inputList];
  //   list.splice(index, 1);
  //   setInputList(list);
  // };

  const handleOpenModalAvanzadaModal = () => {
    setModalPersonal(true);
  };

  const [modalPersonal, setModalPersonal] = useState(false);

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Administración de viveros
            </h3>
            <Subtitle title="Información principal" mt={3} mb={2} />
            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">Nombre:</label>
                <input
                  type="text"
                  className="form-control border border-terciary rounded-pill px-3"
                  placeholder="Escribe el nombre del vivero"
                  {...register("nombreVivero", { required: true })}
                />
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Municipio:<span className="text-danger">*</span>
                </label>

                <Select
                  options={[
                    { label: "Acacías", value: "Acac" },
                    { label: "Barranca de Upía", value: "Barra" },
                    { label: "Cabuyaro", value: "Cabuy" },
                    { label: "Castilla La Nueva", value: "Cast" },
                    { label: "Cubarral", value: "Cuba" },
                    { label: "Cumaral", value: "Cuma" },
                    { label: "El Calvario", value: "Elca" },
                    { label: "Villavicencio", value: "vi" },
                  ]}
                  placeholder="Selecciona municipio"
                  required={true}
                />

                {errors.municipioOpcion && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>

              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Área del vivero (metros cuadrados):{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control border border-terciary rounded-pill px-3"
                  placeholder="Ingresa área para el vivero"
                  {...register("nombreVivero", { required: true })}
                />
                {errors.nombreVivero && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Tipo Vivero:<span className="text-danger">*</span>
                </label>

                <Select
                  options={[
                    { label: "Vivero satelite", value: "VS" },
                    { label: " Mega vivero", value: "MV" },
                  ]}
                  placeholder="Tipo de vivero"
                  required={true}
                />

                {errors.municipioOpcion && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>
            </div>
            <div className="row ms-3">
            <div className="card col-5 col-md-auto" style={{backgroundColor:"#f7d7d8", flexBasis:"content",height:"100px"}}>
            <div className="mt-3 ms-3">
              <label style={{color:"#84454a"}}>  <i className="fa-solid fa-triangle-exclamation me-3" style={{color:"#c02b1b"}}></i>Este vivero se encuentra cerrado desde</label> 
            </div>
            <div style={{display:"flex"}}>
              <div >
              <button  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill ms-3 mt-1 btn-min-width">Ver mas Información</button>
              {/* </div>
              <div className="col-4"> */}
              <button  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill ms-3 mt-1 btn-min-width">Realizar apertura</button>
              </div>
            </div>
            </div>
            </div>
            <div className="row ms-3">
            <div className="card col-5 col-md-auto" style={{backgroundColor:"#f7d7d8", flexBasis:"content", height:"100px"}}>
            <div className="mt-3 ms-3">
              <label style={{color:"#84454a"}}>  <i className="fa-solid fa-triangle-exclamation me-3" style={{color:"#c02b1b"}}></i>Este vivero se encuentra en cuarentena desde</label> 
            </div>
            <div style={{display:"flex"}}>
              <div >
              <button  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill ms-3 mt-1 btn-min-width">Ver mas Información</button>
              {/* </div>
              <div className="col-4"> */}
              <button  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill ms-3 mt-1 btn-min-width">Finalizar cuarentena</button>
              </div>
            </div>
            </div>
            </div>

            <Subtitle title="Detalles de vivero" mt={3} mb={2} />

            <div className="col-12 col-md-3 mb-3">
              <label className="text-terciary">
                Área de propagación (metros cuadrados):{" "}
                <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control border border-terciary rounded-pill px-3"
                placeholder="Ingresa medida para el área de propagación"
                {...register("Areapro", { required: true })}
              />
              {errors.nombreVivero && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
            </div>
            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Área de producción: <span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-check col-12 col-md-1 mb-3">
                <label className="text-terciary form-check-label ">
                  Si {""}
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="radioBoton"
                    id="radioBotonSi"
                  />
                </label>
              </div>

              <div className="form-check col-12 col-md-1 mb-3">
                <label className="text-terciary form-check-label ">
                  No {""}
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="radioBoton"
                    id="radioBotonNo"
                  />
                </label>
              </div>
              {errors.radioBoton && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
            </div>

            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Área de preparacion de sustrato:{" "}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-check col-12 col-md-1 mb-3">
                <label className="text-terciary form-check-label ">
                  Si {""}
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="radioBoton2"
                    id="radioBotonSiProd"
                  />
                </label>
              </div>

              <div className="form-check col-12 col-md-1 mb-3">
                <label className="text-terciary form-check-label ">
                  No {""}
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="radioBoton2"
                    id="radioBotonNoProd"
                  />
                </label>
              </div>
              {errors.radioBoton2 && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
            </div>

            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Área de embolsado: <span className="text-danger">*</span>
                </label>
              </div>
              <div className="form-check col-12 col-md-1 mb-3">
                <label className="text-terciary form-check-label ">
                  Si {""}
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="radioBoton"
                    id="radioBotonSi"
                  />
                </label>
              </div>

              <div className="form-check col-12 col-md-1 mb-3">
                <label className="text-terciary form-check-label ">
                  No {""}
                  <input
                    className="form-check-input ms-2"
                    type="radio"
                    name="radioBoton"
                    id="radioBotonNo"
                  />
                </label>
              </div>
              {errors.radioBoton && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
            </div>

            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">
                  Vivero creado por medio de:{" "}
                  <span className="text-danger">*</span>
                </label>

                <Select
                  options={optionViveroCreados}
                  placeholder="Seleccione"
                  required={true}
                />

                {errors.viveroCreado && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>
            </div>

            <Subtitle title="Asignar viverista" mt={3} mb={2} />

            <div className="row ms-1 mt-2">
              <div className="col-12 col-md-3">
                <label className="text-terciary">
                  Tipo de Documento: <span className="text-danger">*</span>{" "}
                </label>
                <Select
                  name="options"
                  // control={control2}
                  // rules={{ required: true }}
                  // render={({ field }) => (

                  //  {...field}
                  // options={opcDoc}
                  placeholder="Seleccionar"
                />
              </div>
              <div className="col-12 col-md-3">
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
              <div className="col-12 col-md-3">
                <label className="ms-2 text-terciary">
                  Nombre: <span className="text-danger">*</span>{" "}
                </label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="Nombre de funcionario"
                  disabled={true}
                  {...register("Nombre")}
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
                {/* </div>
              <div className="col-6 col-sm-3 mt-2"> */}
                <button
                  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill ms-3 mt-4 btn-min-width"
                  style={{ width: "300px", height: "45px" }}
                  onClick={handleOpenModalAvanzadaModal}
                >
                  Busqueda avanzada
                </button>
              </div>
            </div>

            <div className="row ms-1 mb-4" style={{ display: "flex" }}>
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary fs-bold">
                  Fecha de inicio de viverista:{" "}
                  <span className="text-danger">*</span>
                </label>
              </div>
              <div className="col-12 col-md-3 mb-3">
                <Controller
                  name="fechaNacimiento"
                  control={control}
                  render={({ field }) => (
                    <ReactDatePicker
                      {...field}
                      locale="es"
                      className="form-control border rounded-pill px-3 border border-terciary col-12 col-md-3"
                      dateFormat="dd/MM/yyyy"
                      placeholderText="dd/mm/aaaa"
                      // selected={formValues.fechaIngreso}
                      // onSelect={(e) =>
                      // setFormValues({ ...formValues, fechaIngreso: e })
                      // }
                    />
                  )}
                />
              </div>
            </div>

            <div className="row" style={{justifyContent:"center"}}>
              <div className="col-3" style={{textAlign:"center"}}>
            <button  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill ms-3 mt-4 btn-min-width" >Realizar apertura</button>
            </div>
            </div>

            <div className="row d-flex align-items-center mx-2 mt-2" style={{justifyContent:"space-between"}}>
              <div className="col-12 col-md-3 mb-3">
               <button className="btn btn-danger text-capitalize border rounded-pill ms-3 mt-4 btn-min-width">Desativar vivero</button>
               <div className="row ms-3">
            <div className="card col-5 col-md-auto" style={{backgroundColor:"#f7d7d8", flexBasis:"content", height:"100px"}}>
            <div className="mt-3 ms-3">
              <label style={{color:"#84454a"}}>  <i className="fa-solid fa-triangle-exclamation me-3" style={{color:"#c02b1b"}}></i>Este vivero se encuentra desactivado</label> 
            </div>
            <div style={{display:"flex"}}>
              <div >
              {/* </div>
              <div className="col-4"> */}
              <button  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill ms-3 mt-1 btn-min-width">Reactivar</button>
              </div>
            </div>
            </div>
            </div>
              
              </div>
              <div className="col-12 col-md-3 mb-3 mt-5">
              <label className="text-terciary">
                  Anexar Documentación <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFileMultiple"
                  multiple
                />
              </div>
            </div>
            <div className="row mt-5">
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
              
                title="Limpiar"
              >
              <i className="fa-solid fa-eraser fs-3"></i>
              </button>
              <button
                className="btn border rounded-pill mt-2 px-3 ms-2"
                
                title="Cancelar"
              >
              <i className="fa-solid fa-x fs-3"></i>
              </button>
              <button
                className="btn border rounded-pill mt-2 px-3 ms-2"
                
                title="Consultar"
              >
              <i className="fa-brands fa-readme fs-3"></i>
              </button>
              <button
                className="btn border rounded-pill mt-2 px-3 ms-2"
                
                title="Imprimir"
              >
             <i className="fa-solid fa-print fs-3"></i>
              </button>
              <button
                className="btn border rounded-pill mt-2 px-3 ms-2"
                
                title="Borrar"
              >
             <i className="fa-regular fa-trash-can fs-3"></i>
              </button>
              </div>
            </div>
          </form>
        </div>
        <BusquedaAvanzadaModal
          isModalActive={modalPersonal}
          setIsModalActive={setModalPersonal}
        />
      </div>
    </div>
  );
}

export default AdministrarViveroScreen;

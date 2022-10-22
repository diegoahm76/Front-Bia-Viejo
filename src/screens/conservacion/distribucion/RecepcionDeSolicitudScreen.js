import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  activeModalAction,
  desactiveModalAction,
} from "../../../actions/modalActions";
import { useDispatch } from "react-redux";
import CalendarModal from "../../../components/CalendarModal";
import ModalLocal from "../../../components/ModalLocal";


const RecepcionDeSolicitudScreen = () => {
  const [selectedEstadoSolicitud, setSelectedEstadoSolicitud] = useState({});
  const opcEstado = [
    { label: "Pendientes", value: "PEND" },
    { label: "Gestionadas", value: "GEST" },
  ];

const [modal2, setModal2] = useState(false)

  const [estado, setEstado] = useState({
    options: "",
  });

  const [selectedViveros, setSelectedViveros] = useState({});
  const opcViveros = [
    { label: "Todos los viveros", value: "ALL" },
    { label: "Villavicencio", value: "VI" },
    { label: "Puerto Lopez", value: "PL" },
    { label: "San Juan de Arama", value: "SJ" },
    { label: "Puerto Rico", value: "PR" },
    { label: "La Macarena", value: "LM" },
    { label: "Mapiripan", value: "MA" },
  ];
  const [selectedViveros2, setSelectedViveros2] = useState({});
  const opcViveros2 = [
    { label: "Todos los viveros", value: "ALL" },
    { label: "Villavicencio", value: "VI" },
    { label: "Puerto Lopez", value: "PL" },
    { label: "San Juan de Arama", value: "SJ" },
    { label: "Puerto Rico", value: "PR" },
    { label: "La Macarena", value: "LM" },
    { label: "Mapiripan", value: "MA" },
  ];
  const [vivero, setVivero] = useState({ optionsvi: "" });

  const [vivero2, setVivero2] = useState({ optionsvi2: "" });

  const [selectedProfesional, setSelectedProfesional] = useState({});
  const opcProfesional = [
    { label: "Todos los profesionales", value: "TP" },
    { label: "Profesional", value: "PRO" },
  ];

  const [selectedProfesional2, setSelectedProfesional2] = useState({});
  const opcProfesional2 = [
    { label: "Todos los profesionales", value: "TP" },
    { label: "Profesional", value: "PRO" },
  ];

  const [profesional, setProfesional] = useState({ opcProfesional: "" });

  const [profesional2, setProfesional2] = useState({ opcProfesional2: "" });

  const submit = (data) => {
    setEstado({ options: data.options });
  };
  const submitpro = (data) => {
    setProfesional({ opcProfesional: data.opcProfesional });
  };
  const submitvivero = (data) => {
    setVivero({ opcViveros: data.opcViveros });
  };

  const submitpro2 = (data) => {
    setProfesional2({ opcProfesional2: data.opcProfesional2 });
  };
  const submitvivero2 = (data) => {
    setVivero2({ opcViveros2: data.opcViveros2 });
  };

  const [datosFilasSinGEstionar] = useState([
    {
      numSolicitud: "000960",
      profesional: "Porfesional Meta Verde",
      vivero: "Villavicencio",
      fechaSolicitud: Date,
    },
  ]);

  const [datosFilasGestionadas] = useState([
    {
      numSolicitud: "000960",
      profesional: "Porfesional Meta Verde",
      vivero: "Villavicencio",
      fechaSolicitud: Date,
      estado: "Aceptada",
    },
  ]);
  const columnaSolicitudesSinGestionar = [
    { headerName: "Numero de solcitud", field: "numSolicitud", minWidth:150 },
    { headerName: "Profesional", field: "profesional" },
    { headerName: "Vivero", field: "vivero" },
    { headerName: "Fecha solicitud", field: "fechaSolicitud" },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn btn-2 btn-primary"
            type="button"
            onClick={handleOpenModalGes}
          >
            Gestionar
          </button>
        </div>
      ),
    },
  ];

  const columnSolicitudesGestionadas = [
    { headerName: "Numero de solcitud", field: "numSolicitud"},
    { headerName: "Profesional", field: "profesional" },
    { headerName: "Vivero", field: "vivero" },
    { headerName: "Fecha solicitud", field: "fechaSolicitud" },
    { headerName: "Estado de la solicitud", field: "estado" },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn btn-2 btn-primary"
            type="button"
            onClick={handleOpenModalVer}
          >
            Ver
          </button>
        </div>
      ),
    },
  ];

  let gridApi;
  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: false,
  };
  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit:handleSubmit2,
    control:control2,
    formState: { errors:errors2 },
  } = useForm();

 

  const dispatch = useDispatch();

  const handleOpenModalVer = () => {
    dispatch(activeModalAction());
  };

  const handleCloseModalVer = () => {
    dispatch(desactiveModalAction());
  };

  const handleOpenModalGes = () => {
    setModal2(true)
  };

  const handleCloseModalGes = () => {
    setModal2(false)
  };

  /////////////////

  const [datosFilas] = useState([
    {
      nombre: "yopo",
      cantidad: 500,
      profesional: "Profesional Meta Verde",
      vivero: "Villavicencio",
      fechaSolicitud: Date,
    },
    {
      nombre: "pomarroso",
      cantidad: 600,
      profesional: "Profesional Meta Verde",
      vivero: "Villavicencio",
      fechaSolicitud: Date,
    },
    {
      nombre: "ceiba",
      cantidad: 1500,
      profesional: "Profesional Meta Verde",
      vivero: "Villavicencio",
      fechaSolicitud: Date,
    },
  ]);

  const columnasHeader = [
    { headerName: "Material", field: "nombre", minWidth:150 },
    { headerName: "Cantidad", field: "cantidad", minWidth:150 },
    { headerName: "Vivero", field: "vivero", minWidth:150 },
    { headerName: "Profesional", field: "profesional", minWidth:150 },
    { headerName: "Fecha solicitud", field: "fechaSolicitud", minWidth:150 },
  ];

  const defaultColNom = {
    sortable: true,
    
    flex: 1,
    filter: true,
    floatingFilter: false,
    suppressMovable: true,
  };

  

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Gestion de solicitudes de material vegetal
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <div className="row mt-3 mb-5">
            <div className="col-12 col-md-4">
              <label className="form-control ms-2">
                Estado de la solicitud:{" "}
              </label>
              <Controller
                name="options"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={opcEstado}
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
            <div className="col-12 col-md-4">
              <button
                className="mt-5 btn btn-primary text-capitalize "
                type="submit"
              >
                Buscar
              </button>
            </div>
          </div>

          {estado.options.value === "PEND" ? (
            <div>
              <div className="row mt-1">
                <h4 className="mt-1 mb-2 text-center mb-1   ">
                  Solicitudes pendientes
                </h4>
                
                  <div className="row mt-3">
                    <div className="col-12 col-md-4">
                      <label >Seleccionar vivero: </label>
                      <Controller
                        name="optionsvi"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={opcViveros}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                      {errors.optionsvi && (
                        <p className=" form-control ms-0 text-danger">
                          Este campo es obligatorio
                        </p>
                      )}
                    </div>
                  
                    <div className="col-12 col-md-4">
                      <label>Seleccionar profesional</label>
                      <Controller
                        name="optionspro"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={opcProfesional}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                      {errors.optionspro && (
                        <p className=" form-control ms-0 text-danger">
                          Este campo es obligatorio
                        </p>
                      )}
                    </div>

                    <div className="col-12 col-md-4">
              <button
                className="mt-4 btn btn-primary text-capitalize "
                type="submit"
              >
                Buscar
              </button>
            </div>
                  </div>
                
               
              </div>

              <div className="row mt-6">
                <label className="px-6">Solicitudes relacionadas</label>
                <div
                  className="ag-theme-alpine mt-1 mb-6 px-6"
                  style={{ height: "250px" }}
                >
                  <AgGridReact
                    columnDefs={columnaSolicitudesSinGestionar}
                    rowData={datosFilasSinGEstionar}
                    debounceVerticalScrollbar={true}
                    rowSelection={"single"}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {estado.options.value === "GEST" ? (
            <div>
              <div className="row mt-1">
                <h4 className="mt-1 mb-2 text-center mb-1   ">
                  Solicitudes pendientes
                </h4>
                <div className="row mt-1">
                    <div className="col-12 col-md-4">
                      <label className="px-6">Seleccionar vivero: </label>
                      <Controller
                        name="optionsvi2"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={opcViveros2}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                      {errors.optionsvi2 && (
                        <p className=" form-control ms-0 text-danger">
                          Este campo es obligatorio
                        </p>
                      )}
                    </div>
                  
                    <div className="col-12 col-md-4 ">
                      <label>Seleccionar profesional</label>
                      <Controller
                        name="optionspro2"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={opcProfesional2}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                      {errors.optionspro2 && (
                        <p className=" form-control ms-0 text-danger">
                          Este campo es obligatorio
                        </p>
                      )}
                    </div>

                        <div className="col-12 col-md-4 mt-4">
                      <button
                        className="btn btn-primary text-capitalize "
                        type="submit"
                      >
                        Buscar
                      </button>
                    </div>
                  </div>
              </div>

              <div className="row mt-6">
                <label className="px-6">Solicitudes relacionadas</label>
                <div
                  className="ag-theme-alpine mt-1 mb-6 mb-2 px-6"
                  style={{ height: "250px" }}
                >
                  <AgGridReact
                    columnDefs={columnSolicitudesGestionadas}
                    rowData={datosFilasGestionadas}
                    debounceVerticalScrollbar={true}
                    rowSelection={"single"}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </form>
          <ModalLocal localState={modal2}>
          <div className="row min-vh-100">
            <div className="col-lg-12 col-md-10 col-sm-12 mx-auto">
              <h5 className="mt-3 mb-0 text-center mb-3">
                Gestion de solicitudes de material vegetal
              </h5>
              <form
                className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
                data-animation="FadeIn"
                onSubmit={handleSubmit2(submit)}
              >
                
                  <div className="row mt-1 ms-5">
                    <label>Solicitud numéro: 000960</label>
                  </div>
                  <div className="row mt-3 ms-5">
                    <label>Documento relacionado: </label>
                  </div>
                  <div className="row mt-3 ms-5">
                    <label>Listado de la solicitud: </label>
                    
                    <div className="row">
                    
                    <div
                      className="ag-theme-alpine mt-1 mb-6 mb-2 px-1"
                      style={{ height: "250px" }}
                    >
                      <AgGridReact
                        columnDefs={columnasHeader}
                        rowData={datosFilas}
                        debounceVerticalScrollbar={true}
                        rowSelection={"single"}
                        defaultColDef={defaultColNom}
                        onGridReady={onGridReady}
                      ></AgGridReact>
                    </div>

                    </div>
                  </div>
                  <div className="row">
                    <div className="justify-content-end"
                    style={{display:"flex"}}>
                      <button
                        className="btn btn-primary text-capitalize"
                        type="button"
                        onClick={handleCloseModalGes}
                      >
                        Regresar
                      </button>
                      <button
                        className="ms-2 btn btn-danger text-capitalize"
                        type="button"
                      >
                        Rechazar
                      </button>

                      <button
                        className="ms-2 btn btn-secondary text-capitalize "
                        type="submit"
                      >
                        Aceptar
                      </button>
                    </div>
                  </div>
                
              </form>
            </div>
          </div>
        </ModalLocal>
        <CalendarModal>
        <div className="row min-vh-100">
            <div className="col-lg-12 col-md-10 col-sm-12 mx-auto">
              <h5 className="mt-3 mb-0 text-center mb-3">
                Ver Solicitudes de Material Vegetal
              </h5>
              
                
                  <div className="row mt-1 ms-5">
                    <div className="col ">
                      <label>Solicitud numéro: 000960</label>
                    </div>
                    <div className="col-6">
                      <label>Estado de la solicitiud: Aceptada</label>
                    </div>
                  </div>
                  <div className="row mt-3 ms-5">
                    <label>Documento relacionado: </label>
                  </div>
                  <div className="row mt-3 ms-5">
                    <label>Listado de la solicitud: </label>
                    <div
                      className="ag-theme-alpine mt-1 mb-6 mb-2"
                      style={{ height: "250px" }}
                    >
                      <AgGridReact
                        columnDefs={columnasHeader}
                        rowData={datosFilas}
                        debounceVerticalScrollbar={true}
                        rowSelection={"single"}
                        defaultColDef={defaultColNom}
                        onGridReady={onGridReady}
                      ></AgGridReact>
                    </div>
                  </div>
                  <div className="row mt-2" style={{    display: "flex",
    justifyContent: "flex-end"}}>
                    <button
                      className="me-3 btn btn-primary text-capitalize justify-content-end"
                      type="button"
                      style={{ display:"flex",width:"80px" }}
                      onClick={handleCloseModalVer}
                    >
                      Volver
                    </button>
                  </div>
                
              
            </div>
          </div>
        </CalendarModal> 
      </div>
    </div>
  );
};
export default RecepcionDeSolicitudScreen;
//import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MarcaDeAgua1 from "../../../../components/MarcaDeAgua1";
import Subtitle from "../../../../components/Subtitle";
import { Button, Card } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import BusquedaArticuloModal from "../../../../components/BusquedaArticuloModal";

const options = [
  { label: "Platón", value: "PL" },
  { label: "Cabina", value: "CA" },
  { label: "Otros", value: "OT" },
];

const onSubmit = (data) => {
  console.log(data);
};

const HojaDeVidaVehiculoScreen = () => {
  const [busquedaArticuloModalOpen, setBusquedaArticuloModalOpen] = useState(false);
  const [vehiculoEncontado, setVehiculoEncontado] = useState<boolean>(false);
  const [enCirculacion, setEnCirculacion] = useState<boolean>(true);
  const [arriendo, setArriendo] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const columnDefs = [
    { headerName: "Nombre ", field: "nmb", minWidth: 150 },
    { headerName: "Desde", field: "des", minWidth: 150 },
    { headerName: "Hasta", field: "has", minWidth: 150 },
    { headerName: "Celular", field: "cel", minWidth: 150 },
    { headerName: "Acciones", field: "acc", minWidth: 150 },
  ];
  const columnDefs2 = [
    { headerName: "Número", field: "num", minWidth: 150 },
    { headerName: "Tipo", field: "tip", minWidth: 150 },
    { headerName: "Fecha", field: "fec", minWidth: 150 },
    { headerName: "Estado", field: "est", minWidth: 150 },
    { headerName: "Responsable", field: "res", minWidth: 150 },
  ];
  const rowData = [
    {
      nmb: "Oliver Amaya",
      des: "12/08/2011",
      has: "19/05/2020",
      cel: "320876354",
      acc: "",
    },
    {
      nmb: "Oliver Amaya",
      des: "12/08/2011",
      has: "19/05/2020",
      cel: "320876354",
      acc: "",
    },
    {
      nmb: "Oliver Amaya",
      des: "12/08/2011",
      has: "19/05/2020",
      cel: "320876354",
      acc: "",
    },
    {
      nmb: "Oliver Amaya",
      des: "12/08/2011",
      has: "19/05/2020",
      cel: "320876354",
      acc: "",
    },
    {
      nmb: "Oliver Amaya",
      des: "12/08/2011",
      has: "19/05/2020",
      cel: "320876354",
      acc: "",
    },
  ];
  const rowData2 = [
    {
      num: "01",
      tip: "Correctivo",
      fec: "19/05/2020",
      est: "Completado",
      res: "Compuarreglo",
    },
    {
      num: "02",
      tip: "Correctivo",
      fec: "19/05/2020",
      est: "Completado",
      res: "Compuarreglo",
    },
    {
      num: "03",
      tip: "Correctivo",
      fec: "19/05/2020",
      est: "Completado",
      res: "Compuarreglo",
    },
    {
      num: "04",
      tip: "Correctivo",
      fec: "19/05/2020",
      est: "Completado",
      res: "Compuarreglo",
    },
    {
      num: "05",
      tip: "Correctivo",
      fec: "19/05/2020",
      est: "Completado",
      res: "Compuarreglo",
    },
  ];

  const defaultColDef = {
    sortable: true,
    editable: false,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: true,
    suppressMovable: true,
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Hoja de vida de un vehiculo
            </h3>
            <Subtitle title="Activo" mt={3} />

            <div className="row">
              <div className="col-12 col-lg-6  mt-3">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div>
                      <label className="ms-2 text-terciary">
                        Placa<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        {...register("serial", { required: true })}
                      />
                      {errors.serial && (
                        <p className="text-danger">Este campo es obligatorio</p>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 ">
                    <div>
                      <label className="ms-2 text-terciary">
                        Nombre del activo<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        placeholder="Nombre del activo"
                        disabled
                        {...register("tipo_de_equipo", { required: false })}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6  mt-3">
                    <label className="ms-2 text-terciary">
                      Código<span className="text-danger">*</span>
                    </label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      placeholder="Código"
                      disabled
                      {...register("codigo", { required: false })}
                    />
                  </div>

                  <div className="col-12 col-lg-6  mt-3">
                    <label className="ms-2 text-terciary">
                      Tipo de vehiculo
                    </label>
                    <Select
                      options={[
                        { label: "Carro", value: "C" },
                        { label: "Moto", value: "M" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 mt-2">
                <div className="row">
                  <div className="col-12 col-lg-6 text-center">
                    <button
                      className="btn btn-sm btn-tablas mt-8"
                      type="button"
                      onClick={() => setVehiculoEncontado(!vehiculoEncontado)}
                    >
                      <i className="fa-solid fa-magnifying-glass fs-3"></i>
                    </button>
                  </div>
                  <div className="col-12 col-lg-6 text-center">
                    <button
                      className="border rounded-pill btn bg-gradient-primary mt-8"
                      type="button"
                      title="Send"
                      onClick={() => setBusquedaArticuloModalOpen(true)}
                    >
                      Busqueda de articulo
                    </button>
                  </div>
                </div>

                {/* <div className="row">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>FOTO DEL COMPUTADOR</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div> */}
              </div>
            </div>
            {vehiculoEncontado == true ? (
              <div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3 text-center">
                    <label className="ms-2 text-terciary">En circulacion</label>
                    <br></br>
                    <button
                      className="btn btn-sm btn-tablas "
                      type="button"
                      title="Solicitudes"
                      onClick={() => setEnCirculacion(!enCirculacion)}
                    >
                      {enCirculacion == false ? (
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

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Desde</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3 text-center">
                    <label className="ms-2 text-terciary">Arrendado</label>
                    <br></br>
                    <button
                      className="btn btn-sm btn-tablas "
                      type="button"
                      title="Solicitudes"
                      onClick={() => setArriendo(!arriendo)}
                    >
                      {arriendo == false ? (
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
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Kilometraje</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Actualizado</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                </div>

                <Subtitle title="Especificaciones" mt={3} />

                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Marca</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Modelo</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Linea</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Color</label>
                    <input
                      name="ModeloEspecificaciones"
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">
                      Tipo combustible
                    </label>
                    <Select
                      options={[
                        { label: "Gasolina", value: "GS" },
                        { label: "ACPM", value: "ACPM" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Capacidad de pasajeros
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                </div>

                <Subtitle title="Informacion adicional" mt={3} />

                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Fecha de adquisición
                    </label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Número de motor</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Trasmisión</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Cilindraje</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Vigencia de garantia
                    </label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero de chasis</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Dimencion de llantas{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Capacidad de extintor{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                </div>

                <Subtitle title="Control de documentación" mt={3} />

                <div className="row ">
                  <h5 className="mt-3">Tarjeta de operción</h5>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expedición</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expiraión</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                </div>

                <div className="row ">
                  <h5 className="mt-3">SOAT</h5>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expedición</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expiraión</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                </div>
                <div className="row ">
                  <h5 className="mt-3">Revision tecnomicanica</h5>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expedición</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expiraión</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                </div>
                <div className="row ">
                  <h5 className="mt-3">Seguro todo riesgo</h5>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expedición</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expiraión</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                </div>

                <Subtitle title="Datos del conductor" mt={3} />
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Nombre completo</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">Tipo documento</label>
                    <Select
                      options={[
                        { label: "Cedula", value: "CC" },
                        { label: "NIT", value: "NIT" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero de documento</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Celular</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Correo</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Direccion</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <button
                      className="border rounded-pill btn bg-gradient-primary mt-4"
                      type="button"
                      title="Send"
                    >
                      Asignar conductor
                    </button>
                  </div>
                </div>

                <Subtitle title="Conductores anteriores " mt={3} mb={3} />
                <div className="row ">
                  <div className="col-12 mb-3">
                    <div
                      className="ag-theme-alpine mt-auto mb-3 px-auto"
                      style={{ height: "275px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        defaultColDef={defaultColDef}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="d-grid gap-2 d-lg-flex justify-content-lg-end">
                    <button
                      className="border rounded-pill px-3 btn bg-gradient-primary me-lg-2"
                      type="button"
                      title="Send"
                    >
                      Historial conductores
                    </button>
                  </div>
                </div>

                <Subtitle title="Mantenimientos" mb={3} />
                <div className="row ">
                  <div className="col-12 mb-3">
                    <div
                      className="ag-theme-alpine mt-auto mb-3 px-auto"
                      style={{ height: "275px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs2}
                        rowData={rowData2}
                        defaultColDef={defaultColDef}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="d-grid gap-2 d-lg-flex justify-content-lg-end">
                    <button
                      className="border rounded-pill px-3 btn bg-gradient-primary me-lg-2"
                      type="button"
                      title="Send"
                    >
                      Programar mantenimiento
                    </button>
                  </div>
                </div>

                <div className="d-grid gap-2 d-lg-flex justify-content-lg-end mt-3">
               
                  <button 
                  className="px-3 btn" 
                  type="button" 
                  title="Salir"
                  >
                    <i className="fa-solid fa-x fs-3"></i>
                  </button>
                  <button 
                  className="px-3 btn" 
                  type="button" 
                  title="Limpiar"
                  >
                    <i className="fa-solid fa-wand-magic-sparkles fs-3"></i>
                  </button>
                  <button 
                  className="px-3 btn" 
                  type="button" 
                  title="Guardar"
                  >
                    <i className="fa-regular fa-floppy-disk fs-3"></i>
                  </button>
                  
                </div>
              </div>
            ) : (
              ""
            )}
          </form>
          <BusquedaArticuloModal
              isModalActive={busquedaArticuloModalOpen}
              setIsModalActive={setBusquedaArticuloModalOpen}
            />
        </div>
      </div>
    </div>
    // </div>
  );
};
export default HojaDeVidaVehiculoScreen;

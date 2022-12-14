import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import Subtitle from "../../../../components/Subtitle";
import Select from "react-select";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { textChoiseAdapter } from "../../../../adapters/textChoices.adapter";
import clienteAxios from "../../../../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const HojaDeVidaActivoScreen = () => {
  const [articuloEncontrado, setArticuloEncontrado] = useState<boolean>(false);
  const [otrasAplicaciones, setOtrasAplicaciones] = useState<boolean>(false);
  const [estadoDeActio, setEstadoDeActivo] = useState([]);
  const [otrasPerisfericos, setOtrasPerisfericos] = useState<boolean>(false);

  useEffect(() => {
    const getSelectsOptions = async () => {
      try {
        const { data: estadoDeActivoData } = await clienteAxios.get(
          "/almacen/choices/estados-articulo/"
        );
        const documentosFormat = textChoiseAdapter(estadoDeActivoData);
        setEstadoDeActivo(documentosFormat);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  const navigate = useNavigate();
  const ScreenProgramarMantnimiento = () => {
    navigate(
      "/dashboard/almacen/gestion-de-inventario/programacion-mantenimiento"
    );
  };
  const ScreenHistoricoArticulo = () => {
    navigate("/dashboard/almacen/reportes/reporte-historico-activo");
  };

  const { register, control: controlBuscar, handleSubmit } = useForm();

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

  const defaultColDef2 = {
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

  let gridApi;
  const rowData = [
    {
      NU: "01",
      TI: "Correctivo",
      FE: "19/05/2020",
      ES: "Completado",
      RE: "Compuarreglo",
    },
    {
      NU: "02",
      TI: "Correctivo",
      FE: "19/05/2020",
      ES: "Completado",
      RE: "Compuarreglo",
    },
    {
      NU: "03",
      TI: "Correctivo",
      FE: "19/05/2020",
      ES: "Completado",
      RE: "Compuarreglo",
    },
    {
      NU: "04",
      TI: "Correctivo",
      FE: "19/05/2020",
      ES: "Completado",
      RE: "Compuarreglo",
    },
  ];
  const asignacionPrestamos = [
    {
      NU: "01",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
    {
      NU: "02",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
    {
      NU: "03",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
    {
      NU: "04",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
    {
      NU: "05",
      RE: "Gina Hernandez",
      GR: "Administración",
      FEIN: "19/05/2020",
      FEFI: "13/08/2020",
      TI: "Asignacion",
    },
  ];
  const columnDefs = [
    { headerName: "Número", field: "NU", minWidth: 150 },
    { headerName: "Tipo", field: "TI", minWidth: 150 },
    { headerName: "Fecha", field: "FE", minWidth: 150 },
    { headerName: "Estado", field: "ES", minWidth: 150 },
    { headerName: "Responsable", field: "RE", minWidth: 150 },
  ];
  const columnDefs2 = [
    { headerName: "Número", field: "NU", minWidth: 150 },
    { headerName: "Responsable", field: "RE", minWidth: 150 },
    { headerName: "Grupo", field: "GR", minWidth: 150 },
    { headerName: "Fecha inicial", field: "FEIN", minWidth: 150 },
    { headerName: "Fecha final", field: "FEFI", minWidth: 150 },
    { headerName: "Tipo", field: "TI", minWidth: 150 },
  ];

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form
            className="row"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-rigth  fw-light mt-4">
              Hoja de vida de computo
            </h3>

            <Subtitle title="Activo" mt={3} />

            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">
                    Codigo<span className="text-danger">*</span>
                  </label>
                  <input
                    className="border border-terciary form-control border rounded-pill px-3"
                    type="text"
                    placeholder="Codigo"
                  />
                </div>
              </div>

              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">
                    Nombre del activo<span className="text-danger">*</span>
                  </label>
                  <input
                    className="border border-terciary form-control border rounded-pill px-3"
                    type="text"
                    placeholder="Nombre del activo"
                    disabled
                  />
                </div>
              </div>
              <div className="col-12 col-lg-3 text-center ">
                <button
                  className="btn btn-sm btn-tablas  mt-5"
                  type="button"
                  onClick={() => setArticuloEncontrado(!articuloEncontrado)}
                >
                  <i className="fa-solid fa-magnifying-glass fs-3"></i>
                </button>
              </div>
              <div className="col-12 col-lg-3 ">
                <div className="d-grid gap-2 mt-4 mx-2">
                  <button
                    className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                    type="button"
                  >
                    Búsqueda de articulo
                  </button>
                </div>
              </div>
            </div>

            {articuloEncontrado === true ? (
              <div>
                <div className="row">
                  <div className="col-12 col-lg-3">
                    <div>
                      <label className="ms-2 text-terciary">Serial</label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value={"lrtydo4567"}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Tipo de articulo
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value={"Computo"}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <Subtitle title="Caracteristicas" mt={3} />

                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Sistema operativo
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="Windows 11"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Suite ofimatica<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="Microsoft office"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Antivirus<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="McAfee"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3 mt-3 text-center">
                    <label className="ms-2 text-terciary">
                      Otros aplicativos
                    </label>
                    <br></br>
                    <button
                      className="btn btn-sm btn-tablas "
                      type="button"
                      title="Solicitudes"
                      onClick={() => setOtrasAplicaciones(!otrasAplicaciones)}
                    >
                      {otrasAplicaciones == false ? (
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
                  {otrasAplicaciones == true ? (
                    <div>
                      <div className="col-12 col-md-12 ">
                        <div className="mx-3">
                          <label className="text-terciary" htmlFor="ms-2">
                            Aplicativos
                          </label>
                          <textarea
                            className="form-control border rounded-pill px-4 border border-terciary"
                            placeholder="Observaciones"
                            value="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <Subtitle title="Especificaciones físicas" mt={3} />

                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Color
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="Negro"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Marca<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="Lenovo"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Formato<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="64px"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Modelo<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="IdeaPad 1i"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">Estado</label>
                    <Controller
                      name="tipoDocumento"
                      control={controlBuscar}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          options={estadoDeActio}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </div>

                <Subtitle title="Especificaciones técnicas" mt={3} />

                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Disco duro
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="1 TB"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Procesador<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="Core i5"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Ram<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        value="8 GB"
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3 mt-3 text-center">
                    <label className="ms-2 text-terciary">
                      Otros (perifericos y accesorios)
                    </label>
                    <br></br>
                    <button
                      className="btn btn-sm btn-tablas "
                      type="button"
                      title="Solicitudes"
                      onClick={() => setOtrasPerisfericos(!otrasPerisfericos)}
                    >
                      {otrasPerisfericos == false ? (
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
                  {otrasPerisfericos == true ? (
                    <div>
                      <div className="col-12 col-md-12 ">
                        <div className="mx-3">
                          <label className="text-terciary" htmlFor="ms-2">
                            Aplicativos
                          </label>
                          <textarea
                            className="form-control border rounded-pill px-4 border border-terciary"
                            placeholder="Observaciones"
                            value="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <Subtitle title="Mantenimientos" mt={3} mb={3} />

                <div className="row d-flex align-items-center mt-2 mx-2">
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
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn-min-width border rounded-pill px-3 btn bg-gradient-primary"
                      type="button"
                      title="Send"
                      onClick={() => ScreenProgramarMantnimiento()}
                    >
                      Programar
                    </button>
                  </div>
                </div>

                <Subtitle title="Asignaciones/prestamos" mt={3} mb={3} />
                <div className="row d-flex align-items-center mt-2 mx-2">
                  <div className="col-12 mb-3">
                    {" "}
                    <div
                      className="ag-theme-alpine mt-auto mb-3 px-auto"
                      style={{ height: "275px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs2}
                        rowData={asignacionPrestamos}
                        defaultColDef={defaultColDef2}
                      />
                    </div>
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn-min-width border rounded-pill px-3 btn bg-gradient-primary"
                      type="button"
                      title="Send"
                      onClick={() => ScreenHistoricoArticulo()}
                    >
                      Historico de archivo
                    </button>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-left col-12 col-lg-6 col-sm-6">
                    <button
                      className="border rounded-pill px-3 btn bg-gradient-primary mb-3 text-capitalize"
                      type="button"
                      title="Send"
                    >
                      Orden de la compra
                    </button>
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end col-12 col-lg-6 col-sm-6">
                    <button
                      className="border px-3 btn  text-capitalize"
                      type="button"
                      title="Salir"
                    >
                      <i className="fa-solid fa-x fs-3"></i>
                    </button>
                    <button
                      className="border  px-3 btn text-capitalize"
                      type="button"
                      title="Guardar"
                    >
                      <i className="fa-regular fa-floppy-disk fs-3"></i>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default HojaDeVidaActivoScreen;

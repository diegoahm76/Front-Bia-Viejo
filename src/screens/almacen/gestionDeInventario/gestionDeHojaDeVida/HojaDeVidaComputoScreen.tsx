import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Controller } from "react-hook-form";
import Select from "react-select";

//Components
import Subtitle from "../../../../components/Subtitle";
import SearchArticleCvModal from "../../../../components/Dialog/SearchArticleCvModal";
//Styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Card, Figure, Form } from "react-bootstrap";
//Assets
import img from "../../../../assets/svg/img_backgraund.svg"
//Interfaces
import useCvComputers from "./hooks/useCvComputers";
//Hooks
import { useAppSelector } from "../../../../store/hooks/hooks";

const HojaDeVidaComputoScreen = () => {

  // Redux State Extraction
  const { cvMaintenance } = useAppSelector((state) => state.cv);

  //Hooks
  const {
    //States
    columnDefsMaintenance,
    columnDefs2,
    columnDefsArticles,
    asignacionPrestamos,
    articuloEncontrado,
    otrasAplicaciones,
    busquedaArticuloModalOpen,
    ListMark,
    otrasPerisfericos,
    control,
    initialState,
    file,
    defaultColDef,
    errors,
    //Edita States
    setArticuloEncontrado,
    setOtrasAplicaciones,
    setOtrasPerisfericos,
    setBusquedaArticuloModalOpen,
    setFile,
    //Functions
    ScreenHistoricoArticulo,
    ScreenProgramarMantnimiento,
    handledSearch,
    onSubmit,
    register,
    handleSubmit,
    reset,
    handleUpload
  } = useCvComputers();

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
              Crear hoja de vida de cómputo
            </h3>

            <Subtitle title="Activo" mt={3} />

            <div className="row">
              <div className="col-12 col-lg-6  mt-3">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div>
                      <label className="ms-2 text-terciary">Serial<span className="text-danger">*</span></label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        {...register("doc_identificador_nro", { required: true })}
                      />
                      {errors.doc_identificador_nro && (
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
                        {...register("nombre", { required: false })}
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
                      {...register("codigo_bien", { required: false })}
                    />
                  </div>

                  <div className="col-12 col-lg-6 text-center">
                    <button
                      className="btn btn-sm btn-tablas mt-5"
                      type="button"
                      title="Buscar"
                      onClick={() => handledSearch()}
                    >
                      <i className="fa-solid fa-magnifying-glass fs-3"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-tablas mt-5"
                      type="button"
                      onClick={() => { reset(initialState); setArticuloEncontrado(false); setFile(null) }}
                      title="Limpiar"
                    ><i className="fa-solid fa-eraser fs-3"></i>
                    </button>
                  </div>
                </div>
              </div>
              {articuloEncontrado ? (
                <div className="col-12 col-lg-6">
                  <div className="row">
                    <Card style={{ width: "100%" }}>
                      <Card.Body>
                        <Figure style={{ display: "flex" }}>
                          <Figure.Image
                            style={{ margin: "auto" }}
                            width={171}
                            height={180}
                            alt="171x180"
                            src={!file ? img : URL.createObjectURL(file!)}
                          />
                        </Figure>
                        <Form.Group controlId="formFileSm" className="mb-3" style={{ margin: "auto" }}>
                          <Form.Control type="file" accept="image/*" size="sm" onChange={(e) => handleUpload(e)} />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="col-12 col-lg-6">
                  <button
                    className="border rounded-pill btn bg-gradient-primary mt-8"
                    type="button"
                    onClick={() => setBusquedaArticuloModalOpen(true)}
                  >
                    Busqueda de articulo
                  </button>
                </div>
              )}
            </div>

            {articuloEncontrado && (
              <div>
                <Subtitle title="Especificaciones físicas" mt={3} />
                <div className="row">


                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Marca
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
                            value={field.value}
                            options={ListMark}
                            placeholder="Seleccionar"
                            isDisabled={true}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">Estado</label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      disabled
                      {...register("estado", { required: false })}
                    />
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Color
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        maxLength={20}
                        {...register("color", { required: false })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Tipo de equipo
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        maxLength={20}
                        {...register("tipo_de_equipo", { required: false })}
                      />
                      <p>portatil, tablet, all-in-one</p>
                    </div>
                  </div>
                </div>

                <Subtitle title="Características" mt={3} />

                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Sistema operativo
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        maxLength={40}
                        {...register("sistema_operativo", { required: false })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Suite ofimática
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        maxLength={40}
                        {...register("suite_ofimatica", { required: false })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Antivirus
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        maxLength={40}
                        {...register("antivirus", { required: false })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3 mt-3 text-center">
                    <label className="ms-2 text-terciary">
                      Otros aplicativos
                    </label>
                    <br></br>
                    <button
                      className="btn btn-sm btn-tablas"
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
                            maxLength={255}
                            {...register("otras_aplicaciones", { required: false })}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <Subtitle title="Especificaciones técnicas" mt={3} />

                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Tipo de almacenamiento

                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        maxLength={30}
                        {...register("tipo_almacenamiento", { required: false })}
                      />
                    </div>
                    <p>disco duro, SSD, NVME</p>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Capacidad de Almcnto

                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        maxLength={20}
                        {...register("capacidad_almacenamiento", { required: false })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Procesador
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        maxLength={20}
                        {...register("procesador", { required: false })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Memoria ram
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="number"
                        {...register("memoria_ram", { required: false })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-lg-3 mt-3 text-center">
                    <label className="ms-2 text-terciary">
                      Observaciones
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

                    <div className="col-12 col-md-9 ">
                      <div className="mx-3">
                        <label className="text-terciary" htmlFor="ms-2">
                          Observaciones
                        </label>
                        <textarea
                          className="form-control border rounded-pill px-4 border border-terciary"
                          placeholder="Observaciones"
                          maxLength={255}
                          {...register("observaciones_adicionales", { required: false })}
                        />
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
                        columnDefs={columnDefsMaintenance}
                        rowData={cvMaintenance}
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

                <Subtitle title="Asignaciones" mt={3} mb={3} />
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
                        defaultColDef={defaultColDef}
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
                      Historico
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
                      className=" px-3 btn  text-capitalize"
                      type="button"
                      title="Salir"
                    >
                      <i className="fa-solid fa-x fs-3"></i>
                    </button>
                    <button
                      className=" px-3 btn text-capitalize"
                      type="submit"
                      title="Guardar"
                    >
                      <i className="fa-regular fa-floppy-disk fs-3"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
          <SearchArticleCvModal
            isModalActive={busquedaArticuloModalOpen}
            setIsModalActive={setBusquedaArticuloModalOpen}
            cod_tipo_activo='Com'
            label='Nombre'
            title="Busqueda de articulos"
            columnDefsArticles={columnDefsArticles}
          />
        </div>
      </div>
    </div>
  );
};
export default HojaDeVidaComputoScreen;

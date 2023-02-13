import React from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
//Styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Card, Figure, Form } from "react-bootstrap";
//Components
import Subtitle from "../../../../components/Subtitle";
import SearchArticleCvModal from "../../../../components/Dialog/SearchArticleCvModal";
//Hooks
import { useAppSelector } from "../../../../store/hooks/hooks";
import useCvOtherAssets from "./hooks/useCvOtherAssets";
//Assets
import img from "../../../../assets/svg/img_backgraund.svg"
import { Controller } from "react-hook-form";

const HojaDeVidaOtrosActivosScreen = () => {

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
    ListMark,
    control,
    busquedaArticuloModalOpen,
    file,
    defaultColDef,
    errors,
    initialState,
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
  } = useCvOtherAssets();

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
              Crear hoja de vida de otros activos
            </h3>
            <Subtitle title="Activo" mt={3} />
            <div className="row">
              <div className="col-12 col-lg-6  mt-3">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div>
                      <label className="ms-2 text-terciary">
                        Serial<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        {...register("doc_identificador_nro", {
                          required: true,
                        })}
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
                      title="Limpiar"
                      onClick={() => { reset(initialState); setArticuloEncontrado(false); setFile(null) }}
                    >
                      <i className="fa-solid fa-eraser fs-3"></i>
                    </button>
                  </div>
                  <div></div>
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
                <Subtitle title="Especificaciones" mt={3} />

                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">Marca</label>
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
                          />
                        )}
                      />
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
                    <label className="ms-2 text-terciary">Modelo</label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      disabled
                      {...register("modelo", { required: false })}
                    />
                  </div>
                </div>

                <Subtitle title="Características físicas" mt={3} />
                <div className="row mt-3">
                  <div>
                    <div className="col-12 col-md-12 ">
                      <label className="text-terciary" htmlFor="ms-2">
                        Descripción
                      </label>
                      <textarea
                        className="form-control border rounded-pill px-4 border border-terciary"
                        {...register("caracteristicas_fisicas", {
                          required: false,
                        })}
                      />
                    </div>
                  </div>
                </div>
                <Subtitle title="Especificaciones técnicas" mt={3} />
                <div className="row mt-3">
                  <div>
                    <div className="col-12 col-md-12 ">
                      <label className="text-terciary" htmlFor="ms-2">
                        Descripción
                      </label>
                      <textarea
                        className="form-control border rounded-pill px-4 border border-terciary"
                        {...register("especificaciones_tecnicas", {
                          required: false,
                        })}
                      />
                    </div>
                  </div>
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
            cod_tipo_activo='OAc'
            label='Nombre'
            title="Busqueda de otros activos"
            columnDefsArticles={columnDefsArticles}
          />
        </div>
      </div>
    </div>
  );
};
export default HojaDeVidaOtrosActivosScreen;

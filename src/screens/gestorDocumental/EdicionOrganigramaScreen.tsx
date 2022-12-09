//Bookstores
import * as React from 'react';
import { AgGridReact } from "ag-grid-react";
import { Controller } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import { useNavigate } from "react-router-dom";
//Hooks
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
//Components
import Subtitle from "../../components/Subtitle";
//Hooks
import useEdicionOrganigrama from "../../hooks/useEdicionOrganigrama";
//Actions
import { toFinalizeOrganigramService } from "../../services/organigram/OrganigramServices";
import { IDocumentaryGroup, ILevelFather, ILevelUnity, ITypeUnity, IUnityRoot } from '../../Interfaces/Organigrama';
import { Accordion } from 'react-bootstrap';


export const EdicionOrganigramaScreen = () => {

  // Dispatch Instance
  const dispatch = useAppDispatch();

  // navigate instance
  const navigate = useNavigate()

  // Redux State Extraction
  const { organigramCurrent, levelsOrganigram, unityOrganigram } = useAppSelector((state) => state.organigram);
  //Hooks
  const {
    //States
    columnsNivel,
    columnsUnidades,
    controlUnidades,
    defaultColDefOrganigrama,
    errorsNivel,
    errorsOrganigrama,
    errorsUnidades,
    optionNivel,
    optionRaiz,
    optionsAgrupacionD,
    optionsTipoUnidad,
    optionUnidadPadre,
    orden_nivel,
    title_nivel,
    title_unidades,
    //Edita States

    //Functions
    handleSubmitOrganigrama,
    onSubmitEditOrganigrama,
    registerOrganigrama,

    handleSubmitNivel,
    registerNivel,
    submitNivel,

    handleSubmitUnidades,
    registerUnidades,
    resetUnidades,
    setValueUnidades,
    submitUnidades,
    watchUnidades,

    onGridReady
  } = useEdicionOrganigrama()

  const setUnityRoot = (option: SingleValue<ILevelUnity>) => {
    setValueUnidades("unidadRaiz", option!.orden === 1 ? {
      label: "Si",
      value: true
    } : {
      label: "No",
      value: false
    });
    setValueUnidades('nivelUnidad', option!)
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmitOrganigrama(onSubmitEditOrganigrama)}
          id="configForm"
        >
          <h3 className="mt-3 ms-3 mb-0 text-start fw-light mb-4">
            Edición de Organigrama
          </h3>
          <div className={"row"}>
            <Subtitle title={"Detalles Organizacionales"} />
          </div>
          <div className="col-12 col-md-4 ms-3">
            <label className="text-terciary">
              Nombre: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control border rounded-pill px-3 border border-terciary"
              type="text"
              placeholder="Nombre de organigrama"
              {...registerOrganigrama("nombre", { required: true })}
            />
            {errorsOrganigrama.nombre && (
              <p className="text-danger">Este campo es obligatorio</p>
            )}
          </div>
          <div className="col-12 col-md-4 ms-3">
            <label className="text-terciary">
              Version: <span className="text-danger">*</span>
            </label>
            <input
              className="form-control border rounded-pill px-3 border border-terciary"
              type="text"
              placeholder="Version de organigrama"
              {...registerOrganigrama("version", { required: true })}
            />
            {errorsOrganigrama.version && (
              <p className="text-danger">Este campo es obligatorio</p>
            )}
          </div>
          <div className="col-12 col-md-4 ms-3">
            <label className="text-terciary">
              Descripcion: <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control border rounded-pill px-3 border border-terciary"
              placeholder="Descripcion de organigrama"
              {...registerOrganigrama("descripcion", { required: true })}
            />
            {errorsOrganigrama.descripcion && (
              <p className="text-danger">Este campo es obligatorio</p>
            )}
          </div>
          <div className="row mt-3">
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="submit"
                className="btn btn-primary text-capitalize border rounded-pill px-3"
              >
                Editar Organigrama
              </button>
            </div>
          </div>
        </form>

        <div className="row m-0 my-3 multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <a
            className="sidenav-normal border rounded-pill px-4 mt-2 mb-2 text-white fs-5 p-1 ms-1"
            style={{
              backgroundImage: "linear-gradient(45deg, #6db227, #36a9e0)",
            }}
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="Niveles"
            href="#Niveles"
          >
            {" "}
            Niveles Organizacionales
          </a>

          <form onSubmit={handleSubmitNivel(submitNivel)}>
            <div className="row mt-3 ms-2 collapse" id="Niveles">
              <div className="col-12  col-md-4">
                <label className="text-terciary fw-bolder">Niveles</label>
                <br />
                <label className="text terciary">Nivel {orden_nivel}</label>
                <input
                  type="text"
                  className="form-control border border-terciary rounded-pill px-3"
                  placeholder="Escribe el nombre"
                  {...registerNivel("nombre", { required: "El nombre es obligatorio" })}
                />
                {errorsNivel.nombre && (
                  <p className="text-danger">{errorsNivel.nombre.message}</p>
                )}
                <button
                  type="submit"
                  className="border rounded-pill px-3 btn bg-gradient-primary my-3 text-capitalize"
                >
                  {title_nivel}
                </button>
              </div>
              <div className="col ">
                <label className="text-terciary fw-bolder">Resumen</label>
                <div id="myGrid" className="ag-theme-alpine ">
                  <div
                    className="ag-theme-alpine"
                    style={{ height: "250px", maxWidth: "600px" }}
                  >
                    <AgGridReact
                      columnDefs={columnsNivel}
                      rowData={levelsOrganigram}
                      defaultColDefOrganigrama={defaultColDefOrganigrama}
                      onGridReady={onGridReady}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>

        </div>

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmitUnidades(submitUnidades)}
          id="configForm"
        >
          <div className="row mt-3 ">
            <a
              className="border rounded-pill px-4 mt-2 mb-2 text-white fs-5 p-1 me-10 ms-1"
              style={{
                backgroundImage: "linear-gradient(45deg, #6db227, #36a9e0)",
              }}
              data-bs-toggle="collapse"
              aria-expanded="false"
              aria-controls="Unidades"
              href="#Unidades"
            >
              {" "}
              Unidades Organizacionales
            </a>

            <div className="row mt-3 ms-2 collapse" id="Unidades">
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-6 mb-3">
                  <label className="text-terciary">Código:</label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    placeholder="Escribe el codigo"
                    {...registerUnidades("codigo", { required: true })}
                  />
                  {errorsUnidades.codigo && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label className="text-terciary">Nombre:</label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    placeholder="Escribe el nombre"
                    {...registerUnidades("nombre", { required: true })}
                  />
                  {errorsUnidades.nombre && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="text-terciary">Tipo de unidad:</label>
                  <Controller
                    name="tipoUnidad"
                    control={controlUnidades}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        onChange={(option: SingleValue<ITypeUnity>) => {
                          setValueUnidades("tipoUnidad", option!);
                        }}
                        options={optionsTipoUnidad.map((item) => (item.value !== 'LI' && unityOrganigram.length === 0 ? { ...item, isDisabled: true } : { ...item, isDisabled: false }))}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errorsUnidades.tipoUnidad && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label className="text-terciary">Nivel de la unidad:</label>
                  <Controller
                    name="nivelUnidad"
                    control={controlUnidades}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        onChange={(option: SingleValue<ILevelUnity>) => setUnityRoot(option)}
                        options={optionNivel}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errorsUnidades.nivelUnidad && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-6 mb-3">
                  <label className="text-terciary">Unidad Raíz:</label>
                  <Controller
                    name="unidadRaiz"
                    control={controlUnidades}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isDisabled={true}
                        value={field.value}
                        options={optionRaiz}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errorsUnidades.unidadRaiz && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="text-terciary">
                    Agrupación documental:
                  </label>
                  <Controller
                    name="agrupacionDocumental"
                    control={controlUnidades}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        onChange={(option: SingleValue<IDocumentaryGroup>) => {
                          setValueUnidades('agrupacionDocumental', option!)
                        }}
                        options={optionsAgrupacionD}
                        // options={optionsAgrupacionD.map((item) => (item.value !== 'SEC' && unityOrganigram.length === 0 ? { ...item, isDisabled: true } : { ...item, isDisabled: false }))}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-6 mb-3">
                  <label className="text-terciary">Unidad padre:</label>
                  <Controller
                    name="nivelPadre"
                    control={controlUnidades}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        onChange={(option: SingleValue<ILevelFather>) => {
                          setValueUnidades('nivelPadre', option!)
                        }}
                        options={optionUnidadPadre}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div
                  className="ag-theme-alpine mb-3 "
                  style={{ height: "225px" }}
                >
                  <AgGridReact
                    columnDefs={columnsUnidades}
                    rowData={unityOrganigram}
                    defaultColDefOrganigrama={defaultColDefOrganigrama}
                    onGridReady={onGridReady}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-light text-capitalize border rounded-pill px-3"
                onClick={() => navigate('/dashboard/gestordocumental/organigrama/crearorganigrama')}
              >
                Regresar
              </button>

              <button
                type="submit"
                className="btn btn-primary text-capitalize border rounded-pill px-3"
              >
                {title_unidades}
              </button>
              <button
                type="button"
                className="btn btn-primary text-capitalize border rounded-pill px-3"
                onClick={() => dispatch(toFinalizeOrganigramService(String(organigramCurrent.id_organigrama), navigate))}
              >
                Finalizar Organigrama
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
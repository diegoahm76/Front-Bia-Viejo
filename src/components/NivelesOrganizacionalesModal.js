import Modal from "react-modal";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Subtitle from './Subtitle'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const rowData = [
  { latitud: "jobo", longitud: "spondias mombin L.", accion: "" },
  { latitud: "jobo", longitud: "spondias mombin L.", accion: "" },
];

const optionRaiz = [
  { label: "Si", value: "Si" },
  { label: "No", value: "No" },
];

const optionLevel = [
  { label: "Nivel 1", value: "N1" },
  { label: "Nivel 2", value: "N2" },
  { label: "Nivel 3", value: "N3" },
];

const optionGroup = [
  { label: "Sección", value: "SE" },
  { label: "Subsección", value: "SU" },
];

const options = [
  { label: "De linea", value: "Li" },
  { label: "De apoyo", value: "Ap" },
  { label: "De soporte", value: "So" },
];

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
  },
};

Modal.setAppElement("#root");

const BusquedaArticuloModal = ({ isModalActive, setIsModalActive }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => { };

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

  let gridApi;

  const columnDefs = [
    { headerName: "Código", field: "CO" },
    { headerName: "Nombre", field: "NO" },
    {
      headerName: "Acción", field: "accion", cellRendererFramework: (params) => (
        <div className="col-12 ">
          <button className=" border rounded-pill px-3 btn btn-danger me-md-2" type="button" title="Send">
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  return (
    <Modal
      isOpen={isModalActive}
      //onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="row min-vh-100 ">
        <div className="col-12 mx-auto">
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Unidades organizacionales
            </h3>

            <Subtitle title="Unidades" mt={3} />

            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-6 mb-3">
                <label className="text-terciary">
                  Código:
                </label>
                <input
                  type="text"
                  className="form-control border border-terciary rounded-pill px-3"
                  // placeholder="Escribe el nombre"
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
              <div className="col-12 col-md-6 mb-3">
                <label className="text-terciary">
                  Nombre:
                </label>
                <input
                  type="text"
                  className="form-control border border-terciary rounded-pill px-3"
                  // placeholder="Escribe el codigo"
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
            </div>
            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-6 mb-3">
                <label className="text-terciary">
                  Tipo de unidad:
                </label>
                <Controller
                  name="tipoUnidad"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={options}
                      placeholder="Seleccionar"
                      {...register("tipoUnidad", { required: true })}

                    />
                  )}
                />
                {errors.municipioOpcion && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label className="text-terciary">
                  Nivel de la unidad:
                </label>
                <Controller
                  name="nivelUnidad"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionLevel}
                      placeholder="Seleccionar"
                      {...register("nivelUnidad", { required: true })}

                    />
                  )}
                />
                {errors.municipioOpcion && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>
            </div>
            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-6 mb-3">
                <label className="text-terciary">
                  Agrupación documental:
                </label>
                <Controller
                  name="agrupacionDocumental"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionGroup}
                      placeholder="Seleccionar"
                      {...register("agrupacionDocumental", { required: true })}

                    />
                  )}
                />
                {errors.municipioOpcion && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label className="text-terciary">
                  Unidad padre:
                </label>
                <Controller
                  name="nivelPadre"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionLevel}
                      placeholder="Seleccionar"
                      {...register("Seleccionar", { required: true })}

                    />
                  )}
                />
                {errors.municipioOpcion && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>
            </div>
            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-6 mb-3">
                <label className="text-terciary">
                  Unidad:
                </label>
                <Controller
                  name="unidadPadre"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionLevel}
                      placeholder="Seleccionar"
                      {...register("unidadPadre", { required: true })}

                    />
                  )}
                />
                {errors.municipioOpcion && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>
              <div className="col-12 col-md-6 mb-3">
                <label className="text-terciary">
                  Unidad Raiz:
                </label>
                <Controller
                  name="unidadRaiz"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionRaiz}
                      placeholder="Seleccionar"
                      {...register("unidadRaiz", { required: true })}

                    />
                  )}
                />
                {errors.municipioOpcion && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>
            </div>
            <div className="row d-flex align-items-end mt-2 mx-2">
              <div
                className="ag-theme-alpine mb-3 "
                style={{ height: "225px" }}
              >
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                // handleAddGrid={handleAddGrid}

                ></AgGridReact>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default BusquedaArticuloModal;

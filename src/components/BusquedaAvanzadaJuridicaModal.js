import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import Swal from "sweetalert2";
import clienteAxios from "../config/clienteAxios";
import { getConfigAuthBearer } from "../helpers/configAxios";
import { getIndexBySelectOptions } from "../helpers/inputsFormat";
import { getTokenAccessLocalStorage } from "../helpers/localStorage";
import Subtitle from "./Subtitle";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
    height: "auto",
  },
};

const defaultColDef = {
  sortable: true,
  flex: 1,
  filter: true,
  wrapHeaderText: true,
  resizable: true,
  initialWidth: 200,
  autoHeaderHeight: false,
  suppressMovable: true,
};

const defaultValues = {
  primerNombre: "",
  primerApellido: "",
};

Modal.setAppElement("#root");

const BusquedaAvanzadaJuridicaModal = ({
  isModalActive,
  setIsModalActive,
  formValues,
  setFormValues,
  reset,
  tipoDocumentoOptions,
}) => {
  const [empresaSearched, setEmpresaSearched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);

  const {
    handleSubmit,
    register,
    reset: resetSearch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const accessToken = getTokenAccessLocalStorage();
    const config = getConfigAuthBearer(accessToken);

    // if (!data.razonSocial && !data.nombreComercial) {
    //   setWarning(true);
    //   setTimeout(() => {
    //     setWarning(false);
    //   }, 2000);
    //   return;
    // }
    try {
      const queryParams = `?search=${data.razonSocial ?? ""}`;
      console.log(queryParams);
      const { data: dataPersonas } = await clienteAxios(
        `personas/get-personas-juridicas/${queryParams}`,
        config
      );
      console.log(dataPersonas);
      setEmpresaSearched(dataPersonas);
    } catch (err) {
      console.log(err);
    }
  };

  const columnDefs = [
    {
      headerName: "Tipo documento",
      field: "tipo_documento.nombre",
      minWidth: 180,
    },
    {
      headerName: "Numero documento",
      field: "numero_documento",
      minWidth: 180,
    },
    {
      headerName: "Razón social",
      field: "razon_social",
      minWidth: 140,
    },
    {
      headerName: "Nombre comercial",
      field: "nombre_comercial",
      minWidth: 140,
    },
    {
      headerName: "Accion",
      field: "accion",
      cellRendererFramework: (params) => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          <div>
            <button
              className="btn btn-sm btn-tablas btn-outline-primary"
              type="button"
              title="Send"
              onClick={() => seleccionarAction(params.data)}
            >
              Seleccionar
            </button>
          </div>
        </div>
      ),
      minWidth: 150,
    },
  ];

  const seleccionarAction = (dataSearch) => {
    const {
      numero_documento,
      tipo_documento: { cod_tipo_documento },
    } = dataSearch;
    console.log(dataSearch, numero_documento, cod_tipo_documento);
    const index = getIndexBySelectOptions(
      cod_tipo_documento,
      tipoDocumentoOptions
    );
    console.log(index);
    setFormValues({ index_tipo_documento: index });
    reset({
      tipoDocumento: tipoDocumentoOptions[index],
      numeroDocumento: numero_documento,
    });
    setIsModalActive(false);
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
    resetSearch(defaultValues);
  };
  return (
    <Modal
      isOpen={isModalActive}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="row position-relative">
        <div className="col-12 mx-auto">
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="mt-2 mb-0 ms-3 mb-0">Busqueda avanzada</h3>
            <Subtitle title={"Informacion general"} mt={3} mb={3} />

            <div className="row">
              <div className="col-12 col-md-4">
                <div>
                  <label className="ms-2">
                    Razón social: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    {...register("razonSocial", { required: true })}
                  />
                </div>
                {errors.razonSocial && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              {/* <div className="col-12 col-md-4">
                <div>
                  <label className="ms-2">Nombre comercial:</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    {...register("nombreComercial")}
                  />
                </div>
              </div>
              <div className="col-12 mt-3">
                {warning && (
                  <small className="text-center text-danger">
                    Complete alguno de los datos, razón social o nombre
                    comercial
                  </small>
                )}
              </div> */}
              <div className="col-12 mt-2">
                <button
                  type="submit"
                  className="btn bg-gradient-primary text-capitalize"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Cargando...
                    </>
                  ) : (
                    "Buscar"
                  )}
                </button>
              </div>
              <div className="multisteps-form__content mt-4">
                <div>
                  <div
                    className="ag-theme-alpine mt-auto mb-2 px-4"
                    style={{ height: "470px" }}
                  >
                    <AgGridReact
                      columnDefs={columnDefs}
                      rowData={empresaSearched}
                      defaultColDef={defaultColDef}
                    ></AgGridReact>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  type="button"
                  className="btn bg-gradient-light text-capitalize"
                  disabled={loading}
                  onClick={() => handleCloseModal()}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Cargando...
                    </>
                  ) : (
                    "Cancelar"
                  )}
                </button>
              </div>
            </div>
            <p
              className="text-danger cursor-click text-capitalize position-absolute top-0 end-0 fs-4"
              onClick={() => handleCloseModal()}
            >
              <b>
                X
              </b>
            </p>
          </form>
        </div>
      </div>
    </Modal>
  );
};
export default BusquedaAvanzadaJuridicaModal;

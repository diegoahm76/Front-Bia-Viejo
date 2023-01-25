import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import clienteAxios from "../config/clienteAxios";
import { getConfigAuthBearer } from "../helpers/configAxios";
import { getIndexBySelectOptions } from "../helpers/inputsFormat";
import { getTokenAccessLocalStorage } from "../helpers/localStorage";
import useEscapeKey from "../hooks/useEscapeKey";
import Subtitle from "./Subtitle";
import botonBuscar from "../assets/iconosBotones/buscar.svg";

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

interface IBusquedaAvanzadaModal {
  isModalActive: Boolean;
  setIsModalActive: any;
  setFormValues?: any;
  setModel?: any;
  reset?: any;
  tipoDocumentoOptions?: any
}

const filters = {
  primerNombre: "",
  primerApellido: ""
}
const BusquedaAvanzadaModal = ({
  isModalActive,
  setIsModalActive,
  setModel
}: IBusquedaAvanzadaModal) => {
  const [personaSearched, setPersonaSearched] = useState([]);
  const [filtersModel, setFilters] = useState(filters)
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async () => {
    await clienteAxios(
      `personas/get-personas-naturales/`
    ).then((res) => {
      setPersonaSearched(res.data.Persona);
    }).catch(() => { });
  }

  const getUsersByQuery = async (data) => {
    const queryParams = `?primer_nombre=${data?.primerNombre ?? ""}&primer_apellido${data?.primerApellido ?? ""}`;
    await clienteAxios(
      `personas/get-personas-naturales/${queryParams}`
    ).then((res) => {
      setPersonaSearched(res.data.Persona);
    }).catch(() => {
      
     });
  }

  const onSubmit = async () => {
    getUsersByQuery(filtersModel);
  };

  const columnDefs = [
    {
      headerName: "Tipo documento",
      field: "tipo_documento.nombre",
      minWidth: 180,
    },
    {
      headerName: "Número documento",
      field: "numero_documento",
      minWidth: 180,
    },
    {
      headerName: "Primer nombre",
      field: "primer_nombre",
      minWidth: 140,
    },
    {
      headerName: "Primer apellido",
      field: "primer_apellido",
      minWidth: 140,
    },
    {
      headerName: "Acción",
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
    const busquedaAvanzadaModel = {
      tipoDocumento: { value: "", label: "" },
      cedula: "",
      nombreCompleto: "",
      idResponsable: 0
    }
    const {
      numero_documento,
      tipo_documento: { cod_tipo_documento },
      primer_apellido,
      primer_nombre,
      id_persona,
    } = dataSearch;
    const nombreCompleto = primer_nombre + " " + primer_apellido

    busquedaAvanzadaModel.cedula = numero_documento;
    busquedaAvanzadaModel.nombreCompleto = nombreCompleto;
    busquedaAvanzadaModel.idResponsable = id_persona;
    busquedaAvanzadaModel.tipoDocumento.value = cod_tipo_documento
    busquedaAvanzadaModel.tipoDocumento.label = dataSearch.tipo_documento.nombre;
    setModel(busquedaAvanzadaModel);
    setIsModalActive(false);
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
  };

  // (handleCloseModal)
  const changeValue = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filtersModel, [name]: value });
  }

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
            id="configForm"
          >
            <h3 className="mt-2 mb-0 ms-3 mb-0">Búsqueda avanzada</h3>
            <Subtitle title={"Información general"} mt={3} mb={3} />

            <div className="row align-items-end">
              <div className="col-12 col-md-4">
                <div>
                  <label className="ms-2">Primer nombre:</label>
                  <input
                    className="form-control border rounded-pill px-3 border-terciary"
                    type="text"
                    name="primerNombre"
                    onChange={changeValue}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div>
                  <label className="ms-2">Primer apellido:</label>
                  <input
                    className="form-control border rounded-pill px-3 border-terciary"
                    type="text"
                    name="primerApellido"
                    onChange={changeValue}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="mb-0 btn-image text-capitalize bg-white border boder-none"
                >
                  <i className="fa-solid fa-magnifying-glass fs-3"></i>
                </button>
              </div>
              <div className="col-12 mt-3">
                {warning && (
                  <small className="text-center text-danger">
                    Complete alguno de los datos, primer nombre o primer
                    apellido
                  </small>
                )}
              </div>
              <div className="multisteps-form__content mt-4">
                <div>
                  <div
                    className="ag-theme-alpine mt-auto mb-2 px-4"
                    style={{ height: "470px" }}
                  >
                    <AgGridReact
                      columnDefs={columnDefs}
                      rowData={personaSearched}
                      defaultColDef={defaultColDef}
                    ></AgGridReact>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  type="button"
                  className="btn bg-white text-capitalize"
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
                    <i className="fa-solid fa-x fs-3" title="Cancelar"></i>
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
export default BusquedaAvanzadaModal;

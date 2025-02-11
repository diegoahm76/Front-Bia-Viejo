import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import clienteAxios from "../config/clienteAxios";
import { getConfigAuthBearer } from "../helpers/configAxios";
import { getIndexBySelectOptions } from "../helpers/inputsFormat";
import { getTokenAccessLocalStorage } from "../helpers/localStorage";
import botonCancelar from "../assets/iconosBotones/cancelar.svg";
import botonBuscar from "../assets/iconosBotones/buscar.svg";
import Subtitle from "./Subtitle";
import useEscapeKey from "../hooks/useEscapeKey";
import Swal from "sweetalert2";

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
interface IDataUsuarios {
  Usuario: [];
}
const BusquedaAvanzadaUsuarioModal = ({
  isModalActive,
  setIsModalActive,
  formValues,
  setModel,
  setFormValues,
  reset,
  tipoDocumentoOptions,
}) => {
  const [usuarioSearched, setUsuarioSearched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const {
    handleSubmit,
    register,
    reset: resetSearch,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    const elementModalId = document.getElementById("modal-usuarios-busqueda")!;
    if (email !== "") {
      await clienteAxios.get(
        `users/get-by-email/${email}`
      ).then((response) => {
        setUsuarioSearched(response.data);
      }).catch((err) => {
        Swal.fire({
          target: elementModalId,
          position: "center",
          icon: "warning",
          title: err.response.data.detail,
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        });
      });
    } else {
      await clienteAxios.get(
        `users/get`
      ).then((response) => {
        setUsuarioSearched(response.data);
      });
    }
  };

  const seleccionarAction = (dataSearch) => {
    const busquedaAvanzadaModel = {
      tipoDocumento: { value: "", label: "" },
      cedula: "",
    }
    busquedaAvanzadaModel.cedula = dataSearch.persona.numero_documento;
    busquedaAvanzadaModel.tipoDocumento.value = dataSearch.persona.tipo_documento.cod_tipo_documento
    busquedaAvanzadaModel.tipoDocumento.label = dataSearch.persona.tipo_documento.nombre;
    setModel(busquedaAvanzadaModel);
    setIsModalActive(false);
  };

  const columnDefs = [
    {
      headerName: "Tipo documento",
      field: "persona.tipo_documento.nombre",
      minWidth: 180,
    },
    {
      headerName: "Número documento",
      field: "persona.numero_documento",
      minWidth: 180,
    },
    {
      headerName: "Email",
      field: "persona.email",
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

  const handleCloseModal = () => {
    setIsModalActive(false);
    resetSearch(defaultValues);
  };

  useEscapeKey(handleCloseModal)
  return (
    <Modal
      id="modal-usuarios-busqueda"
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
                  <label className="ms-2">
                    Email:
                  </label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                </div>
                {errors.email && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-4 mt-2">
                <button
                  type="button"
                  className="mb-0 btn-image text-capitalize bg-white border boder-none"
                  onClick={onSubmit}
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
                    <i className="fa-solid fa-magnifying-glass fs-3" title="Buscar"></i>
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
                      rowData={usuarioSearched}
                      defaultColDef={defaultColDef}
                    ></AgGridReact>
                  </div>
                </div>
              </div>
              {/* <div className="d-flex justify-content-end gap-2 mt-3">
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
              </div> */}
            </div>
            <p
              className="text-danger cursor-click text-capitalize position-absolute top-0 end-0 fs-4"
              onClick={() => handleCloseModal()}
            >
              <img src={botonCancelar} alt="" />
            </p>
          </form>
        </div>
      </div>
    </Modal>
  );
};
export default BusquedaAvanzadaUsuarioModal;

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
  setFormValues,
  reset,
  tipoDocumentoOptions,
}) => {
  const [usuarioSearched, setUsuarioSearched] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset: resetSearch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    ;
    const accessToken = getTokenAccessLocalStorage();
    const config = getConfigAuthBearer(accessToken);

    try {
      await clienteAxios.get<IDataUsuarios>(
        `users/get-by-email/${data.email}/`,
        config
      ).then((response) => {
        debugger
        const datos = response.data;
        if (datos.Usuario) {
          // REVISAR
          // setUsuarioSearched([datos.Usuario]);
        } else {
          setUsuarioSearched([]);
        }
      });

    } catch (err) {
      console.log(err);
    }
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

  const seleccionarAction = (dataSearch) => {
    const {
      numero_documento,
      tipo_documento: { cod_tipo_documento },
    } = dataSearch.persona;
    const index = getIndexBySelectOptions(
      cod_tipo_documento,
      tipoDocumentoOptions
    );
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

  useEscapeKey(handleCloseModal)
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
            <h3 className="mt-2 mb-0 ms-3 mb-0">Búsqueda avanzada</h3>
            <Subtitle title={"Información general"} mt={3} mb={3} />

            <div className="row align-items-end">
              <div className="col-12 col-md-4">
                <div>
                  <label className="ms-2">
                    Email: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    {...register("email", { required: true })}
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
                  type="submit"
                  className="mb-0 btn-image text-capitalize bg-white border boder-none"
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
                    <img src={botonBuscar} alt="" />
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
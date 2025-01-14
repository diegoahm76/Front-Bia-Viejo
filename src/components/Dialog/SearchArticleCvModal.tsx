import React, { useEffect } from "react";
import Modal from "react-modal";
import { SubmitHandler, useForm } from "react-hook-form";
import Subtitle from "../Subtitle";
import { getCvArticleAllService } from "../../services/cv/CvComputers";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { AgGridReact } from "ag-grid-react";
import { getCvArticles } from "../../store/slices/cv/indexCv";

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

interface IFormValues {
  codigo: string;
  nombre: string;
}

const SearchArticleCvModal = ({ isModalActive, setIsModalActive, cod_tipo_activo, columnDefsArticles, label, labelCode = 'Serial', title }) => {

  // Dispatch instance
  const dispatch = useAppDispatch();

  // Redux State Extraction
  const { cvArticles } = useAppSelector((state) => state.cv);

  const initialState = {
    codigo: "",
    nombre: "",
  };

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<IFormValues>({ defaultValues: initialState });

  //ueeEffect para limpiar el store
  useEffect(() => {
    clean();
  }, []);

  //Función para limpiar el store y limbia el formulario
  const clean = () => {
    dispatch(getCvArticles([]));
    reset(initialState);
  };

  //Función para enviar los datos del formulario
  const onSubmit: SubmitHandler<IFormValues> = (data: IFormValues) => {
    dispatch(getCvArticleAllService(data.codigo, data.nombre, cod_tipo_activo));
    clean();
  };

  //configuración de tabla por defecto
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
    <Modal
      isOpen={isModalActive}
      onRequestClose={() => setIsModalActive(false)}
      style={customStyles}
      className="modal"
      id="modal-article-id"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="row min-vh-100 ">
        <div className="col-12 mx-auto">
          <h3 className="fw-light mt-4 mb-2">
            {title}
          </h3>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <Subtitle title="Información del articulo" mb={3} />
              <div className="col-12 col-sm-4 mt-2">
                <div>
                  <label className="ms-3 text-terciary">{labelCode}</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder={labelCode}
                    {...register("codigo")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-4 mt-2">
                <div>
                  <label className="ms-3 text-terciary">{label}</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder={label}
                    {...register("nombre")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-4 mt-4">
                <button
                  className="btn me-md-2  text-capitalize  px-3 mt-2"
                  type="submit"
                  title="Buscar"
                >
                  <i className="fa-solid fa-magnifying-glass fs-3"></i>
                </button>
                <button
                  className="btn me-md-2 text-capitalize  px-3"
                  type="button"
                  onClick={() => clean()}
                  title="Limpiar"
                >
                  <i className="fa-solid fa-eraser fs-3"></i>
                </button>
              </div>
            </div>
            <div className="row d-flex align-items-center mt-2 mx-2">
              <div className="col-12 mb-3">
                <div
                  className="ag-theme-alpine mt-auto mb-3 px-auto"
                  style={{ height: "275px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefsArticles}
                    rowData={cvArticles}
                    defaultColDef={defaultColDef}
                  />
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </Modal>
  );
};

export default SearchArticleCvModal;

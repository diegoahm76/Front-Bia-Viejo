import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Subtitle from "../../components/Subtitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { AgGridReact } from "ag-grid-react";
import { createSeriesService, getSeriesService } from "../../services/series/SeriesServices";
import { createSubSeriesService, getSubSeriesService } from "../../services/subseries/SubSeriesServices";
import { getSerieCCDCurrent } from "../../store/slices/series/indexSeries";
import { getSubSeriesCCDCurrent } from "../../store/slices/subSeries/indexSubSeries";

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
  codigo: number | string;
  nombre: string;
  id_subserie_doc: number | null;
  id_serie_doc: number | null;
}

const CrearSeries = ({ isModalActive, setIsModalActive, title }) => {

  // Redux State Extraction
  const { seriesCCD, serieCCDCurrent } = useAppSelector((state) => state.series);
  const { subSeriesCCD, subSeriesCCDCurrent } = useAppSelector((state) => state.subSeries);
  const { CCDCurrent } = useAppSelector((state) => state.CCD);

  // Dispatch instance
  const dispatch = useAppDispatch();

  const initialState = {
    codigo: "",
    nombre: "",
    id_subserie_doc: null,
    id_serie_doc: null,
  };

  const { register, handleSubmit, reset, watch, formState: { errors }, } = useForm<IFormValues>({
    defaultValues: initialState,
  });
  const data = watch();

  const [titleButton, setTitleButton] = useState('Agregar');

  // //useEffect para limpiar el formulario
  // useEffect(() => {
  //   clean();
  // }, []);

  //useEffect para cargar los datos de la serie seleccionada
  useEffect(() => {
    if (serieCCDCurrent) {
      reset({
        codigo: serieCCDCurrent.codigo,
        nombre: serieCCDCurrent.nombre,
        id_subserie_doc: null,
        id_serie_doc: serieCCDCurrent.id_serie_doc,
      });
      setTitleButton('Actualizar');
    } else {
      reset(initialState);
      setTitleButton('Agregar');
    }
  }, [serieCCDCurrent]);

  // useEffect para cargar los datos de la subSerie seleccionada
  useEffect(() => {
    if (subSeriesCCDCurrent) {
      reset({
        codigo: subSeriesCCDCurrent.codigo,
        nombre: subSeriesCCDCurrent.nombre,
        id_subserie_doc: subSeriesCCDCurrent.id_subserie_doc,
        id_serie_doc: null,
      });
      setTitleButton('Actualizar');
    } else {
      reset(initialState);
      setTitleButton('Agregar');
    }
    return () => {
      dispatch(getSerieCCDCurrent(null));
    }
  }, [subSeriesCCDCurrent]);

  //useEffect para limpiar el store de la serie & la subserie seleccionada
  useEffect(() => {
    return () => {
      dispatch(getSerieCCDCurrent(null));
      dispatch(getSubSeriesCCDCurrent(null));
      clean();
    }
  }, [isModalActive]);

  //Función para limpiar el formulario
  const clean = () => {
    reset(initialState);
    setTitleButton('Agregar');
  };

  // Crear series
  const createSeries = () => {
    let newItem: any[] = []
    if (titleButton === 'Agregar') {
      newItem = [...seriesCCD, {
        id_serie_doc: data.id_serie_doc,
        nombre: data.nombre,
        codigo: data.codigo,
        id_ccd: CCDCurrent!.id_ccd
      }]
    } else {
      newItem = seriesCCD.map(
        item => { return item.id_serie_doc === data.id_serie_doc ? { ...item, nombre: data.nombre, codigo: Number(data.codigo) } : item }
      );
    }
    dispatch(createSeriesService(newItem, clean));
  };

  //Funcion para eliminar series
  const deleteSeries = (id_serie_doc: number) => {
    const newSeries = seriesCCD.filter(serie => serie.id_serie_doc !== id_serie_doc);
    dispatch(createSeriesService(newSeries, clean));
  }

  // Crear subseries
  const createSubSeries = () => {
    let newItem: any[] = []
    if (titleButton === 'Agregar') {
      newItem = [...subSeriesCCD, {
        id_subserie_doc: data.id_subserie_doc,
        nombre: data.nombre,
        codigo: data.codigo,
        id_ccd: CCDCurrent!.id_ccd
      }]
    } else {
      newItem = subSeriesCCD.map(
        item => { return item.id_subserie_doc === data.id_subserie_doc ? { ...item, nombre: data.nombre, codigo: data.codigo } : item }
      );
    }
    dispatch(createSubSeriesService(newItem, clean));
  };

  //Funcion para eliminar subseries
  const deleteSubSeries = (id_subserie_doc) => {
    const newSubSeries = subSeriesCCD.filter(subSeries => subSeries.id_subserie_doc !== id_subserie_doc);
    dispatch(createSubSeriesService(newSubSeries, clean));
  }

  //Función para enviar los datos del formulario
  const onSubmit: SubmitHandler<IFormValues> = () => {
    switch (title) {
      case "Crear series":
        createSeries();
        break;
      case "Crear subseries":
        createSubSeries();
        break;
      default:
        break;
    }
  };
  const colums = [
    {
      headerName: "Codigo",
      field: "codigo",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Nombre",
      field: "nombre",
      minWidth: 150,
      maxWidth: 200,
    },

    {
      headerName: "Acciones",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button className="btn text-capitalize" type="button" title="Editar"
            onClick={() => { title === "Crear series" ? dispatch(getSerieCCDCurrent(params.data)) : dispatch(getSubSeriesCCDCurrent(params.data)) }}>
            <i className="fa-regular fa-pen-to-square fs-4"></i>
          </button>
          <button
            className="btn text-capitalize "
            type="button"
            title="Eliminar"
            onClick={() => { title === "Crear series" ? deleteSeries(params.data.id_serie_doc) : deleteSubSeries(params.data.id_subserie_doc) }}
          >
            <i className="fa-regular fa-trash-can fs-4"></i>
          </button>
        </div>
      ),
    },
  ];
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
      id="modal-serie-subserie-id"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="row min-vh-100 ">
        <div className="col-12 mx-auto">
          <Subtitle title={title} mb={3} />
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <div className="col-12 col-sm-4 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Nombre</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="Nombre"
                    {...register("nombre", { required: true })}
                  />
                  {errors.nombre && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-4 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Código</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="number"
                    placeholder="Código"
                    {...register("codigo", { required: true })}
                  />
                  {errors.codigo && (
                    <p className="text-danger">Este campo es obligatorio</p>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-4 mt-4">
                <button
                  className="btn me-md-2  text-capitalize  px-3 mt-2"
                  type="submit"
                  title={titleButton}
                >
                  <i className="fa-regular fa-floppy-disk fs-3"></i>
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
                    columnDefs={colums}
                    rowData={title === "Crear series" ? seriesCCD : subSeriesCCD}
                    defaultColDef={defaultColDef}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 d-flex justify-content-end ">
              <button
                className="btn me-md-2  text-capitalize  px-3 mt-2 "
                type="submit"
                title="Cerrar"
                onClick={() => setIsModalActive(false)}
              >
                <i className="fa-solid fa-x fs-3"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default CrearSeries;

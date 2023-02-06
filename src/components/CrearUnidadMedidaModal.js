import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import IconoEditar from "../assets/iconosBotones/editar.svg";
import IconoEliminar from "../assets/iconosBotones/eliminar.svg";
import IconoGuardar from "../assets/iconosBotones/guardar.svg";
import IconoCancelar from "../assets/iconosBotones/cancelar.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  crearNuevaUnidadMedidaAction,
  eliminarUnidadMedidaAction,
  obtenerUnidadMedidaAction,
} from "../actions/unidadMedidaActions";
import Select from "react-select";
import clienteAxios from "../config/clienteAxios";
import { textChoiseAdapter } from "../adapters/textChoices.adapter";
import Axios from "axios";
import Swal from "sweetalert2";
import { UseEditUnidadMedida } from "../hooks/editUnidadMedida";
import { set } from "date-fns";
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
Modal.setAppElement("#root");

const UnidadMedidaEdit = {
  id_unidad_medida: "",
  nombre: "",
  abreviatura: "",
  magnitud: { value: "", label: "Seleccionar" },
};

function CrearUnidadMedidaModal({ isModalActive, setIsModalActive }) {
  const [botonAdministrador, setBotonAdministrador] = useState(false);
  const [magnitudesOptions, setMagnitudesOptions] = useState([]);
  const [unidadMedidaEdit, setUnidadMedidaEdit] = useState(UnidadMedidaEdit);
  const [edit, setEdit] = useState(false);

  const editarUnidad = (data) => {
    setUnidadMedidaEdit({
      nombre: data.nombre,
      abreviatura: data.abreviatura,
      id_unidad_medida: data.id_unidad_medida,
      magnitud: magnitudesOptions.find(
        (item) => item.value === data.id_magnitud
      ),
    });

    // UseEditUnidadMedida(unidadMedidaEdit);
    setEdit(true);
  };

  const changeSelect = (event) => {
    let edit = { ...unidadMedidaEdit };
    edit.magnitud = {
      value: event.value,
      label: event.label,
    };
    setValue("id_magnitud", edit.magnitud);
    setUnidadMedidaEdit(edit);
  };

  const confirmarEliminarUnidadMedida = (id_unidad_medida) => {
    Swal.fire({
      target: document.getElementById("modal-unidad-medida"),
      title: "Estas seguro?",
      text: "Una unidad de medida que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //Pasarlo al action
        dispatch(eliminarUnidadMedidaAction(id_unidad_medida));
        fetchData();
      }
    });
  };
  const {
    register,
    setError,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    if (!edit) {
      const unidadMedidaCreate = {
        ...data,
        id_magnitud: data.id_magnitud.value,
      };
      console.log("viene de accion", unidadMedidaCreate);
      dispatch(crearNuevaUnidadMedidaAction({ unidadMedidaCreate, fetchData }));
    } else {
      await Axios({
        method: "PUT",
        url: `${unidadMedidaEdit.id_unidad_medida}/`,
        data: {
          ...unidadMedidaEdit,
          id_magnitud: unidadMedidaEdit.magnitud.value,
        },
      })
        .then((response) => {
          fetchData();
          Swal.fire({
            target: document.getElementById("modal-unidad-medida"),
            position: "center",
            icon: "success",
            title: "Unidad de Medida Editada correctamente",
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch((err) => {
          Swal.fire({
            target: document.getElementById("modal-unidad-medida"),
            position: "center",
            icon: "error",
            title: err.detail,
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
          });
        });
    }
  };

  register("nombre", {
    onChange: (e) => {
      const name = { ...unidadMedidaEdit };
      name.nombre = e.target.value;
      setUnidadMedidaEdit(name);
    },
  });
  register("abreviatura", {
    onChange: (e) => {
      const abreviatura = { ...unidadMedidaEdit };
      abreviatura.abreviatura = e.target.value;
      setUnidadMedidaEdit(abreviatura);
    },
  });
  register("id_magnitud", {
    onChange: (e) => {
      const magnitud = { ...unidadMedidaEdit };
      magnitud.magnitud = e.target.value;
      setUnidadMedidaEdit(magnitud);
    },
  });
  const [unidades, setUnidades] = useState([]);
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    try {
      setBotonAdministrador(true);
      const response = await Axios({
        url: "https://backend-bia-beta-production.up.railway.app/api/almacen/unidades-medida/get-list/",
      });
      setUnidades(response.data);
      console.log("obtener lista");
    } catch (error) {
      console.log(error);
    }
  };

  const columnUnidadMedida = [
    {
      headerName: "Id unidad medida",
      field: "id_unidad_medida",
      minWidth: 150,
    },
    { headerName: "Nombre", field: "nombre", minWidth: 150 },
    { headerName: "Abreviatura", field: "abreviatura", minWidth: 150 },
    { headerName: "Magnitud", field: "id_magnitud", minWidth: 150 },
    {
      headerName: "Acciones",
      field: "acciones",
      minWidth: 140,
      cellRendererFramework: (params) => (
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm btn-tablas btn-outline-ligth "
            type="button"
            onClick={() => editarUnidad(params.data)}
          >
            <i className="fa-regular fa-pen-to-square fs-2" title="Editar"></i>
          </button>
          <button
            className="btn btn-sm btn-tablas btn-outline-ligth"
            type="button"
            onClick={() =>
              confirmarEliminarUnidadMedida(params.data.id_unidad_medida)
            }
          >
            <i className="fa-regular fa-trash-can fs-2" title="Eliminar"></i>
          </button>
        </div>
      ),
    },
  ];
  let gridApi;
  useEffect(() => {
    const getSelectsOptions = async () => {
      try {
        const { data: magnitudesNoFormat } = await clienteAxios.get(
          "almacen/choices/magnitudes/"
        );
        const magnitudesFormat = textChoiseAdapter(magnitudesNoFormat);
        setMagnitudesOptions(magnitudesFormat);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);

  useEffect(() => {
    const getUnidadMedida = async () => dispatch(obtenerUnidadMedidaAction());
    getUnidadMedida();
    console.log("unidad", getUnidadMedida);
  }, []);

  // const { unidad } = useSelector((state) => state?.unidad);
  // console.log("unidadMedida", unidad)

  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: true,
    suppressMovable: true,
  };

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  return (
    <Modal
      isOpen={isModalActive}
      style={customStyles}
      className="modal"
      id="modal-unidad-medida"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="row">
        <div className="col-12 mx-auto">
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h4>Crear unidad de medida</h4>
            <hr className="rounded-pill hr-modal" />
            <div className="row">
              <div className="col-12 col-md-6">
                <label className="text-terciary">Nombre</label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  value={unidadMedidaEdit.nombre}
                  placeholder="Nombre"
                  {...register("nombre")}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="text-terciary">Abreviatura</label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  value={unidadMedidaEdit.abreviatura}
                  placeholder="abreviatura"
                  {...register("abreviatura")}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className=" text-terciary">Magnitud</label>
                <Controller
                  name="id_magnitud"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={magnitudesOptions}
                      value={unidadMedidaEdit.magnitud}
                      placeholder="Seleccionar"
                      onChange={changeSelect}
                    />
                  )}
                />
                {errors.id_magnitud && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-primary text-capitalize border rounded-pill px-3"
                onClick={() => fetchData()}
              >
                Administrador
              </button>
              <button
                type="button"
                className="btn btn-sm btn-tablas btn-outline-ligth"
                onClick={() => setIsModalActive(false)}
                placeholder="Cancelar"
              >
                <img src={IconoCancelar} alt="cancelar" />
              </button>

              <button
                type="submit"
                className="btn btn-sm btn-tablas btn-outline-ligth"
              >
                <img src={IconoGuardar} alt="guardar" />
              </button>
            </div>
          </form>
          {botonAdministrador === true ? (
            <form>
              <div className="row">
                <div id="myGrid" className="ag-theme-alpine ">
                  <div className="ag-theme-alpine" style={{ height: "400px" }}>
                    <AgGridReact
                      columnDefs={columnUnidadMedida}
                      rowData={unidades}
                      defaultColDef={defaultColDef}
                    ></AgGridReact>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
    </Modal>
  );
}

export default CrearUnidadMedidaModal;

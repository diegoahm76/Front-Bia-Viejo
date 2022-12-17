import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import IconoEliminar from "../assets/iconosBotones/eliminar.svg";
import IconoEditar from "../assets/iconosBotones/editar.svg";
import IconoGuardar from "../assets/iconosBotones/guardar.svg";
import IconoCancelar from "../assets/iconosBotones/cancelar.svg";
import { useForm, Controller } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import Swal from "sweetalert2";
import { crearMarca } from "../store/slices/marca/indexMarca";
import clienteAxios from "../config/clienteAxios";

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

const editState = {
  id_marca:0,
  nombre:"",
  activo:false,
  item_ya_usado:false
}

function CrearMarcaModal({ isModalActive, setIsModalActive }) {
  const elementModalId = document.getElementById("modal-marca-id")!;

  const stateInterface = {
    id_marca: 0,
    nombre: "",
    activo: false,
    item_ya_usado: false,
  };

  const [stateInput, setStateInput] = useState(stateInterface);
  const [botonAdministrador, setBotonAdministrador] = useState(false);
  const [alarmaEdit, setAlarmaEdit] = useState(editState);
  const [marca, setMarca] = useState([]);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  // Form

  const handleChange = (e) => {
    const { name, value } = e.target.value;
    setStateInput({ ...stateInput, [name]: value });
  };
  const onSubmit = (data) => {
    crearMarca(data);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  register("marca", {
    onChange: (e) => {
      const marca = { ...stateInput };
      marca.nombre = e.target.value;
      setStateInput(marca);
    },
  });

  const fetchData = async () => {
    try {
      setBotonAdministrador(true);
      const response = await clienteAxios.get("almacen/marcas/get-list/");
      setMarca(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const crearMarca = async (data) => {
    if (!edit) {
      await clienteAxios
        .post("almacen/marcas/create/", data)
        .then(() => {
          fetchData();
          Swal.fire({
            target: elementModalId,
            title: "Correcto",
            text: "La Marca se agrego correctamente",
            icon: "success",
          });
        })
        .catch(() => {
          Swal.fire({
            target: elementModalId,
            icon: "error",
            title: "Hubo un error",
            text: "Hubo un error, intenta de nuevo",
          });
        });
    } else {
      const updateField = { ...stateInput };
      updateField.nombre = data.nombre;
      await clienteAxios
        .put(`almacen/marcas/update/${stateInput.id_marca}/`, updateField)
        .then(() => {
          fetchData();
          setEdit(false);
          setStateInput(stateInterface);
          Swal.fire({
            target: elementModalId,
            title: "Correcto",
            text: "La marca se agrego correctamente",
            icon: "success",
          });
        })
        .catch(() => {
          Swal.fire({
            target: elementModalId,
            icon: "error",
            title: "Hubo un error",
            text: "Hubo un error, intenta de nuevo",
          });
        });
    }
  };

  const handleCloseModal = () => {
    setIsModalActive(false);
  };

  const editarMarca = (data) => {
    setStateInput({
      id_marca: data.id_marca,
      nombre: data.nombre,
      item_ya_usado: data.item_ya_usado,
      activo: data.activo,
    });
    setValue("nombre", data.nombre);
    setEdit(true);
  };
  const confirmarEliminarMarca = (id_marca) => {
    Swal.fire({
      target: elementModalId,
      title: "Estas seguro?",
      text: "Una Marca que se elimine no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //Pasarlo al action
        eliminarMarca(id_marca);
      }
    });
  };
  const eliminarMarca = async (id_marca) => {
    await clienteAxios
      .delete(`almacen/marcas/delete/${id_marca}`)
      .then(() => {
        fetchData();
        Swal.fire({
          target: elementModalId,
          title: "Correcto",
          text: "La Marca se elimino correctamente",
          icon: "success",
        });
      })
      .catch(() => {
        Swal.fire({
          target: elementModalId,
          icon: "error",
          title: "Hubo un error",
          text: "Hubo un error, intenta de nuevo",
        });
      });
  };

  const columnDefs = [
    { headerName: "Id Marca", field: "id_marca", minWidth: 140 },
    { headerName: "Marca", field: "nombre", minWidth: 140 },

    {
      headerName: "Acciones",
      field: "acciones",
      minWidth: 140,
      cellRendererFramework: (params) => (
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm btn-tablas btn-outline-ligth"
            type="button"
            onClick={() => confirmarEliminarMarca(params.data.id_marca)}
          >
            <img src={IconoEliminar} alt="eliminar" />
          </button>

          <button
            className="btn btn-sm btn-tablas btn-outline-ligth "
            type="button"
            onClick={() => editarMarca(params.data)}
          >
            <img src={IconoEditar} alt="editar" />
          </button>
        </div>
      ),
    },
  ];
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

  return (
    <Modal
      isOpen={isModalActive}
      style={customStyles}
      className="modal"
      id="modal-marca-id"
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
            <h4>Crear Marca</h4>
            <hr className="rounded-pill hr-modal" />
            <div className="row">
              <div className="col-12 col-md-6">
                <label className="text-terciary">Nombre</label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="Nombre"
                  value={editState?.nombre}
                  onChange={handleChange}
                />
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
                      columnDefs={columnDefs}
                      rowData={marca}
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
export default CrearMarcaModal;

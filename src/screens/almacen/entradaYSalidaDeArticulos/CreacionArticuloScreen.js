import { useState } from "react";
import { useForm } from "react-hook-form";
//import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";
import Subtitle from "../../../components/Subtitle";

const CreacionArticuloScreen = () => {
  //const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMV, setSelectedMV] = useState(null);

  const options = [
    { label: "Equipos de Computo", value: "CL" },
    { label: "Vehiculo", value: "RL" },
    { label: "GPS", value: "EL" },
    { label: "Ascensor", value: "OT" },
  ];

  const opcMV = [
    { label: "PEPS", value: "PEPS" },
    { label: "PEUS", value: "PEUS" },
    { label: "Valoraion por promedio", value: "VP" },
  ];

  const optionsSize = [
    { label: "Lineal", value: "Li" },
    { label: "Hora uso", value: "Hu" },
  ];

  const {
    register,
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          //onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          {/* <!--single form panel--> */}

          <MarcaDeAgua1>
            <h3 className="mt-3 ms-3 mb-0 fw-light text-start mb-4">
              Crear Articulo Devolutivo
            </h3>
            <Subtitle title={"Datos Generales"} />

            <div className="row ms-2 mt-3 align-items-end">
              <div className="col-6 col-sm-3 ">
                <label className="form-control ms-0 text-terciary">Tipo de articulo</label>
                <Select
                  defaultValue={selectedCategory}
                  onChange={setSelectedCategory}
                  options={options}
                />
                {/* </div> */}
              </div>

              <div className="col-6 col-sm-3 ">
                <label className="text-terciary">
                  Nombre: <span className="text-danger">*</span>{" "}
                </label>
                <input
                  className="form-control border rounded-pill px-3 mt-2 border border-terciary"
                  type="text"
                  required={true}
                  placeholder="Nombre de Articulo"
                  {...register("nombre")}
                />
              </div>
              <div className="col-6 col-sm-3 ">
                <label className="text-terciary">
                  Codigo de articulo: <span className="text-danger">*</span>{" "}
                </label>
                <input
                  className="form-control border rounded-pill px-3 mt-2 border border-terciary"
                  type="text"
                  required={true}
                  placeholder="Codigo de Articulo"
                  {...register("codigo")}
                />
              </div>
              <div className="col-6 col-sm-3">
                <label className="text-terciary">
                  Porcentaje de IVA: <span className="text-danger">*</span>{" "}
                </label>
                <input
                  className="form-control border rounded-pill px-3 mt-2 border border-terciary"
                  type="text"
                  required={true}
                  placeholder="Porcentaje de IVA"
                  {...register("porcenIVA")}
                />
              </div>
            </div>
            <div className="row ms-2 mt-3 aling-items-end">
              <div className="col-6 col-sm-3 mt-3">
                <label className="mb-3 text-terciary">
                  Vida Util: <span className="text-danger">*</span>{" "}
                </label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  required={true}
                  placeholder="Vida util"
                  {...register("vidautil")}
                />
              </div>

              <div className="col-6 col-sm-3 mt-2">
                <label className="form-control ms-0">
                  Metodo de valoracion
                </label>
                <Select
                  defaultValue={selectedCategory}
                  onChange={setSelectedCategory}
                  options={opcMV}
                />
              </div>
              <div className="col-6 col-sm-3 mt-2">
                <label className="form-control ms-0">
                  Tipo de depreciacion
                </label>
                <Select
                  defaultValue={selectedSize}
                  onChange={setSelectedSize}
                  options={optionsSize}
                />
              </div>
            </div>
            <div className="row ms-2">
              <div className="col-6 col-sm-3 mt-4">
                <div className="form-check form-switch d-flex align-items-center mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label
                    className="form-check-label mb-0 ms-3 text-terciary"
                    htmlFor="rememberMe"
                  >
                    Visible en solicitudes
                  </label>
                </div>
              </div>
              <div className="col-6 col-sm-3 mt-4">
                <div className="form-check form-switch d-flex align-items-center mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label
                    className="form-check-label mb-0 ms-3 text-terciary"
                    htmlFor="rememberMe"
                  >
                    Crear hoja de vida
                  </label>
                </div>
              </div>
              <div className="col-6 col-sm-3 mt-4">
                <div className="form-check form-switch d-flex align-items-center mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label
                    className="form-check-label mb-0 ms-3 text-terciary"
                    htmlFor="rememberMe"
                  >
                    Control por unidad
                  </label>
                </div>
              </div>
            </div>

            <div
              className="button-row d-flex mt-4"
              style={{ display: "flex", justifyContent: "end" }}
            >
              <button
                className="btn bg-gradient-light text-capitalize border rounded-pill px-3"
                type="button"
                title="Cancel"
              >
                cancelar
              </button>

              <button
                className="btn bg-gradient-primary text-capitalize border rounded-pill px-3"
                type="button"
                title="Clear"
              >
                limpiar
              </button>

              <button
                className="btn bg-gradient-primary text-capitalize border rounded-pill px-3"
                type="button"
                title="Send"
              >
                Guardar
              </button>
            </div>
          </MarcaDeAgua1>
        </form>
      </div>
    </div>

    // </div>
  );
};
export default CreacionArticuloScreen;

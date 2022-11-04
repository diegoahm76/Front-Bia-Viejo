import { useState } from "react";
import { useForm } from "react-hook-form";
//import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";
import Subtitle from "../../../components/Subtitle";

const CrearArticuloConsumoScreen = () => {
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
    { label: "Kilogramo", value: "KG" },
    { label: "Unidad", value: "UN" },
    { label: "Litro", value: "L" },
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
          
         
            <MarcaDeAgua1>
            <h3 className="mt-3 ms-3 mb-0 text-start fw-light mb-4">
            Crear Articulo de Consumo
          </h3>
          <Subtitle
                  title={"Datos Genereales"}
                />
             
                <div className="row ms-2 mt-3 align-items-end">
                  <div className="col-6 col-sm-3 mt-1">
                    <label className="form-control ms-0 text-terciary">
                      Tipo de articulo
                    </label>
                    <Select
                      defaultValue={selectedCategory}
                      onChange={setSelectedCategory}
                      options={options}
                    />
                    {/* </div> */}
                  </div>

                  <div className="col-6 col-sm-3 mt-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label text-terciary"
                    >
                      Nombre:
                    </label>
                    <input
                      className="multisteps-form__input form-control border rounded-pill px-3 mt-1 border border-terciary"
                      type="text"
                    />
                  </div>
                  <div className="col-6 col-sm-3 mt-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label text-terciary"
                    >
                      Codigo articulo: <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      className="multisteps-form__input form-control border rounded-pill px-3 mt-2 border border-terciary"
                      type="text"
                    />
                  </div>

                  <div className="col-6 col-sm-3 mt-3 ">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label text-terciary"
                    >
                      Porcentaje de IVA
                    </label>
                    <input
                      className="multisteps-form__input form-control border rounded-pill px-3 mt-2 border border-terciary"
                      type="text"
                    />
                  </div>
                </div>

                <div className="row ms-2 mt-3 align-items-end">
                  <div className="col-6 col-sm-3 ">
                    <label className="form-control ms-0">
                      Metodo de valoracion
                    </label>
                    <Select
                      defaultValue={selectedCategory}
                      onChange={setSelectedCategory}
                      options={opcMV}
                    />
                  </div>
                  <div className="col-6 col-sm-3">
                    <label className="form-control ms-0">
                      Unidad de Medida
                    </label>
                    <Select
                      defaultValue={selectedSize}
                      onChange={setSelectedSize}
                      options={optionsSize}
                    />
                  </div>

                  <div className="col-6 col-sm-3 mt-4">
                    <div class="form-check form-switch d-flex align-items-center ">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                      />
                      <label
                        class="form-check-label mb-0 ms-3 text-terciary"
                        htmlFor="rememberMe"
                      >
                        Visible en solicitudes
                      </label>
                    </div>

                    <div class="form-check form-switch d-flex align-items-center">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                      />
                      <label
                        class="form-check-label mb-0 ms-3 text-terciary"
                        htmlFor="rememberMe"
                      >
                        Articulo para Vivero
                      </label>
                    </div>
                  </div>

                  <div className="col-6 col-sm-3 mt-4">
                    <div class="form-check form-switch d-flex align-items-center">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                      />
                      <label
                        class="form-check-label mb-0 ms-3 text-terciary"
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
  );
};
export default CrearArticuloConsumoScreen;

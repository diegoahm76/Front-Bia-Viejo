import { useState } from "react";
import { useForm } from "react-hook-form";
//import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

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
        <h3 className="mt-3 mb-0 text-center mb-6">
          Crear Articulo de Consumo
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          //onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <div
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
          >
            <MarcaDeAgua1>
              <h5 className="font-weight-bolder text-start text-white border rounded-pill px-3" style={{backgroundImage:"linear-gradient(45deg, #67b136, #39aad4)"}}>Datos generales</h5>
              <div className="multisteps-form__content">
                <div className="row mt-3">
                  <div className="col-12 col-md-4 mt-3">
                    <label className="form-control ms-0">
                      Tipo de articulo
                    </label>
                    <Select
                      defaultValue={selectedCategory}
                      onChange={setSelectedCategory}
                      options={options}
                    />
                    {/* </div> */}
                  </div>

                  <div className="col-12 col-md-4 mt-4">
                    
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Nombre: 
                      </label>
                      <input
                        className="multisteps-form__input form-control border rounded-pill px-3 mt-1"
                        type="text"
                      />
                    
                  </div>
                  <div className="col-12 col-md-4 mt-4">
                    
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Codigo articulo: <span className="text-danger">*</span>{" "}
                      </label>
                      <input
                        className="multisteps-form__input form-control border rounded-pill px-3"
                        type="text"
                      />
                    
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12 col-md-4 mt-3 ">
                    
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Porcentaje de IVA
                      </label>
                      <input
                        className="multisteps-form__input form-control border rounded-pill px-3 "
                        type="text"
                      />
                    
                  </div>

                  <div className="col-12 col-md-4 ">
                    <label className="form-control ms-0">
                      Metodo de valoracion
                    </label>
                    <Select
                      defaultValue={selectedCategory}
                      onChange={setSelectedCategory}
                      options={opcMV}
                    />
                    
                  </div>
                  <div className="col-12 col-md-4">
                  <label className="form-control ms-0">Unidad de Medida</label>
                  <Select
                    defaultValue={selectedSize}
                    onChange={setSelectedSize}
                    options={optionsSize}
                  />
                </div>
                </div>

              
                
                <div className="row">
                  <div className="col-12 col-md-4 mt-4">
                    <div class="form-check form-switch d-flex align-items-center mb-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                      />
                      <label
                        class="form-check-label mb-0 ms-3"
                        htmlFor="rememberMe"
                      >
                        Visible en solicitudes
                      </label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 mt-4">
                    <div class="form-check form-switch d-flex align-items-center mb-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                      />
                      <label
                        class="form-check-label mb-0 ms-3"
                        htmlFor="rememberMe"
                      >
                        Articulo para Vivero
                      </label>
                    </div>
                  </div>
                  <div className="col-12 col-md-4 mt-4">
                    <div class="form-check form-switch d-flex align-items-center mb-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                      />
                      <label
                        class="form-check-label mb-0 ms-3"
                        htmlFor="rememberMe"
                      >
                        Control por unidad
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="button-row d-flex mt-4" style={{display:"flex", justifyContent:"end"}}>
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
          </div>
        </form>
      </div>
    </div>
  );
};
export default CrearArticuloConsumoScreen;

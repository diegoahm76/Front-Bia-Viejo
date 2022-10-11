import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

export const VisualizarArticulosScreen = () => {

const [marca, setMarca] = useState({})
const opcMarca = [
    { label: "Lenovo", value: "LE" },
    { label: "ASUS", value: "AS" },
    { label: "Acer", value: "AC" },
    { label: "TOSHIBA", value: "TO" },
    {label:"HP/Hewlett Packard",value:"HP"},
];
    
    const {
        register,
        setError,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm();

      
      const submit = (data) => {
        setMarca({ options: data.options });
      };

    return (
   
<div className="row min-vh-100">
        <div className="col-lg-12 col-md-10 col-12 mx-auto">
          <h3 className="mt-3 mb-0 text-center mb-6">Visualizar articulos</h3>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
            data-animation="FadeIn"
            onSubmit={handleSubmit(submit)}
            id="configForm"
          >
            <div className="row">
            <label className="form-control ms-0 fw-bolder text-center">
                Informacion del Articulo
              </label>
             </div> 
             <div className="row">
              <div className="col-12 col-md-4 mt-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="Consecutivo"
                      {...register("businessTel")}
                    />
                    <label>Codigo:</label>
                  </div>
                </div>
                <div className="col-12 col-md-4 mt-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="Consecutivo"
                      {...register("businessTel")}
                    />
                    <label>Nombre: </label>
                  </div>
                </div>
                <div className=" col-12 col-md-4 mt-4 d-flex justify-content-end gap-4">
          <button
                type="button"
                className="btn btn-primary text-capitalize "
              >
            Ver H/V
              </button>
              <button
                type="button"
                className="btn btn-secondary text-capitalize "
              >
                Crear H/V
              </button>
              <button
                type="button"
                className="btn btn-danger text-capitalize "
              >
                Borrar
              </button>
              </div>
              
                </div>
                <div className="row">
                <div className="col-12 col-md-4 mt-4">
                <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="Consecutivo"
                      {...register("businessTel")}
                    />
                    <label>Codigo de barras / QR: </label>
                  </div>
                  </div>
                  <div className="col-12 col-md-4 mt-4">
                <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="tel"
                      placeholder="Consecutivo"
                      {...register("businessTel")}
                    />
                    <label>Serial / Placa: </label>
                  </div>
                  </div>
                  <div className="col-12 col-md-4">
                  <label className="form-control ms-0">
                    Marca:{" "}
                  </label>
                  <Controller
                    name="options"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={opcMarca}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errors.options && (
                    <p className=" form-control ms-0 text-danger">
                      Este campo es obligatorio
                    </p>
                  )}
                </div>
                </div>
                <div className="row">
                <div className="col-12 col-md-4 mt-4">
                <div className="form-floating input-group input-group-dynamic">
                    <textarea
                      className="form-control"
                      type="tel"
                      placeholder="Consecutivo"
                      {...register("businessTel")}
                    />
                    <label>Observaciones: </label>
                  </div>
                  </div>
                  </div>
<div className="row">
                  <div className="d-flex justify-content-end gap-4">
          <button
                type="button"
                className="btn btn-primary text-capitalize "
              >
            Guardar
              </button>
                  </div>
                </div>

                <div className="row">
                <label className="form-control ms-0 fw-bolder text-center">
                Articulos
              </label>
                </div>
            
      </form>
      </div>
      </div>



  )
}

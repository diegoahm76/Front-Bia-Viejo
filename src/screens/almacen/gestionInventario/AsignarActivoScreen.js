import React, { useRef, useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function AsignarActivoScreen() {
  {
    /*  DECLARAR VARIABLES  */
  }
  const [selecOpciones, setSelecOpciones] = useState({
    vivero: "",
  });

  const {register, handleSubmit, control, formState: { errors },} = useForm();
  const onSubmit = (data) => {setSelecOpciones({
      vivero: data.vivero,
    });
  };
  const [startDate, setStartDate] = useState(new Date());
  const CustomPlaceholder = ({ date, value, onChange }) => (
    <input
      style={{ border: "solid 1px black" }}
    />
  );
  

  return (
    <div className="min-vh-100">
      <div className="row">
        <div className="col col-lg-10 col-md-10 col-12 mx-auto">
          <h3 className="text-center my-4">Asignar un Activo</h3>
        </div>

        {/*  CUERPO DEL FORMULARIO  */}
        <div class="card col-lg-10 col-md-10 col-12 mx-auto">
          <form
            data-animation="FadeIn"
            className="multisteps-form__form"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <div
              className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
              data-animation="FadeIn"
            >
              <div className="my-3">
                <h5 className="font-weight-bolder border-radius-xl my-2">
                  Datos Generales
                </h5>
              </div>
            {/*  PRIMERA FILA  */}
              <div className="row justify-content-between">
                <div className="col col-5 col-md-5">                
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Consecutivo"
                        {...register("consecutivoAsignarActivo", {
                          required: true,
                        })}
                      />
                      {errors.mortalidad?.type === "required" && (
                        <small className="text-danger">
                          El campo es requerido*
                        </small>
                      )}
                      <label className="ms-2">Consecutivo</label>
                    </div>                  
                </div>
                {/*  FECHA  */}
                <div className="col col-4 col-md-4">                
                    <div className="form-floating input-group input-group-dynamic">
                    <DatePicker
                        className="border border-1 my-1 text-center align-center-stretch"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        isClearable
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="Fecha de respuesta"
                    />
                    </div>
                </div>
              </div>
              {/*  SEGUNDA FILA  */}
              <div className="row justify-content-between">
                <div className="col col-5 col-md-5">                
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Consecutivo de solicitud"
                        {...register("consecutivoSolicitud", {
                          required: true,
                        })}
                      />
                      {errors.mortalidad?.type === "required" && (
                        <small className="text-danger">
                          El campo es requerido*
                        </small>
                      )}
                      <label className="ms-2">Consecutivo de solicitud</label>
                    </div>                  
                </div>
                {/*  FECHA  */}
                <div className="col col-4 col-md-4 d-flex align-items-start">                
                    <div>
                    <input
                        className="form-control border border-1 my-2 text-center"
                        type="date"
                        placeholder="Fecha de solicitud"
                        disabled
                      />
                    </div>
                </div>
              </div>
              {/*  TERCERA FILA  */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AsignarActivoScreen;

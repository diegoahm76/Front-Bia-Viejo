import { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";

const RegistroDeMantenimientoDeVehiculo = () => {
  const { register, handleSubmit, control } = useForm();

  const [formValues, setFormValues] = useState({
    fechaNacimiento: "",
  });

  return (
    <div className="row min-vh-100">
      <div className="col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Registro de mantenimiento de vehiculo
        </h3>
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row">
            <div className="col-12 col-md-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  //required
                  placeholder="Numero de documento"
                  //{...register("numeroDocumento")}
                />
                <label className="ms-2">
                  Número de documento: <span className="text-danger">*</span>
                </label>
              </div>
              <div className="input-group input-group-dynamic flex-column col-12 col-md-4 mt-4">
                <label htmlFor="exampleFormControlInput1">
                  Fecha de nacimiento <span className="text-danger">*</span>
                </label>
                <Controller
                  name="fechaNacimiento"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      locale="es"
                      //required
                      selected={formValues.fechaNacimiento}
                      onSelect={(e) =>
                        setFormValues({ ...formValues, fechaNacimiento: e })
                      }
                      className="multisteps-form__input form-control p-2"
                      placeholderText="dd/mm/aaaa"
                    />
                  )}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegistroDeMantenimientoDeVehiculo;

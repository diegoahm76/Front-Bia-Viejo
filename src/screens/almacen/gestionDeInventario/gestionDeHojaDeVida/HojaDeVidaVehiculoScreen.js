//import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MarcaDeAgua1 from "../../../../components/MarcaDeAgua1";
import Subtitle from "../../../../components/Subtitle"


const options = [
  { label: "Platón", value: "PL" },
  { label: "Cabina", value: "CA" },
  { label: "Otros", value: "OT" },
];

const onSubmit = (data) => {
  console.log(data)
};

const HojaDeVidaVehiculoScreen = () => {
  const { register, control, handleSubmit, formState: { errors }, } = useForm();

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Hoja de vida de un vehiculo
            </h3>
            <MarcaDeAgua1>
              <Subtitle title="Activo" mt={3} />
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Codigo:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Nombre:
                  </label>
                  <input
                    name="nombreActivo"
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>

              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Placa:
                  </label>
                  <input
                    name="placaActivo"
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Tipo{" "}
                  </label>
                  <div className="col-12 ">
                    <Controller
                      name="tipoVehiculo"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={options}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <Subtitle title="Especificaciones" mt={3} />

              <div className="row d-flex align-items-center mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Marca:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Capacidad pasajeros:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("capacidadPasajeros", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Color:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Modelo:
                  </label>
                  <input
                    name="ModeloEspecificaciones"
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>

              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Linea:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Tipo de combustible:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
              </div>

              <Subtitle title="Informacion adicional" mt={3} />
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha de adquisición:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Vigencia de garantía:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Número de motor:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Organismo de transito:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Numero de chasis:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Clase de vehiculo:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Cilindraje:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Proveedor:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Transmición:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Dimension de llantas:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
              </div>

              <Subtitle title="Control de documentación" mt={3} />
              <div className="row col-12 col-md-4 ms-2">
                <Subtitle title="1) Licencia de transito" mt={3} />
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Número:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha de expedición:
                  </label>
                  <input
                    disabled
                    type="date"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
              </div>
              <div className="row col-12 col-md-4 ms-2">
                <Subtitle title="2) Seguro obligatorio" mt={3} />
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">

                  <label className="text-terciary">
                    Aseguradora:
                  </label>
                  <input

                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Número:
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha inicial:
                  </label>
                  <input
                    disabled
                    type="date"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha de vencimiento:
                  </label>
                  <input
                    disabled
                    type="date"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("nombreUsuario", { required: true })}
                  />
                </div>
              </div>

              <div className="row col-12 col-md-4 ms-2">
                <Subtitle title="3) Certificado ARM" mt={3} />
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha de realizacion:
                  </label>
                  <input
                    type="date"
                    className="form-control border border-terciary rounded-pill px-3"
                  {...register("fechaRealizacionArm", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha de vencimiento:
                  </label>
                  <input
                    type="date"
                    className="form-control border border-terciary rounded-pill px-3"
                  {...register("fechaVencimientoArm", { required: true })}
                  />
                </div>
              </div>
              <div className="row col-12 col-md-4 ms-2">
                <Subtitle title="4) Póliza todo riesgo" mt={3} />
              </div>

              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Aseguradora:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  {...register("aseguradoraPoliza", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha inicial:
                  </label>
                  <input
                    type="date"
                    className="form-control border border-terciary rounded-pill px-3"
                  {...register("fechainicialPoliza", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha final:
                  </label>
                  <input
                    type="date"
                    className="form-control border border-terciary rounded-pill px-3"
                  {...register("fechafinalPoliza", { required: true })}
                  />
                </div>
              </div>

              <Subtitle title="Datos del conductor" mt={3} />

              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  {...register("nombreUsuario", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Numero de identificación:
                  </label>
                  <input
                    type="number"
                    className="form-control border border-terciary rounded-pill px-3"
                  {...register("identificacionConductor", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Correo electrónico:
                  </label>
                  <input
                    type="email"
                    className="form-control border border-terciary rounded-pill px-3"
                  {...register("correoConductor", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Celular:
                  </label>
                  <input
                    type="number"
                    className="form-control border border-terciary rounded-pill px-3"
                  {...register("celularConductor", { required: true })}
                  />
                </div>
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Apellido:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  {...register("apellidoConductor", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Dirección:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  {...register("direccionConductor", { required: true })}
                  />
                </div>
              </div>

              <Subtitle title="Otros datos" mt={3} />
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Capacidad de extintor:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  {...register("capacidadExtintor", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Tarjeta de operación:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  {...register("tarjetaOperacion", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Extracto contrato FUEC:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  {...register("ExtractoFuec", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Certificado REV preventivo <br /> (Resolución 315/2013):
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("certificadoREVDatos", { required: true })}
                  />
                </div>
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Póliza Contractual:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("polizaContractual", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Póliza:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("polizaDatos", { required: true })}
                  />
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                <button
                  className="border rounded-pill px-3 btn bg-gradient-primary me-md-2"
                  type="button"
                  title="Send"
                >
                  Limpiar
                </button>
                <button
                  className="border rounded-pill px-3 btn bg-gradient-primary me-md-2"
                  type="button"
                  title="Send"
                >
                  Guardar
                </button>
                <button
                  className="border rounded-pill px-3 btn bg-gradient-danger "
                  type="button"
                  title="Send"
                >
                  Salir
                </button>

              </div>
            </MarcaDeAgua1>

          </form>
        </div>
      </div>
    </div>
    // </div>
  );
};
export default HojaDeVidaVehiculoScreen;

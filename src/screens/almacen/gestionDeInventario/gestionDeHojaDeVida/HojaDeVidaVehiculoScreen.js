//import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const options = [
  { label: "Platon", value: "PL" },
  { label: "Cabina", value: "CA" },
  { label: "Otros", value: "OT" },
];

const HojaDeVidaVehiculoScreen = () => {

  const {
    control,
  } = useForm();


  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Hoja de vida de un vehiculo
        </h3>
        <div className="card">
          <form className="multisteps-form__form">
            <div
              className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
              data-animation="FadeIn"
            >
              <div className="multisteps-form__content">
                <div className="row">
                  <label className="form-control ms-0 text-center">
                    <n>Activo</n>
                  </label>

                  <div className="col-12 col-sm-4">
                    <div className="form-floating input-group input-group-dynamic ">
                      <input
                        className="form-control"
                        type="text"
                        disabled="true"
                      />
                      <label className="ms-2">160064</label>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        disabled="true"
                      />
                      <label className="ms-2">Vehículo</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-4">
                    <label className="form-control ms-0 text-center mt-3 ">
                      <n>Serial</n>
                    </label>
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="form-control ms-0 text-center mt-3 ">
                      <n>Artículo</n>
                    </label>
                  </div>
                  <div className="col-12 col-sm-4"></div>

                  <div className="col-12 col-sm-4">
                    <div className="form-floating input-group input-group-dynamic ms-2">
                      <input
                        className="form-control"
                        type="text"
                        disabled="true"
                      />
                      <label className="ms-2">93rtgd</label>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Tipo de documento{" "}
                      <div className="col-12 ">
                        <Controller
                          name="tipoDocumento2"
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
                    </label>
                  </div>
                </div>

                <div className="row mb-2 ">
                  <label className="form-control ms-0 text-left mt-3 ms-3">
                    <n>Especificaciones</n>
                  </label>
                  <div className="row">
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center mt-1 ">
                        <n>Marca:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Modelo:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Capacidad pasajeros:</n>
                      </label>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Marca</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Modelo</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Capacidad pasajeros</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center mt-1 ">
                        <n>Linea:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Color:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Tipo de combustible:</n>
                      </label>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Linea</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Color</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Tipo de combustible</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-2 ">
                  <label className="form-control ms-0 text-left mt-3 ms-3">
                    <n>Informacion adicional</n>
                  </label>
                  <div className="row">
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center mt-1 ">
                        <n>Fecha de adquisición:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Vigencia de garantía:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Número de motor:</n>
                      </label>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Fecha</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Vigencia</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Numero</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center mt-1 ">
                        <n>Organizmo transito:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Número de chasis:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Clase de vehículo:</n>
                      </label>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Datos</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Número</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Clase</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center mt-1 ">
                        <n>Cilindraje:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Proveedor:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Transmición:</n>
                      </label>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Cilindraje</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Proveedor</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Tramsmición</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center mt-1 ">
                        <n>Dimensión de llantas:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4"></div>
                    <div className="col-12 col-sm-4"></div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Dimensión</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-2 ">
                  <label className="form-control ms-0 text-left mt-3 ms-3">
                    <n>Control de documentación</n>
                  </label>
                  <div className="row">
                    <div className="ms-3">
                      <label className="form-control ms-0">
                        1) Licencia de transito
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center mt-1 ">
                        <n>Aseguradora:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Numero:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4"></div>

                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Disco</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Procesador</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="ms-3 mt-2">
                      <label className="form-control ms-0">
                        2) Seguro obligatorio
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center mt-1 ">
                        <n>Número:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Fecha de expedicion:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Fecha inicial:</n>
                      </label>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Disco</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Procesador</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Fecha</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center mt-1 ">
                        <n>Fecha inicio:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-8"></div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Dimensión</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="ms-3">
                      <label className="form-control ms-0">
                        3) Certificado ATM
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center mt-1 ">
                        <n>Fecha de realización:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Fecha de vencimiento:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4"></div>

                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Fecha</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Fecha</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="ms-3 mt-2">
                      <label className="form-control ms-0">
                        4) Poliza todo riesgo aseguradora
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center mt-1 ">
                        <n>Aseguradora:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Fecha inicial:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 fw-bolder text-center  mt-1 ">
                        <n>Fecha final:</n>
                      </label>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Aseguradora</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Fecha</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Fecha</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-2 ">
                  <label className="form-control ms-0 text-left mt-3 ms-3">
                    <n>Datos del conductor</n>
                  </label>
                  <div className="row">
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center mt-1 ">
                        <n>Nombre:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Número de identificación:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Correo electronico:</n>
                      </label>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Nombre</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Número</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Correo</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center mt-1 ">
                        <n>Celular:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Apellido:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Dirección:</n>
                      </label>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Celular</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Apellido</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Correo</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-2 ">
                  <label className="form-control ms-0 text-left mt-3 ms-3">
                    <n>Otros datos</n>
                  </label>
                  <div className="row">
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center mt-1 ">
                        <n>Capacidad de extintor multipropósito:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Extracto contrato FUEC:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Poliza contractual:</n>
                      </label>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Capacidad</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">FUEC</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Poliza</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center mt-1 ">
                        <n>Certificado REV preventivo (resolución 315/2013):</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Trabajo de operacion:</n>
                      </label>
                    </div>
                    <div className="col-12 col-sm-4">
                      <label className="form-control ms-0 text-center  mt-1 ">
                        <n>Poliza:</n>
                      </label>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Certificado</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Trabajo</label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-floating input-group input-group-dynamic ms-2">
                        <input
                          className="form-control"
                          type="text"
                          disabled="true"
                        />
                        <label className="ms-2">Poliza</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                  <button
                    className="btn bg-gradient-primary me-md-2"
                    type="button"
                    title="Send"
                  >
                    Limpiar
                  </button>
                  <button
                    className="btn bg-gradient-primary me-md-2"
                    type="button"
                    title="Send"
                  >
                    Guardar
                  </button>
                  <button
                    className="btn bg-gradient-danger "
                    type="button"
                    title="Send"
                  >
                    Salir
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
};
export default HojaDeVidaVehiculoScreen;

//import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MarcaDeAgua1 from "../../../../components/MarcaDeAgua1";
import Subtitle from "../../../../components/Subtitle";
import { Card } from "react-bootstrap";

const options = [
  { label: "Platón", value: "PL" },
  { label: "Cabina", value: "CA" },
  { label: "Otros", value: "OT" },
];

const onSubmit = (data) => {
  console.log(data);
};

const HojaDeVidaVehiculoScreen = () => {
  const [vehiculoEncontado, setVehiculoEncontado] = useState<boolean>(true);
  const [enCirculacion, setEnCirculacion] = useState<boolean>(true);
  const [arriendo, setArriendo] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Hoja de vida de un vehiculo
            </h3>
            <Subtitle title="Activo" mt={3} />

            <div className="row">
              <div className="col-12 col-lg-6  mt-3">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div>
                      <label className="ms-2 text-terciary">
                        Placa<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        {...register("serial", { required: true })}
                      />
                      {errors.serial && (
                        <p className="text-danger">Este campo es obligatorio</p>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-lg-6 ">
                    <div>
                      <label className="ms-2 text-terciary">
                        Nombre del activo<span className="text-danger">*</span>
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        placeholder="Nombre del activo"
                        disabled
                        {...register("tipo_de_equipo", { required: false })}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6  mt-3">
                    <label className="ms-2 text-terciary">
                      Código<span className="text-danger">*</span>
                    </label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      placeholder="Código"
                      disabled
                      {...register("codigo", { required: false })}
                    />
                  </div>

                  <div className="col-12 col-lg-6  mt-3">
                    <label className="ms-2 text-terciary">
                      Tipo de vehiculo
                    </label>
                    <Select
                      options={[
                        { label: "Carro", value: "C" },
                        { label: "Moto", value: "M" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 mt-2">
                <div className="row">
                  <div className="col-12 col-lg-6 text-center">
                    <button
                      className="btn btn-sm btn-tablas mt-8"
                      type="button"
                      onClick={() => setVehiculoEncontado(!vehiculoEncontado)}
                    >
                      <i className="fa-solid fa-magnifying-glass fs-3"></i>
                    </button>
                  </div>
                  <div className="col-12 col-lg-6 text-center">
                    <button
                      className="border rounded-pill btn bg-gradient-primary mt-8"
                      type="button"
                      title="Send"
                    >
                      Busqueda de articulo
                    </button>
                  </div>
                </div>

                {/* <div className="row">
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>FOTO DEL COMPUTADOR</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div> */}
              </div>
            </div>
            {vehiculoEncontado == true ? (
              <div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3 text-center">
                    <label className="ms-2 text-terciary">En circulacion</label>
                    <br></br>
                    <button
                      className="btn btn-sm btn-tablas "
                      type="button"
                      title="Solicitudes"
                      onClick={() => setEnCirculacion(!enCirculacion)}
                    >
                      {enCirculacion == false ? (
                        <i
                          className="fa-solid fa-toggle-off fs-3"
                          style={{ color: "black" }}
                        ></i>
                      ) : (
                        <i
                          className="fa-solid fa-toggle-on fs-3"
                          style={{ color: "#8cd81e" }}
                        ></i>
                      )}
                    </button>
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Desde</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3 text-center">
                    <label className="ms-2 text-terciary">Arrendado</label>
                    <br></br>
                    <button
                      className="btn btn-sm btn-tablas "
                      type="button"
                      title="Solicitudes"
                      onClick={() => setArriendo(!arriendo)}
                    >
                      {arriendo == false ? (
                        <i
                          className="fa-solid fa-toggle-off fs-3"
                          style={{ color: "black" }}
                        ></i>
                      ) : (
                        <i
                          className="fa-solid fa-toggle-on fs-3"
                          style={{ color: "#8cd81e" }}
                        ></i>
                      )}
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Kilometraje</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Actualizado</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                </div>

                <Subtitle title="Especificaciones" mt={3} />

                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Marca</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Modelo</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Linea</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Color</label>
                    <input
                      name="ModeloEspecificaciones"
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">
                      Tipo combustible
                    </label>
                    <Select
                      options={[
                        { label: "Gasolina", value: "GS" },
                        { label: "ACPM", value: "ACPM" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Capacidad de pasajeros
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                </div>

                <Subtitle title="Informacion adicional" mt={3} />

                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Fecha de adquisición
                    </label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Número de motor</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Trasmisión</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Cilindraje</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Vigencia de garantia
                    </label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero de chasis</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Dimencion de llantas{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">
                      Capacidad de extintor{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                </div>

                <Subtitle title="Control de documentación" mt={3} />

                <div className="row ">
                  <h5 className="mt-3">Tarjeta de operción</h5>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expedición</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expiraión</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                </div>

                <div className="row ">
                  <h5 className="mt-3">SOAT</h5>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expedición</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expiraión</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                </div>
                <div className="row ">
                  <h5 className="mt-3">Revision tecnomicanica</h5>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expedición</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expiraión</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                </div>
                <div className="row ">
                  <h5 className="mt-3">Seguro todo riesgo</h5>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expedición</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Fecha de expiraión</label>
                    <input
                      type="date"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                </div>

                <Subtitle title="Datos del conductor" mt={3} />
                <div className="row">
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Nombre completo</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="ms-2 text-terciary">Tipo documento</label>
                    <Select
                      options={[
                        { label: "Cedula", value: "CC" },
                        { label: "NIT", value: "NIT" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Numero de documento</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>

                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Celular</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Correo</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <label className="text-terciary">Direccion</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                    />
                  </div>
                  <div className="col-12 col-lg-3 mt-3">
                    <button
                      className="border rounded-pill btn bg-gradient-primary mt-4"
                      type="button"
                      title="Send"
                    >
                      Asignar conductor
                    </button>
                  </div>
                </div>

                <Subtitle title="Otros datos" mt={3} />
                <div className="row ">
                  <div className="col-12 col-lg-3 mb-3">
                    <label className="text-terciary">
                      Capacidad de extintor:
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("capacidadExtintor", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mb-3">
                    <label className="text-terciary">
                      Tarjeta de operación:
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("tarjetaOperacion", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mb-3">
                    <label className="text-terciary">
                      Extracto contrato FUEC:
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("ExtractoFuec", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mb-3">
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
                  <div className="col-12 col-lg-3 mb-3">
                    <label className="text-terciary">Póliza Contractual:</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("polizaContractual", { required: true })}
                    />
                  </div>
                  <div className="col-12 col-lg-3 mb-3">
                    <label className="text-terciary">Póliza:</label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("polizaDatos", { required: true })}
                    />
                  </div>
                </div>

                <div className="d-grid gap-2 d-lg-flex justify-content-lg-end mt-3">
                  <button
                    className="border rounded-pill px-3 btn bg-gradient-primary me-lg-2"
                    type="button"
                    title="Send"
                  >
                    Limpiar
                  </button>
                  <button
                    className="border rounded-pill px-3 btn bg-gradient-primary me-lg-2"
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
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
};
export default HojaDeVidaVehiculoScreen;

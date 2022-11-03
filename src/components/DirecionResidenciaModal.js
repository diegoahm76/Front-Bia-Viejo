import React, { useState } from "react";
import Modal from "react-modal";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useForm, Controller } from "react-hook-form";
import Subtitle from "./Subtitle";
import Select from "react-select";

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

const valores1 = [
  { label: "Urbano", value: "urb" },
  { label: "Rural", value: "rur" },
];

const DirecionResidenciaModal = ({ isModalActive, setIsModalActive }) => {
  const [selecDireccion, setSelecDireccion] = useState({});

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <Modal
      isOpen={isModalActive}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="row min-vh-100">
        <div className="col-lg-12 mx-auto">
          <form
            lassName="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="mt-3 mb-4 mb-2 ms-3 fw-light text-terciary">
              Direccion de recidencia
            </h3>

            <div className="row ">
              <div className="col-12 col-md-6">
                <label className="text-terciary form-control ms-0">
                  Selecione :
                </label>
                <Controller
                  name="direccion"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      defaultValue={selecDireccion}
                      onChange={setSelecDireccion}
                      options={valores1}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>

              <div className="col-12 col-md-6 ">
                <button
                  className="mt-5 btn btn-primary text-capitalize"
                  type="submit"
                >
                  Buscar
                </button>
              </div>
            </div>

            {selecDireccion.value === "rur" ? (
              <div className="multisteps-form__content">
                <form className="row" onSubmit={handleSubmit(onSubmit)}>
                  <Subtitle title="Datos de la direccion rural" mt="3" />
                  <div className="row d-flex align-items-end mt-2 mx-2">
                    <div className="col-12 col-md-6 mb-3">
                      <label className="text-terciary">
                        Ubicación: <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="ubicacion"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={""}
                            placeholder="Selecciona"
                            {...register("ubicacion", { required: true })}
                          />
                        )}
                      />
                      {errors.municipioOpcion && (
                        <p className="text-danger">Este campo es obligatorio</p>
                      )}
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label className="text-terciary">Nombre:</label>
                      <input
                        type="text"
                        className="form-control border border-terciary rounded-pill px-3"
                        {...register("nombrePersona", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="row d-flex align-items-end mt-2 mx-2">
                    <div className="col-12 col-md-6 mb-3">
                      <label className="text-terciary">
                        Residencia: <span className="text-danger">*</span>
                      </label>
                      <Controller
                        name="residencia"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={""}
                            placeholder="Selecciona"
                            {...register("residencia", { required: true })}
                          />
                        )}
                      />
                      {errors.municipioOpcion && (
                        <p className="text-danger">Este campo es obligatorio</p>
                      )}
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <label className="text-terciary">Numero:</label>
                      <input
                        type="number"
                        className="form-control border border-terciary rounded-pill px-3"
                        // {...register("nombreUsuario", { required: true })}
                      />
                    </div>
                  </div>

                  <div className="row d-flex align-items-end mt-2 mx-2">
                    <div className="col-12 col-md-12">
                      <label className="text-terciary">Complemento</label>
                      <textarea
                        className="form-control border rounded-pill px-5"
                        value=""
                        rows={3}
                      />
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              ""
            )}

            {selecDireccion.value === "urb" ? (
              <div className="multisteps-form__content">
                <form className="row" onSubmit={handleSubmit(onSubmit)}>
                  <Subtitle title="Datos de la direccion urbano" mt="3" />

                  <div className="row d-flex align-items-end mt-2 mx-auto">
                    <div className="col-12 col-md-6">
                      <label className="text-terciary">Avenida:</label>
                      <Controller
                        name="avenida"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={""}
                            placeholder="Selecciona"
                          />
                        )}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="text-terciary">Numero:</label>
                      <input
                        type="number"
                        className="form-control border border-terciary rounded-pill px-3"
                      />
                    </div>
                  </div>

                  <div className="row d-flex align-items-end mt-2 mx-auto">
                    <div className="col-12 col-md-5">
                      <label className="text-terciary">Letra :</label>
                      <Controller
                        name="avenida"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={""}
                            placeholder="Selecciona"
                          />
                        )}
                      />
                    </div>
                    <div className="col-12 col-md-2">
                      <div className="form-check">
                        <label
                          className="form-check-label mx-2"
                          htmlFor="flexCheckDefault"
                        >
                          Bis
                        </label>
                        <input
                          className="form-check-input mx-2"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label mx-2"
                          htmlFor="flexCheckDefault"
                        ></label>
                      </div>
                    </div>

                    <div className="col-12 col-md-5">
                      <label className="text-terciary">Orientacion :</label>
                      <Controller
                        name="avenida"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={""}
                            placeholder="Selecciona"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="row d-flex align-items-end mt-2 mx-auto">
                    <div className="col-12 col-md-6">
                      <label className="text-terciary">Numero:</label>
                      <input
                        type="number"
                        className="form-control border border-terciary rounded-pill px-3"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="text-terciary">Letra :</label>
                      <Controller
                        name="avenida"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={""}
                            placeholder="Selecciona"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="row d-flex align-items-end mt-2 mx-auto">
                    <div className="col-12 col-md-6">
                      <label className="text-terciary">
                        Numero Secundario:
                      </label>
                      <input
                        type="number"
                        className="form-control border border-terciary rounded-pill px-3"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="text-terciary">Orientacion :</label>
                      <Controller
                        name="avenida"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={""}
                            placeholder="Selecciona"
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="row d-flex align-items-end mt-2 mx-auto">
                    <div className="col-12 col-md-6 mb-5">
                      <label className="text-terciary">complemento :</label>
                      <Controller
                        name="avenida"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={""}
                            placeholder="Selecciona"
                          />
                        )}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="text-terciary">Adicional</label>
                      <textarea
                        className="form-control border rounded-pill px-5"
                        value=""
                        rows={3}
                      />
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              ""
            )}

            <div className="d-flex justify-content-end gap-4 mt-3">
              <button
                className="btn bg-light text-white text-capitalize border rounded-pill px-3"
                type="button"
                onClick={() => setIsModalActive(false)}
                title="Send"
              >
                Salir
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default DirecionResidenciaModal;

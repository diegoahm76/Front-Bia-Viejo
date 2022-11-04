import React, { useState } from "react";
import Modal from "react-modal";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useForm, Controller } from "react-hook-form";
import Subtitle from "./Subtitle";
import Select from "react-select";
import { useEffect } from "react";
import clienteAxios from "../config/clienteAxios";

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

const letrasOptions = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "E", value: "E" },
  { label: "F", value: "F" },
  { label: "G", value: "G" },
  { label: "H", value: "H" },
  { label: "I", value: "I" },
  { label: "J", value: "J" },
  { label: "K", value: "K" },
  { label: "L", value: "L" },
  { label: "M", value: "M" },
  { label: "N", value: "N" },
  { label: "O", value: "O" },
  { label: "P", value: "P" },
  { label: "Q", value: "Q" },
  { label: "R", value: "R" },
  { label: "S", value: "S" },
  { label: "T", value: "T" },
  { label: "U", value: "U" },
  { label: "V", value: "V" },
  { label: "W", value: "W" },
  { label: "X", value: "X" },
  { label: "Y", value: "Y" },
  { label: "Z", value: "Z" },
];

const defaultValues = {
  ubicacion: "",
  residencia: "",
  nombreUbicacion: "",
  numeroResidencia: "",
  complementoRural: "",

  avenida: "",
  numero: "",
  letra1: "",
  bis: "",
  orientacion: "",
  numero2: "",
  letra2: "",
  numeroSecundario: "",
  orientacion2: "",
  complemento: "",
  adicional: "",
};

const DirecionResidenciaModal = ({
  isModalActive,
  setIsModalActive,
  completeAddress,
  setCompleteAddress,
  reset,
  keyReset,
  totalValuesForm,
}) => {
  const [principalRuralOptions, setPrincipalRuralOptionsOptions] = useState([]);
  const [complementoRuralOptions, setComplementoRuralOptions] = useState([]);
  const [principalUrbanoOptions, setPrincipalUrbanoOptions] = useState([]);
  const [complementoUrbanoOptions, setComplementoUrbanoOptions] = useState([]);
  const [orientacionUrbanoOptions, setOrientacionUrbanoOptions] = useState([]);
  const [selecDireccion, setSelecDireccion] = useState({});
  const [formValues, setFormValues] = useState({
    ubicacion: "",
    residencia: "",
    nombreUbicacion: "",
    numeroResidencia: "",
    complementoRural: "",

    avenida: "",
    numero: "",
    letra1: "",
    bis: "",
    orientacion: "",
    numero2: "",
    letra2: "",
    numeroSecundario: "",
    orientacion2: "",
    complemento: "",
    adicional: "",
  });

  const orderRural = [
    "ubicacion",
    "residencia",
    "nombreUbicacion",
    "numeroResidencia",
    "complementoRural",
  ];

  const orderUrbano = [
    "avenida",
    "numero",
    "letra1",
    "bis",
    "orientacion",
    "numero2",
    "letra2",
    "numeroSecundario",
    "orientacion2",
    "complemento",
    "adicional",
  ];

  const {
    register,
    handleSubmit,
    control,
    reset: resetDireccion,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    const completeAddressWitoutWhiteSpaces = completeAddress
      .trim()
      .split("")
      .filter((letter, index, arrFilter) => {
        if (index > 0) {
          if (arrFilter[index] === " " && arrFilter[index - 1] === " ") {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      })
      .join("");
    setCompleteAddress(completeAddressWitoutWhiteSpaces);
    const dataReset = {
      ...totalValuesForm,
      [keyReset]: completeAddressWitoutWhiteSpaces,
    };
    reset(dataReset);
    setIsModalActive(false);
  };

  const formatChoisesJuanDavid = (objectChoise) => {
    const data = Object.entries(objectChoise).map((value) => ({
      label: value[0],
      value: value[1],
    }));
    return data;
  };

  // const resetDefaultValues = () => {
  //   resetDireccion({
  //     ubicacion: "",
  //     nombreUbicacion: "",
  //     residencia: "",
  //     numeroResidencia: "",
  //     complementoRural: "",

  //     avenida: "",
  //     numero: "",
  //     letra1: "",
  //     orientacion: "",
  //     numero2: "",
  //     letra2: "",
  //     numeroSecundario: "",
  //     orientacion2: "",
  //     complemento: "",
  //     adicional: "",
  //   });
  // };

  useEffect(() => {
    const getDataDirecciones = async () => {
      const { data } = await clienteAxios.get("choices/direcciones/");
      console.log(data);
      setPrincipalRuralOptionsOptions(
        formatChoisesJuanDavid(data["Principal rural"])
      );
      setComplementoRuralOptions(
        formatChoisesJuanDavid(data["Complemento rural"])
      );
      setPrincipalUrbanoOptions(
        formatChoisesJuanDavid(data["Principal urbano"])
      );
      setComplementoUrbanoOptions(
        formatChoisesJuanDavid(data["Complemento urbano"])
      );
      setOrientacionUrbanoOptions(
        formatChoisesJuanDavid(data["Orientacion urbano"])
      );
    };
    getDataDirecciones();
  }, []);

  useEffect(() => {
    let fullAddress = "";
    if (selecDireccion.value === "urb") {
      orderUrbano.forEach((field) => {
        const dataField = formValues[field];
        const dataFieldTrim = dataField.trim();
        fullAddress = fullAddress + " " + dataFieldTrim;
      });
      setCompleteAddress(fullAddress);
    } else if (selecDireccion.value === "rur") {
      orderRural.forEach((field) => {
        const dataField = formValues[field];
        const dataFieldTrim = dataField?.trim() ?? dataField;
        fullAddress = fullAddress + " " + dataFieldTrim;
      });
      setCompleteAddress(fullAddress);
    } else {
      setCompleteAddress("");
    }
  }, [formValues]);

  useEffect(() => {
    setFormValues(defaultValues);
  }, [selecDireccion]);

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
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
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
                      onChange={setSelecDireccion}
                      options={valores1}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            </div>

            {selecDireccion.value === "rur" ? (
              <div className="multisteps-form__content row">
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
                          options={principalRuralOptions}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              ubicacion: e.value,
                            });
                          }}
                          placeholder="Seleccionar"
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
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          nombreUbicacion: e.target.value,
                        });
                      }}
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
                          options={complementoRuralOptions}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              residencia: e.value,
                            });
                          }}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="text-terciary">Numero:</label>
                    <input
                      type="number"
                      className="form-control border border-terciary rounded-pill px-3"
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          numeroResidencia: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="row d-flex align-items-end mt-2 mx-2">
                  <div className="col-12 col-md-12">
                    <label className="text-terciary">Complemento</label>
                    <textarea
                      className="form-control border rounded-pill px-5"
                      rows={3}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          complementoRural: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {selecDireccion.value === "urb" ? (
              <div className="multisteps-form__content row">
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
                          options={principalUrbanoOptions}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              avenida: e.value,
                            });
                          }}
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
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          numero: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="row d-flex align-items-end mt-2 mx-auto">
                  <div className="col-12 col-md-5">
                    <label className="text-terciary">Letra :</label>
                    <Controller
                      name="letra1"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={letrasOptions}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              letra1: e.value,
                            });
                          }}
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
                        onChange={(e) => {
                          console.log(e.target.checked);
                          if (e.target.checked) {
                            setFormValues({
                              ...formValues,
                              bis: "BIS",
                            });
                          } else {
                            setFormValues({
                              ...formValues,
                              bis: "",
                            });
                          }
                        }}
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
                      name="orientacion"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={orientacionUrbanoOptions}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              orientacion: e.value,
                            });
                          }}
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
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          numero2: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="text-terciary">Letra :</label>
                    <Controller
                      name="letra2"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={letrasOptions}
                          placeholder="Selecciona"
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              letra2: e.value,
                            });
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="row d-flex align-items-end mt-2 mx-auto">
                  <div className="col-12 col-md-6">
                    <label className="text-terciary">Numero Secundario:</label>
                    <input
                      type="number"
                      className="form-control border border-terciary rounded-pill px-3"
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          numeroSecundario: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="text-terciary">Orientacion :</label>
                    <Controller
                      name="orientacion2"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={orientacionUrbanoOptions}
                          placeholder="Selecciona"
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              orientacion2: e.value,
                            });
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="row d-flex align-items-end mt-2 mx-auto">
                  <div className="col-12 col-md-6 mb-5">
                    <label className="text-terciary">complemento :</label>
                    <Controller
                      name="complemento"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={complementoUrbanoOptions}
                          placeholder="Selecciona"
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              complemento: e.value,
                            });
                          }}
                        />
                      )}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="text-terciary">Adicional</label>
                    <textarea
                      className="form-control border rounded-pill px-5"
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          adicional: e.target.value,
                        });
                      }}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* <p className="text-center my-2 mt-4 fs-4">{completeAddress}</p> */}

            <div className="col-12">
              <label className="text-terciary">Dirección estandarizada:</label>
              <input
                type="text"
                className="form-control border border-terciary rounded-pill px-3"
                disabled
                value={completeAddress}
              />
            </div>

            <div className="mt-3 d-flex justify-content-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalActive(false)}
                className="btn bg-gradient-light text-capitalize"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => setIsModalActive(false)}
                className="btn bg-gradient-primary text-capitalize"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default DirecionResidenciaModal;

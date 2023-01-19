import React, { useState } from "react";
import Modal from "react-modal";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useForm, Controller } from "react-hook-form";
import Subtitle from "./Subtitle";
import Select from "react-select";
import { useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import botonCancelar from "../assets/iconosBotones/cancelar.svg"
import botonGuardar from "../assets/iconosBotones/guardar.svg"
import useEscapeKey from "../hooks/useEscapeKey";
import { IGeneric } from "../Interfaces/Generic";


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

  principal: "",
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
const genericInitial: IGeneric[] = [
  {
    label: "",
    value: ""
  }
]


const DirecionResidenciaModal = ({
  isModalActive,
  setIsModalActive,
  completeAddress,
  setCompleteAddress,
  reset,
  keyReset,
  watch,
}) => {
  const [principalRuralOptions, setPrincipalRuralOptionsOptions] = useState(genericInitial);
  const [complementoRuralOptions, setComplementoRuralOptions] = useState(genericInitial);
  const [principalUrbanoOptions, setPrincipalUrbanoOptions] = useState(genericInitial);
  const [complementoUrbanoOptions, setComplementoUrbanoOptions] = useState(genericInitial);
  const [orientacionUrbanoOptions, setOrientacionUrbanoOptions] = useState(genericInitial);
  const [selecDireccion, setSelecDireccion] = useState({ value: "" });
  const [formValues, setFormValues] = useState({
    ubicacion: "",
    nombreUbicacion: "",
    residencia: "",
    numeroResidencia: "",
    complementoRural: "",

    principal: "",
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
    "nombreUbicacion",
    "residencia",
    "numeroResidencia",
    "complementoRural",
  ];

  const orderUrbano = [
    "principal",
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
    control,
    handleSubmit,
    register,
    reset: resetDirection,
    watch: watchDirection,
    formState: { errors },
  } = useForm();

  const onSubmit = (e) => {
    const completeAddressWithoutWhiteSpaces = completeAddress
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
    setCompleteAddress(completeAddressWithoutWhiteSpaces);
    const dataReset = {
      ...watch(),
      [keyReset]: completeAddressWithoutWhiteSpaces,
    };

    reset(dataReset);
    setIsModalActive(false);
    resetDirection({
      direccion: "",
      ubicacion: "",
      nombre: "",
      residencia: ""
    })
    setSelecDireccion({ value: "" })
  };

  const formatChoisesJuanDavid = (objectChoise: IGeneric) => {
    const formatGeneric = genericInitial;
    const data = Object.entries(objectChoise).map((value) => ({
      label: value[0],
      value: value[1],
    }));
    formatGeneric.push({
      label: data[0].label,
      value: data[0].value
    });
    return formatGeneric;
  };

  const handleChangeTypeLocation = (e) => {
    setSelecDireccion(e)
    resetDirection({ ...watchDirection(), direccion: e })
  }

  useEffect(() => {
    const getDataDirecciones = async () => {
      const { data } = await clienteAxios.get<IGeneric>("choices/direcciones/");
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
        if (field === "letra1" || field === "letra2") {
          fullAddress = fullAddress + dataFieldTrim;
        } else if (field === "numeroSecundario" && dataFieldTrim) {
          fullAddress = fullAddress + " No. " + dataFieldTrim;
        } else {
          fullAddress = fullAddress + " " + dataFieldTrim;
        }
      });
      setCompleteAddress(fullAddress);
    } else if (selecDireccion.value === "rur") {
      orderRural.forEach((field) => {
        console.log(field)
        const dataField = formValues[field];
        const dataFieldTrim = dataField?.trim() ?? "";
        if (dataFieldTrim) {
          fullAddress = fullAddress + " " + dataFieldTrim;
        }
      });
      setCompleteAddress(fullAddress);
    } else {
      setCompleteAddress("");
    }
  }, [formValues]);

  const handleCloseModalESC = (e) => {
    setIsModalActive(false)
  }

  useEscapeKey(handleCloseModalESC)

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
              Dirección de residencia
            </h3>

            <div className="row ">
              <div className="col-12 col-md-6">
                <label className="text-terciary form-control ms-0">
                  Seleccione: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="direccion"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={handleChangeTypeLocation}
                      options={valores1}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            </div>

            {selecDireccion.value === "rur" ? (
              <div className="multisteps-form__content row">
                <Subtitle title="Datos de la dirección rural" mt={3} />
                <div className="row d-flex align-items-end mt-2 mx-2">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="text-terciary">
                      Principal: <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="ubicacion"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={principalRuralOptions}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              ubicacion: e.value,
                            });
                            resetDirection({ ...watchDirection(), ubicacion: e })
                          }}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errors.ubicacion && (
                      <p className="text-danger">Este campo es obligatorio</p>
                    )}
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <div>
                      <label className="text-terciary">Nombre: <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control border border-terciary rounded-pill px-3"
                        {...register("nombre", { required: true })}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            nombreUbicacion: e.target.value,
                          });
                          resetDirection({ ...watchDirection(), nombre: e.target.value })
                        }}
                      />
                    </div>
                    {errors.nombre && (
                      <p className="text-danger">Este campo es obligatorio</p>
                    )}
                  </div>
                </div>
                <div className="row d-flex align-items-end mt-2 mx-2">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="text-terciary">
                      Complemento:
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
                    <label className="text-terciary">Número:</label>
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
                      className="form-control border rounded-pill px-5 border-terciary"
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
                <Subtitle title="Datos de la dirección urbano" mt={3} />

                <div className="row d-flex align-items-end mt-2 mx-auto">
                  <div className="col-12 col-md-6">
                    <label className="text-terciary">Principal: <span className="text-danger">*</span></label>
                    <Controller
                      name="principal"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={principalUrbanoOptions}
                          onChange={(e) => {
                            setFormValues({
                              ...formValues,
                              principal: e.value,
                            });
                            resetDirection({ ...watchDirection(), principal: e })
                          }}
                          placeholder="Selecciona"
                        />
                      )}
                    />
                    {errors.principal && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <div>
                      <label className="text-terciary">Número: <span className="text-danger">*</span></label>
                      <input
                        type="number"
                        className="form-control border border-terciary rounded-pill px-3"
                        {...register("numero", { required: true })}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            numero: e.target.value,
                          });
                          resetDirection({ ...watchDirection(), numero: e.target.value })
                        }}
                      />
                    </div>
                    {errors.numero && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
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
                    <label className="text-terciary">Número:</label>
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
                    <label className="text-terciary">Número Secundario:</label>
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
                    <label className="text-terciary">Complemento:</label>
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
                      className="form-control border rounded-pill px-5 border-terciary"
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
                onClick={() => {
                  setIsModalActive(false)
                  resetDirection({
                    direccion: "",
                    ubicacion: "",
                    nombre: "",
                    residencia: ""
                  })
                  setSelecDireccion({ value: "" })
                }}
                className="mb-0 btn-image text-capitalize bg-white border boder-none"
              >
                <img src={botonCancelar} alt="" />
              </button>
              <button
                type="submit"
                className="mb-0 btn-image text-capitalize bg-white border boder-none"
              >
                <img src={botonGuardar} alt="" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default DirecionResidenciaModal;

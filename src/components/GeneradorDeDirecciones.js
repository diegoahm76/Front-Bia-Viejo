import { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
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

const viaPrincipalOptions = [
  { label: "Autopista", value: "Autopista" },
  { label: "Avenida", value: "Avenida" },
  { label: "Boulevar", value: "Boulevar" },
  { label: "Calle", value: "Calle" },
  { label: "Carrera", value: "Carrera" },
  { label: "Circunvalar", value: "Circunvalar" },
  { label: "Diagonal", value: "Diagonal" },
  { label: "Kilometro", value: "Kilometro" },
  { label: "Sector", value: "Sector" },
  { label: "Transversal", value: "Transversal" },
];

const letraAsociadaOptions = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "E", value: "E" },
  { label: "F", value: "F" },
  { label: "G", value: "G" },
];

const bisOptions = [
  { label: "BIS", value: "BIS" },
  { label: "BIS A", value: "BIS A" },
  { label: "BIS B", value: "BIS B" },
  { label: "BIS C", value: "BIS C" },
  { label: "BIS D", value: "BIS D" },
  { label: "BIS E", value: "BIS E" },
];

const coordenadaOptions = [
  { label: "Norte", value: "coordenada1" },
  { label: "Sur", value: "coordenada1" },
  { label: "Oriente", value: "coordenada1" },
  { label: "Occidente", value: "coordenada1" },
];

const interiorOptions = [
  { label: "Apartamento", value: "apartamento" },
  { label: "Barrio", value: "barrio" },
  { label: "Casa", value: "casa" },
  { label: "Ciudadela", value: "ciudadela" },
];

const orderAddress = [
  "viaPrincipal",
  "numeroONombreDeVia",
  "letraViaPrincipal",
  "prefijoBis",
  "coordenada1",
  "cruce",
  "letraCruce",
  "sufijoBis",
  "coordenada2",
  "distancia",
  "interior1",
  "detalle1",
  "interior2",
  "detalle2",
  "interior3",
  "detalle3",
];

const dataAddressFieldsDefault = {
  viaPrincipal: "",
  numeroONombreDeVia: "",
  letraViaPrincipal: "",
  prefijoBis: "",
  coordenada1: "",
  cruce: "",
  letraCruce: "",
  sufijoBis: "",
  coordenada2: "",
  distancia: "",
  interior1: "",
  detalle1: "",
  interior2: "",
  detalle2: "",
  interior3: "",
  detalle3: "",
};

Modal.setAppElement("#root");

const GeneradorDeDirecciones = ({
  isOpenGenerator,
  setIsOpenGenerator,
  completeAddress,
  setCompleteAddress,
}) => {
  const [numberFields, setNumberFields] = useState(1);
  const [isReset, setIsReset] = useState(false);
  const [dataAddressFields, setDataAddressFields] = useState(
    dataAddressFieldsDefault
  );

  const { control } = useForm();

  const handleSaveAddress = () => {
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
    setIsOpenGenerator(false);
  };

  const handleNext = () => {
    setNumberFields(numberFields + 1);
  };

  const handleEmpty = () => {
    setNumberFields(1);
    setDataAddressFields(dataAddressFieldsDefault);
    setIsReset(true);
    setTimeout(() => {
      setIsReset(false);
    }, 50);
  };

  const handleCloseGenerator = () => {
    setIsOpenGenerator(false);
  };

  useEffect(() => {
    let fullAddress = "";
    orderAddress.forEach((field) => {
      const dataField = dataAddressFields[field];
      const dataFieldTrim = dataField.trim();
      fullAddress = fullAddress + " " + dataFieldTrim;
    });
    setCompleteAddress(fullAddress);
  }, [dataAddressFields]);

  return (
    <Modal
      isOpen={isOpenGenerator}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <form className="row">
        <h3 className="mt-3 mb-0 text-center mb-6">Registre su dirección</h3>

        {!isReset && (
          <>
            <div className="col-12 col-md-6 mt-2">
              <label className="form-label">Vía principal</label>
              <Controller
                name="viaPrincipal"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isDisabled={numberFields > 1}
                    onChange={(e) =>
                      setDataAddressFields({
                        ...dataAddressFields,
                        viaPrincipal: e.label,
                      })
                    }
                    options={viaPrincipalOptions}
                    placeholder="Seleccionar"
                  />
                )}
              />
            </div>

            <div className="col-12 col-md-6 mt-md-4 mt-2">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Número o nombre de vía"
                  name="numeroONombreDeVia"
                  disabled={numberFields > 1}
                  onChange={(e) =>
                    setDataAddressFields({
                      ...dataAddressFields,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <label className="ms-2">Número o nombre de vía</label>
              </div>
            </div>

            <div
              className={`col-12 col-md-6 mt-2 ${
                numberFields < 2 ? "d-none" : ""
              }`}
            >
              <label className="form-label">
                Letra asociada a la vía principal
              </label>
              <Controller
                name="letraViaPrincipal"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isDisabled={numberFields > 2}
                    onChange={(e) =>
                      setDataAddressFields({
                        ...dataAddressFields,
                        letraViaPrincipal: e.label,
                      })
                    }
                    options={letraAsociadaOptions}
                    placeholder="Seleccionar"
                  />
                )}
              />
            </div>

            <div
              className={`col-12 col-md-6 mt-2 ${
                numberFields < 2 ? "d-none" : ""
              }`}
            >
              <label className="form-label">Prefijo (Bis)</label>
              <Controller
                name="prefijoBis"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isDisabled={numberFields > 2}
                    onChange={(e) =>
                      setDataAddressFields({
                        ...dataAddressFields,
                        prefijoBis: e.label,
                      })
                    }
                    options={bisOptions}
                    placeholder="Seleccionar"
                  />
                )}
              />
            </div>

            <div
              className={`col-12 col-md-6 mt-2 ${
                numberFields < 3 ? "d-none" : ""
              }`}
            >
              <label className="form-label">Coordenada 1</label>
              <Controller
                name="coordenada1"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isDisabled={numberFields > 3}
                    onChange={(e) =>
                      setDataAddressFields({
                        ...dataAddressFields,
                        coordenada1: e.label,
                      })
                    }
                    options={coordenadaOptions}
                    placeholder="Seleccionar"
                  />
                )}
              />
            </div>

            <div
              className={`col-12 col-md-6 mt-2 mt-md-4 ${
                numberFields < 4 ? "d-none" : ""
              }`}
            >
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  disabled={numberFields > 4}
                  placeholder="Cruce"
                  name="cruce"
                  onChange={(e) =>
                    setDataAddressFields({
                      ...dataAddressFields,
                      [e.target.name]:
                        e.target.value && `No. ${e.target.value}`,
                    })
                  }
                />
                <label className="ms-2">Cruce</label>
              </div>
            </div>

            <div
              className={`col-12 col-md-6 mt-2 ${
                numberFields < 5 ? "d-none" : ""
              }`}
            >
              <label className="form-label">Letra asociada al cruce</label>
              <Controller
                name="letraCruce"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isDisabled={numberFields > 5}
                    onChange={(e) =>
                      setDataAddressFields({
                        ...dataAddressFields,
                        letraCruce: e.label,
                      })
                    }
                    options={letraAsociadaOptions}
                    placeholder="Seleccionar"
                  />
                )}
              />
            </div>

            <div
              className={`col-12 col-md-6 mt-2 ${
                numberFields < 5 ? "d-none" : ""
              }`}
            >
              <label className="form-label">Sufijo (Bis)</label>
              <Controller
                name="sufijoBis"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isDisabled={numberFields > 5}
                    options={bisOptions}
                    onChange={(e) =>
                      setDataAddressFields({
                        ...dataAddressFields,
                        sufijoBis: e.label,
                      })
                    }
                    placeholder="Seleccionar"
                  />
                )}
              />
            </div>

            <div
              className={`col-12 col-md-6 mt-2 ${
                numberFields < 6 ? "d-none" : ""
              }`}
            >
              <label className="form-label">Coordenada 2</label>
              <Controller
                name="coordenada2"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isDisabled={numberFields > 6}
                    options={coordenadaOptions}
                    onChange={(e) =>
                      setDataAddressFields({
                        ...dataAddressFields,
                        coordenada2: e.label,
                      })
                    }
                    placeholder="Seleccionar"
                  />
                )}
              />
            </div>

            <div
              className={`col-12 col-md-6 mt-2 mt-md-4 ${
                numberFields < 7 ? "d-none" : ""
              }`}
            >
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  disabled={numberFields > 7}
                  name="distancia"
                  placeholder="Nombre Codigo de verificación"
                  onChange={(e) =>
                    setDataAddressFields({
                      ...dataAddressFields,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <label className="ms-2">Distancia</label>
              </div>
            </div>

            <div
              className={`col-12 col-md-6 mt-2 ${
                numberFields < 8 ? "d-none" : ""
              }`}
            >
              <label className="form-label">Interior 1</label>
              <Controller
                name="interior1"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isDisabled={numberFields > 8}
                    options={interiorOptions}
                    placeholder="Seleccionar"
                    onChange={(e) =>
                      setDataAddressFields({
                        ...dataAddressFields,
                        interior1: e.label,
                      })
                    }
                  />
                )}
              />
            </div>

            <div
              className={`col-12 col-md-6 mt-2 mt-md-4 ${
                numberFields < 8 ? "d-none" : ""
              }`}
            >
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  disabled={numberFields > 8}
                  name="detalle1"
                  placeholder="Nombre Codigo de verificación"
                  onChange={(e) =>
                    setDataAddressFields({
                      ...dataAddressFields,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <label className="ms-2">Detalle 1</label>
              </div>
            </div>

            <div
              className={`col-12 col-md-6 mt-2 ${
                numberFields < 9 ? "d-none" : ""
              }`}
            >
              <label className="form-label">Interior 2</label>
              <Controller
                name="interior2"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isDisabled={numberFields > 9}
                    options={interiorOptions}
                    placeholder="Seleccionar"
                    onChange={(e) =>
                      setDataAddressFields({
                        ...dataAddressFields,
                        interior2: e.label,
                      })
                    }
                  />
                )}
              />
            </div>

            <div
              className={`col-12 col-md-6 mt-2 mt-md-4 ${
                numberFields < 9 ? "d-none" : ""
              }`}
            >
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  disabled={numberFields > 9}
                  name="detalle2"
                  placeholder="Nombre Codigo de verificación"
                  onChange={(e) =>
                    setDataAddressFields({
                      ...dataAddressFields,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <label className="ms-2">Detalle 2</label>
              </div>
            </div>

            <div
              className={`col-12 col-md-6 mt-2 ${
                numberFields < 10 ? "d-none" : ""
              }`}
            >
              <label className="form-label">Interior 3</label>
              <Controller
                name="interior3"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isDisabled={numberFields > 10}
                    options={interiorOptions}
                    placeholder="Seleccionar"
                    onChange={(e) =>
                      setDataAddressFields({
                        ...dataAddressFields,
                        interior3: e.label,
                      })
                    }
                  />
                )}
              />
            </div>

            <div
              className={`col-12 col-md-6 mt-2 mt-md-4 ${
                numberFields < 10 ? "d-none" : ""
              }`}
            >
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  disabled={numberFields > 10}
                  name="detalle3"
                  placeholder="Nombre Codigo de verificación"
                  onChange={(e) =>
                    setDataAddressFields({
                      ...dataAddressFields,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
                <label className="ms-2">Detalle 3</label>
              </div>
            </div>

            <p className="text-center my-2 mt-4 fs-4">{completeAddress}</p>
          </>
        )}

        {/* BOTONES MOVIMIENTO ENTRE INPUTS Y SELECTS */}
        <div className="mt-3 d-flex justify-content-end gap-2">
          <button
            type="button"
            onClick={handleEmpty}
            className="btn bg-gradient-danger text-capitalize"
          >
            Limpiar
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={`btn bg-gradient-primary text-capitalize ${
              numberFields > 10 && "d-none"
            }`}
          >
            {"Siguiente >>"}
          </button>
        </div>

        {/* BOTONES ACCIONES FINALES */}
        <div className="mt-3 d-flex justify-content-end gap-2">
          <button
            type="button"
            onClick={handleCloseGenerator}
            className="btn bg-gradient-light text-capitalize"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSaveAddress}
            className="btn bg-gradient-primary text-capitalize"
          >
            Guardar
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default GeneradorDeDirecciones;

import { useForm } from "react-hook-form";

const dataElmentosInspeccionar = [
  {
    title: "Direccionales",
    elementos: [
      {
        name: "Direccionales delanteras",
        value: false,
      },
      {
        name: "Direccionales traseras",
        value: false,
      },
    ],
  },
  {
    title: "Frenos",
    elementos: [
      {
        name: "Frenos principales",
        value: false,
      },
      {
        name: "Frenos de emergencia",
        value: false,
      },
    ],
  },
  {
    title: "Limpiabrisas",
    elementos: [
      {
        name: "Limpiabrisas derecho",
        value: false,
      },
      {
        name: "Limpiabrisas izquierdo",
        value: false,
      },
      {
        name: "Limpiabrisas trasero",
        value: false,
      },
    ],
  },
  {
    title: "Llantas",
    elementos: [
      {
        name: "Llantas delanteras",
        value: false,
      },
      {
        name: "Llantas traseras",
        value: false,
      },
      {
        name: "Llantas de repuesto",
        value: false,
      },
    ],
  },
  {
    title: "Nivel de fluido",
    elementos: [
      {
        name: "Frenos",
        value: false,
      },
      {
        name: "Aceite",
        value: false,
      },
      {
        name: "Refrigerante",
        value: false,
      },
    ],
  },
  {
    title: "Espejos",
    elementos: [
      {
        name: "Espejo derecho",
        value: false,
      },
      {
        name: "Espejo izquierda",
        value: false,
      },
      {
        name: "Retrovisor",
        value: false,
      },
    ],
  },
  {
    title: "Apoya cabezas",
    elementos: [
      {
        name: "Apoya cabeza delanteros",
        value: false,
      },
      {
        name: "Apoya cabeza traseros",
        value: false,
      },
    ],
  },
  {
    title: "Cinturones de seguridad",
    elementos: [
      {
        name: "Cinturones delanteros",
        value: false,
      },
      {
        name: "Cinturones traseros",
        value: false,
      },
    ],
  },
  {
    title: "Luces",
    elementos: [
      {
        name: "Luces altas",
        value: false,
      },
      {
        name: "Luces bajas",
        value: false,
      },
      {
        name: "Luces stops",
        value: false,
      },
      {
        name: "Luces reversa",
        value: false,
      },
      {
        name: "Luces parqueo",
        value: false,
      },
    ],
  },
  {
    title: "Accesorios",
    elementos: [
      {
        name: "Pito",
        value: false,
      },
      {
        name: "Botiquin",
        value: false,
      },
      {
        name: "Herramientas",
        value: false,
      },
    ],
  },
];

const InspeccionDiariaDeVehiculoScreen = () => {
  const { register, handleSubmit } = useForm();
  return (
    <div className="row min-vh-100">
      <div className="col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Inspección diaria de vehículos
        </h3>
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row">
            <h5 className="font-weight-bolder mt-2">Datos del vehículo</h5>

            <div className="col-6 col-md-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nombre del conductor"
                />
                <label className="ms-2">Nombre del conductor</label>
              </div>
            </div>

            <div className="col-6 col-md-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Fecha"
                />
                <label className="ms-2">Fecha</label>
              </div>
            </div>

            <div className="col-6 col-md-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Placa"
                />
                <label className="ms-2">Placa</label>
              </div>
            </div>

            <div className="col-6 col-md-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Kilometraje"
                />
                <label className="ms-2">Kilometraje</label>
              </div>
            </div>

            <div className="col-6 col-md-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Marca"
                />
                <label className="ms-2">Marca</label>
              </div>
            </div>

            <div className="col-6 col-md-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Línea"
                />
                <label className="ms-2">Línea</label>
              </div>
            </div>

            <h5 className="font-weight-bolder text-center my-3">
              Elementos a inspeccionar
            </h5>

            {dataElmentosInspeccionar.map((element) => (
              <div className="col-6 col-md-4">
                <h6 className="font-weight-bolder text-center my-3">
                  {element.title}
                </h6>
                {element.elementos.map((estados) => (
                  <div className="form-check form-switch d-flex gap-2">
                    <label className="me-5">Malo</label>
                    <input
                      className="form-check-input mt-1"
                      type="checkbox"
                      role="switch"
                      id={estados.name}
                    />
                    <label>Bueno</label>
                    <label for={estados.name}>{estados.name}</label>
                  </div>
                ))}
              </div>
            ))}

            <div className="input-group input-group-dynamic flex-column mt-3">
              <label htmlFor="exampleFormControlInput1 ">Observaciones</label>
              <textarea
                className="multisteps-form__input form-control p-2 mw-100 w-auto"
                type="text"
                rows="3"
                name="Observaciones"
              />
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button
                className="btn bg-gradient-light text-capitalize"
                type="button"
              >
                Limpiar
              </button>
              <button
                className="btn bg-gradient-primary text-capitalize"
                type="button"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default InspeccionDiariaDeVehiculoScreen;

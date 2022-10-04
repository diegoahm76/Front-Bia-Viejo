import { AgGridReact } from "ag-grid-react";
import { useForm } from "react-hook-form";

const columDefs = [
  { headerName: "Numero de solicitud", field: "Numero de solicitud" },
  { headerName: "Nombre de profesional", field: "Nombre de profesional" },
  { headerName: "Vivero relacionado", field: "Vivero relacionado" },
  { headerName: "Fecha solicitud", field: "Fecha solicitud" },
];

const rowData = [
  {
    "Numero de solicitud": "0001",
    "Nombre de profesional": "Juan Carlos",
    "Vivero relacionado": "La bella",
    "Fecha solicitud": "10/09/2022",
  },
  {
    "Numero de solicitud": "0002",
    "Nombre de profesional": "Juan David",
    "Vivero relacionado": "La bella",
    "Fecha solicitud": "12/09/2022",
  },
  {
    "Numero de solicitud": "0003",
    "Nombre de profesional": "Jesus Esteban",
    "Vivero relacionado": "Paz de ariporo",
    "Fecha solicitud": "27/09/2022",
  },
  {
    "Numero de solicitud": "0004",
    "Nombre de profesional": "Santiago Aguirre",
    "Vivero relacionado": "Paz de ariporo",
    "Fecha solicitud": "30/09/2022",
  },
  {
    "Numero de solicitud": "0005",
    "Nombre de profesional": "Marcos Rivera",
    "Vivero relacionado": "La bella",
    "Fecha solicitud": "01/09/2022",
  },
  {
    "Numero de solicitud": "0006",
    "Nombre de profesional": "Marcos Rivera",
    "Vivero relacionado": "La bella",
    "Fecha solicitud": "02/09/2022",
  },
  {
    "Numero de solicitud": "0007",
    "Nombre de profesional": "Sebastian Mendez",
    "Vivero relacionado": "Paz de ariporo",
    "Fecha solicitud": "27/09/2022",
  },
  {
    "Numero de solicitud": "0008",
    "Nombre de profesional": "Carlos Barrios",
    "Vivero relacionado": "Paz de ariporo",
    "Fecha solicitud": "04/09/2022",
  },
];

const defaultColDef = {
  sortable: true,
  flex: 1,
  filter: true,
  wrapHeaderText: true,
  resizable: true,
  initialWidth: 200,
  suppressMovable: true,
};

const RolesScreen = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="container my-auto p-2 p-2">
      <div className="row">
        <div className="col-12 col-md-8 mx-auto">
          <div className="card z-index-0 fadeIn3 fadeInBottom px-4 pb-2 pb-md-4">
            <h3 className="mt-3 mb-0 text-center mb-6">Consultar rol</h3>
            <form className="row">
              <div className="col-12 col-lg-8">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Tipo de documento"
                  />
                  <label className="ms-2">Nombre:</label>
                </div>
              </div>
              <button
                type="button"
                className="btn bg-gradient-primary text-capitalize col-4 mt-3"
              >
                Buscar
              </button>
              <div id="myGrid" className="ag-theme-alpine mt-3">
                <div
                  className="container ag-theme-alpine"
                  style={{ height: "300px", maxWidth: "600px" }}
                >
                  <AgGridReact
                    className="ag-theme-alpine"
                    animateRows="true"
                    columnDefs={columDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                  ></AgGridReact>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RolesScreen;

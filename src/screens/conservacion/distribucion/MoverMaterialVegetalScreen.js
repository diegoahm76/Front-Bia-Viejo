import React, { useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Controller, useForm } from "react-hook-form";

export const MoverMaterialVegetalScreen = () => {
  const [selectedMover, setSelectedMover] = useState({});
  const opcMover = [
    { label: "Desde Almacen", value: "Desde" },
    { label: "Entre viveros", value: "Entre" },
    { label: "En el vivero", value: "En" },
  ];

  const [selectedVivero, setSelectedVivero] = useState({});
  const opcViv = [
    { label: "Villavicencio", value: "VI" },
    { label: "Puerto Lopez", value: "PL" },
    { label: "San Juan de Arama", value: "SJ" },
    { label: "Puerto Rico", value: "PR" },
    { label: "La Macarena", value: "LM" },
    { label: "Mapiripan", value: "MA" },
  ];

  const [selectedViveroOrigen, setSelectedViveroOrigen] = useState({});
  const opcVivOri = [
    { label: "Villavicencio", value: "VI" },
    { label: "Puerto Lopez", value: "PL" },
    { label: "San Juan de Arama", value: "SJ" },
    { label: "Puerto Rico", value: "PR" },
    { label: "La Macarena", value: "LM" },
    { label: "Mapiripan", value: "MA" },
  ];

  const [selectedViveroDestino, setSelectedViveroDestino] = useState({});
  const opcVivDes = [
    { label: "Villavicencio", value: "VI" },
    { label: "Puerto Lopez", value: "PL" },
    { label: "San Juan de Arama", value: "SJ" },
    { label: "Puerto Rico", value: "PR" },
    { label: "La Macarena", value: "LM" },
    { label: "Mapiripan", value: "MA" },
  ];

  const [selectedViveroDestino2, setSelectedViveroDestino2] = useState({});
  const opcVivDes2 = [
    { label: "Villavicencio", value: "VI" },
    { label: "Puerto Lopez", value: "PL" },
    { label: "San Juan de Arama", value: "SJ" },
    { label: "Puerto Rico", value: "PR" },
    { label: "La Macarena", value: "LM" },
    { label: "Mapiripan", value: "MA" },
  ];

  const [rowData] = useState([
    {
      nombre: "Yopo",
      total: 2000,
    },
    {
      nombre: "Pomaroso",
      total: 4000,
    },
    {
      nombre: "Flor amarillo",
      total: 2000,
    },
    {
      nombre: "Flor morado",
      total: 3000,
    },
    {
      nombre: "Pala draga",
      total: 2000,
    },
    {
      nombre: "Abono",
      total: 5000,
    },
    {
      nombre: "Insecticida",
      total: "",
    },
    {
      nombre: "triple 15",
      total: "",
    },
    {
      nombre: "Tierra negra",
      total: "",
    },
    {
      nombre: "Arena",
      total: "",
    },
    {
      nombre: "Cascarilla",
      total: "",
    },
    {
      nombre: "Algarrobo",
      total: "",
    },
    {
      nombre: "Palmoriche",
      total: "",
    },
    {
      nombre: "Yopo",
      total: 2000,
    },
    {
      nombre: "Pomaroso",
      total: 4000,
    },
    {
      nombre: "Flor amarillo",
      total: 2000,
    },
    {
      nombre: "Flor morado",
      total: 3000,
    },
    {
      nombre: "Pala draga",
      total: 2000,
    },
    {
      nombre: "Abono",
      total: 5000,
    },
    {
      nombre: "Insecticida",
      total: 5000,
    },
    {
      nombre: "triple 15",
      total: 2000,
    },
    {
      nombre: "Tierra negra",
      total: 5000,
    },
    {
      nombre: "Arena",
      total: 4000,
    },
    {
      nombre: "Cascarilla",
      total: 3000,
    },
    {
      nombre: "Algarrobo",
      total: "",
    },
    {
      nombre: "Palmoriche",
      total: "",
    },
  ]);

  const [rowData2] = useState([
    {
      nombre2: "",
      total2: "",
    },
  ]);

  const columnDefs = [
    { headerName: "Material solicitada", field: "nombre" },
    { headerName: "Cantidad", field: "total" },
  ];

  const columnDefs2 = [
    { headerName: "Material", field: "nombre2" },
    { headerName: "Cantidad", field: "total2" },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button class="btn btn-2 btn-primary text-capitalize" type="button">
            Remover
          </button>
        </div>
      ),
    },
  ];

  let gridApi;
  const defaultColDef = {
    sortable: true,
    editable: false,
    flex: 1,
    filter: true,
    floatingFilter: false,
    suppressMovable: true,
  };
  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const [native, setNative] = useState("");
  const onNativeChange = (e) => {
    setNative(e.target.value);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    setSelectedMover(data.options.value);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-sm-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Mover Material Vegetal</h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <div className="row mt-3 mb-4">
            <div className="col px-6">
              <label>Tipo de movimiento</label>
              <Select
                defaultValue={selectedMover}
                onChange={setSelectedMover}
                options={opcMover}
                placeholder="Seleccionar"
              />
            </div>

            <div className="col px-6">
              <label>Fecha de movimiento:</label>
              <input type="date" value={native} onChange={onNativeChange} />
            </div>

            {selectedMover.value === "Desde" ? (
              <div>
                <div className="row mt-3">
                  <div className="col px-6">
                    <label>Seleccionar vivero de destino</label>
                    <Controller
                      name="opcVivDes"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={opcVivDes}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errors.opcVivDes && (
                      <p className=" form-control ms-0 text-danger">
                        Este campo es obligatorio
                      </p>
                    )}
                  </div>
                  <div className="col-12 col-sm-6 ">
                    <button
                      className="mt-4 btn btn-primary text-capitalize "
                      type="submit"
                    >
                      Buscar
                    </button>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col ms-5">
                    <div
                      className="ag-theme-alpine mt-4 mb-6 "
                      style={{ height: "500px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        debounceVerticalScrollbar={true}
                        rowSelection={"single"}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                      ></AgGridReact>
                    </div>
                  </div>
                  <div
                    className="col "
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "nowrap",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <label>Cantidad de material a mover</label>
                    <input placeholder="Escribe la cantidad"></input>
                    <div>
                      <button
                        className="btn btn-2 btn-primary mt-4 text-capitalize"
                        type="button"
                        style={{ width: "150px" }}
                      >
                        Mover
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-2 btn-primary text-capitalize"
                        type="button"
                        style={{ width: "150px" }}
                      >
                        Mover todo
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-2 btn-primary text-capitalize"
                        type="button"
                        style={{ width: "150px" }}
                      >
                        Remover todo
                      </button>
                    </div>
                  </div>

                  <div className="col me-5">
                    <div
                      className="ag-theme-alpine mt-4 mb-6"
                      style={{ height: "500px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs2}
                        rowData={rowData2}
                        debounceVerticalScrollbar={true}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                      ></AgGridReact>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="col-6 btn btn-2 btn-danger ms-4 me-8 text-capitalize"
                      type="button"
                      style={{ width: "150px" }}
                    >
                      Cancelar
                    </button>

                    <input
                    className="btn btn-2 btn-secondary ms-4  text-capitalize"
                    type="submit"
                    style={{ width: "150px" }}
                    value="Mover"
                  />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {selectedMover.value === "Entre" &&
            selectedViveroOrigen &&
            selectedViveroDestino ? (
              <div>
                <div className="row mt-3">
                  <div className="col px-6">
                    <label>Seleccionar vivero de origen</label>
                    <Controller
                      name="opcVivOri"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={opcVivOri}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errors.opcVivOri && (
                      <p className=" form-control ms-0 text-danger">
                        Este campo es obligatorio
                      </p>
                    )}
                  </div>

                  <div className="col px-6">
                    <label>Seleccionar vivero de destino</label>
                    <Controller
                      name="opcVivDes2"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={opcVivDes2}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errors.opcVivDes2 && (
                      <p className=" form-control ms-0 text-danger">
                        Este campo es obligatorio
                      </p>
                    )}
                  </div>

                  <div className="col-12 col-sm-6 ">
                    <button
                      className="mt-4 btn btn-primary text-capitalize "
                      type="submit"
                    >
                      Buscar
                    </button>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col ms-5">
                    <div
                      className="ag-theme-alpine mt-4 mb-6 "
                      style={{ height: "500px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        debounceVerticalScrollbar={true}
                        rowSelection={"single"}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                      ></AgGridReact>
                    </div>
                  </div>
                  <div
                    className="col "
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "nowrap",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <label>Cantidad de material a mover</label>
                    <input placeholder="Escribe la cantidad"></input>
                    <div>
                      <button
                        className="btn btn-2 btn-primary mt-4 text-capitalize"
                        type="button"
                        style={{ width: "150px" }}
                      >
                        Mover
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-2 btn-primary text-capitalize"
                        type="button"
                        style={{ width: "150px" }}
                      >
                        Mover todo
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-2 btn-primary text-capitalize"
                        type="button"
                        style={{ width: "150px" }}
                      >
                        Remover todo
                      </button>
                    </div>
                  </div>

                  <div className="col me-5">
                    <div
                      className="ag-theme-alpine mt-4 mb-6"
                      style={{ height: "500px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs2}
                        rowData={rowData2}
                        debounceVerticalScrollbar={true}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                      ></AgGridReact>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="col-6 btn btn-2 btn-danger ms-4 me-8 text-capitalize"
                      type="button"
                      style={{ width: "150px" }}
                    >
                      Cancelar
                    </button>

                    <input
                    className="btn btn-2 btn-secondary ms-4  text-capitalize"
                    type="submit"
                    style={{ width: "150px" }}
                    value="Mover"
                  />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {selectedMover.value === "En" ? (
              <div>
                <div className="row mt-3">
                  <div className="col px-6">
                    <label>Seleccionar vivero</label>
                    <Controller
                      name="opcViv"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={opcViv}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errors.opcViv && (
                      <p className=" form-control ms-0 text-danger">
                        Este campo es obligatorio
                      </p>
                    )}
                  </div>
                  <div className="col-12 col-sm-6 ">
                    <button
                      className="mt-4 btn btn-primary text-capitalize "
                      type="submit"
                    >
                      Buscar
                    </button>
                  </div>

                  <div className="col px-6"></div>
                </div>
                <div className="row mt-2">
                  <div className="col ms-5">
                    <div
                      className="ag-theme-alpine mt-4 mb-6 "
                      style={{ height: "500px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        debounceVerticalScrollbar={true}
                        rowSelection={"single"}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                      ></AgGridReact>
                    </div>
                  </div>
                  <div
                    className="col "
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "nowrap",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <label>Cantidad de material a mover</label>
                    <input placeholder="Escribe la cantidad"></input>
                    <div>
                      <button
                        className="btn btn-2 btn-primary mt-4 text-capitalize"
                        type="button"
                        style={{ width: "150px" }}
                      >
                        Mover
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-2 btn-primary text-capitalize"
                        type="button"
                        style={{ width: "150px" }}
                      >
                        Mover todo
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-2 btn-primary text-capitalize"
                        type="button"
                        style={{ width: "150px" }}
                      >
                        Remover todo
                      </button>
                    </div>
                  </div>

                  <div className="col me-5">
                    <div
                      className="ag-theme-alpine mt-4 mb-6"
                      style={{ height: "500px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs2}
                        rowData={rowData2}
                        debounceVerticalScrollbar={true}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                      ></AgGridReact>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="col-6 btn btn-2 btn-danger ms-4 me-8 text-capitalize"
                      type="button"
                      style={{ width: "150px" }}
                    >
                      Cancelar
                    </button>

                    <input
                    className="btn btn-2 btn-secondary ms-4  text-capitalize"
                    type="submit"
                    style={{ width: "150px" }}
                    value="Mover"
                  />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

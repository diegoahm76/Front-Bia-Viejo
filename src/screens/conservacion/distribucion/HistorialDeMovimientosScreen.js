import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Subtitle from "../../../components/Subtitle";



const HistorialDeMovimientosScreen = () => {


  const [selectTipoMovimiento, setSelectTipoMovimiento] = useState({})
  const opcTipoMov = [
    { label: "En el vivero", value: "En" },
    { label: "Desde el vivero", value: "Desde" },
    { label: "Hacia el vivero", value: "Hacia" },
  ];

const [selectVivero, setSelectVivero] = useState({})
  const opcVivero = [
    { label: "Villavicencio", value: "VI" },
    { label: "Puerto Lopez", value: "PL" },
    { label: "San Juan de Arama", value: "SJ" },
    { label: "Puerto Rico", value: "PR" },
    { label: "La Macarena", value: "LM" },
    { label: "Mapiripan", value: "MA" },
  ];
const [selectMovimiento, setSelectMovimiento] = useState({})
const opcMovimiento=[
    { label: "De eras a Disponible", value: "DD" },
    { label: "Desde almacen", value: "DA" },
    { label: "Desde vivero general a viveros", value: "VGV" },
  ];

  
  const {
    register,
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const {
    
    control: control2,
    
  } = useForm();
  const {
    control: control3,
  }=useForm();

  const onSubmit = (data) => {
   
    setSelectMovimiento(data.selectMovimiento);
    setSelectTipoMovimiento(data.selectTipoMovimiento);
    setSelectVivero(data.selectVivero);
    console.log(data);
  };


  let gridApi;
  const defaultColDef = {
    sortable: true,
    editable: false,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: true,
    suppressMovable: true,
  };

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const [formValues, setFormValues] = useState({
    fechaIngreso: "",
  });

  const columnasMaterialHistorial = [
    { headerName: "Material Vegetal", field: "matVeg" },
    { headerName: "Cantidad", field: "canti" },
    { headerName: "Fecha de movimiento", field: "Fecmo" },
    { headerName: "Tipo de movimeinto", field: "tipomov" },
   
  ];

  const [datosFilasAgregar] = useState([
    {
      matVeg: "Yopo",
      canti: 2000,
      Fecmo:"15/10/2022",
      tipomov:"en el vivero/ de las eras a disponible",
    },
    {
      matVeg: "Pomaroso",
      canti: 4000,
      Fecmo: "13/09/2022",
      tipomov: "en el vivero/ de las eras a disponible",
    },
    {
      matVeg: "Flor amarillo",
      canti: 2000,
      Fecmo: "",
      tipomov: "en el vivero/ de las eras a disponible",
    },
    {
      matVeg: "Flor morado",
      canti: 3000,
      Fecmo: "",
      tipomov: "en el vivero/ de las eras a disponible",
    },
    {
      matVeg: "Pala draga",
      canti: 2000,
      Fecmo: "",
      tipomov: "en el vivero/ de las eras a disponible",
    }, 
    {
      matVeg: "Algarrobo",
      canti: "",
 
 Fecmo:"" ,
tipomov: "en el vivero/ de las eras a disponible",   },
    {
      matVeg: "Palmoriche",
      canti: "",
 
 Fecmo: "",
tipomov: "en el vivero/ de las eras a disponible",   },
       
  ]);
  
  return (
    <div className="row min-vh-100">
    <div className="col-lg-12 col-md-10 col-12 mx-auto">
     

      <form
        className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
        data-animation="FadeIn"
        onSubmit={handleSubmit(onSubmit)}
        id="configForm"
      >
         <h3 className="mt-3 ms-3 text-start fw-light mb-3">
        Historial de movimientos de material vegetal
      </h3>
        <div className="multisteps-form__content">
          <Subtitle
          title={"Informacion del historial de movimientos"}/>
          <div className="mt-4 row align-items-end">
            <div className="col-6 col-sm-3 ">
              <label className=" text-terciary">Tipo de movimiento: </label>
              <Controller
                name="options"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={opcTipoMov}
                    placeholder="Seleccionar"
                  />
                )}
              />
              {errors.options && (
                <p className=" form-control ms-0 text-danger">
                  Este campo es obligatorio
                </p>
              )}
            </div>
            <div className="col-6 col-sm-3 ">
              <label className=" text-terciary">Seleccionar Vivero: </label>
              <Controller
                name="options"
                control={control2}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={opcVivero}
                    placeholder="Seleccionar"
                  />
                )}
              />
              {errors.options && (
                <p className=" form-control ms-0 text-danger">
                  Este campo es obligatorio
                </p>
              )}
            </div>
            <div className="col-6 col-sm-3 ">
              <label className=" text-terciary">Movimiento de material: </label>
              <Controller
                name="options"
                control={control3}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={opcMovimiento}
                    placeholder="Seleccionar"
                  />
                )}
              />
              {errors.options && (
                <p className=" form-control ms-0 text-danger">
                  Este campo es obligatorio
                </p>
              )}
            </div>
            
            <div className="col-6 col-sm-3">
                    <label  className="text-terciary">
                      Fecha de Movimiento: <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="fechaMovimiento"
                      control={control}
                      render={({ field }) => (
                        <ReactDatePicker
                          {...field}
                          locale="es"
                          className="form-control border rounded-pill px-3 border border-terciary "
                          dateFormat="dd/MM/yyyy"
                          placeholderText="dd/mm/aaaa"
                          selected={formValues.fechaIngreso}
                          onSelect={(e) =>
                            setFormValues({ ...formValues, fechaMovimiento: e })
                          }
                        />
                      )}
                    />
                      {errors.options && (
                <p className=" form-control ms-0 text-danger">
                  Este campo es obligatorio
                </p>
              )}
                  </div>
            </div>
            <div className="row mt-2 justify-content-end">
              <div className="col-6 col-sm-3 ">
                <button className=" btn px-3 text-capitalize" title="Generar"><i class="fa-regular fa-file-excel fs-3"></i><i class="fa-regular fa-file-pdf fs-3"></i></button>
              </div>

            </div>
            <div className="row mt-4">

            <div id="myGrid" className="ag-theme-alpine ">
                    <div
                      className="ag-theme-alpine"
                      style={{ height: "250px" }}
                    >
                      <AgGridReact
                        columnDefs={columnasMaterialHistorial}
                        rowData={datosFilasAgregar}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                      ></AgGridReact>
                    </div>
                  </div>
            </div>
            </div>
            </form>
            </div>
            </div> 
  )
}
export default HistorialDeMovimientosScreen
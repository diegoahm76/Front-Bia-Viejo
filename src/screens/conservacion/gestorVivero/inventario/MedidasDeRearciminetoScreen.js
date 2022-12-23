import React from 'react'
import Select from "react-select";
import { useState } from 'react';
import { Controller, useForm} from "react-hook-form";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { SubTitle } from 'chart.js';
import Subtitle from '../../../../components/Subtitle';


const rowDataInicial=[
  { name1: "Rahul", numberExpedient:"3.11.019.111", vivero: "Villavicencio", number: 23120, acto: "PS-GJ 1.2.64.21.2055.", password:"********",}, 
  { name1: "David", numberExpedient:"3.11.019.111", vivero: "Puerto López", number: 1235, acto: "PS-GJ 1.2.64.21.2055.", password:"********",}, 
  { name1: "Dan", numberExpedient:"3.11.019.111", vivero: "Mapiripan", number: 36541, acto: "PS-GJ 1.2.64.21.2055.", password:"********",},
  { name1: "Rahul", numberExpedient:"3.11.019.111", vivero: "Villavicencio", number: 23120, acto: "PS-GJ 1.2.64.21.2055.", password:"********",}, 
  { name1: "David", numberExpedient:"3.11.019.111", vivero: "La Macarena", number: 1235, acto: "PS-GJ 1.2.64.21.2055.", password:"********",}, 
  { name1: "Dan", numberExpedient:"3.11.019.111", vivero: "La Macarena", number: 36541, acto: "PS-GJ 1.2.64.21.2055.", password:"********",},
  { name1: "Rahul", numberExpedient:"3.11.019.111", vivero: "Puerto Rico", number: 23120, acto: "PS-GJ 1.2.64.21.2055.", password:"********",}, 
  { name1: "David", numberExpedient:"3.11.019.111", vivero: "San Juan de Arama", number: 1235, acto: "PS-GJ 1.2.64.21.2055.", password:"********",}, 

]

//Opciones del vivero
const optionsSeleccioneVivero = [
  { label: "Seleccionar", value: "S" },
  { label: "Villavicencio", value: "V" },
  { label: "Puerto López", value: "PL" },
  { label: "Puerto Rico", value: "PR" },
  { label: "La Macarena", value: "MC" },
  { label: "Mapiripan", value: "MP" },
  { label: "San Juan de Arama", value: "SJA" },
];


const MedidasDeRearciminetoScreen = () => {
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [rowData, setRowData] = useState(rowDataInicial)
  const {control, handleSubmit, formState: { errors },} = useForm();

  //función del botón
  const handleSearch = () => {
    const dataFilter = rowDataInicial.filter((data) => {
      if(selectedCategory === "Seleccionar"){
      return true
      }
      if (selectedCategory === data.vivero){
      return true
      } 
      return false
    })
    setRowData(dataFilter)
  }

  const submit = (data) => {

  }


  //Encabezados de las columnas  
  const columnDefs= [
    { headerName: "Nombre Común", 
    field: "name1",
    minwidth: 150
    },

    { headerName: "Nombre Científico", 
    field: "name1",
    minwidth: 150
    },

    {headerName: "Viveros",
    field: "vivero",
    minwidth: 150
    },

    { headerName: "Expediente", 
      field: "numberExpedient",
      minwidth: 150
    },

    { headerName: "Acto administrativo", 
      field: "acto",
      minwidth: 150
 
    },
      
    { headerName: "Acuerdo Fiscalía", 
      field:"password",
      minwidth: 150

    }, 
    
    {headerName: "Afectado",
      field: "name1",
      minwidth: 150

    },

    {headerName: "Información", field:"acción",
      cellRendererFramework:(params)=>
      <div>
        <button type="button" onClick ={() => onExportClick()} className="btn btn-sm  p-2 mx-auto my-auto d-block"> <i class="fa-solid fa-eye fs-3"></i> </button>
      </div>
    },

    { headerName: "Total",
      field: "number",
  
    },

  ]
  //detalles en columnas tabla
  const defaultColDef={
    sortable:true,
    flex:1,
    wrapHeaderText:true,
    autoHeaderHeight: true,
    floatingFilter: false,
    resizable: true,
  
  }
  
  let gridApi;
    const onGridReady=(params)=>{
      gridApi = params.api
    }

    const onExportClick =()=> {
      gridApi.exportDataAsCsv();
    }




  return (
    <div className='row min-vh-100'>
    <div className="col-lg-12 col-md-10 col-12 mx-auto">
    

      <form className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative" data-animation="FadeIn" onSubmit={handleSubmit(submit)}
      id="configForm" >
  <h3 className ="mt-3 mb-0 mb-4">Inventario Vivero</h3>
    <Subtitle title={"Medidas de resarcimiento"}/>
        <div className= "row mt-3">
          <div className ="col-12 col-md-4">
            <label className="form-floating input-group input-group-dynamic ms-2"> Seleccionar Vivero: <span className="text-danger">*</span></label>
            <Controller
            name="seleccioneVivero"
            control={control}
            //rules={{
            //required: true,
            //}}        
            render={({ field }) => (
            <Select
            className= "mt-0 mb-3"
            {...field}
            defaultValue={selectedCategory}
            onChange={(e) => setSelectedCategory(e.label)}
            options={optionsSeleccioneVivero}
            placeholder="Seleccionar"
            />)}/>
                    
            {errors.selectedCategory?.type === 'required' &&
              <small className="text-danger">Este campo es obligatorio </small>
            }
                        
          </div>
                      
          <div className="col-6 mt-4 p-1">
            <button type="button" onClick={handleSearch} className="btn "><i class="fa-solid fa-magnifying-glass fs-3"></i></button>
          </div>

        
      

          <div className ="d-flex justify-content-end mb-2">
            <label> Total: </label>
            <input className="w-10 mb-1 mx-2" ></input>
          </div>
        </div>
                    
                    
        <div className="ag-theme-alpine" style={ {height: '350px',} }>    
            
            <AgGridReact
            columnDefs={columnDefs}
            rowData={rowDataInicial}
            debounceVerticalScrollbar={true}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={8}
            paginationAutoPageSize={true}
            suppressColumnVirtualisation={true}
            suppressRowVirtualisation={true}
            onGridReady={onGridReady}>      
            </AgGridReact>

          </div>
                 
      </form>
    </div>                       
  </div>
  )
}
export default MedidasDeRearciminetoScreen
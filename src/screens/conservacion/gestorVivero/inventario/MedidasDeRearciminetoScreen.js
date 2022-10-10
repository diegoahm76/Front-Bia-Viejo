import React from 'react'
import Select from "react-select";
import { useState } from 'react';
import { Controller, useForm} from "react-hook-form";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


const rowDataInicial=[
  { name1: "Rahul", numberExpedient:"3.11.019.111", vivero: "Villavicencio", number: 9876543210, acto: "PS-GJ 1.2.64.21.2055.", password:"********",}, 
  { name1: "David", numberExpedient:"3.11.019.111", vivero: "Puerto López", number: 9827654310, acto: "PS-GJ 1.2.64.21.2055.", password:"********",}, 
  { name1: "Dan", numberExpedient:"3.11.019.111", vivero: "Mapiripan", number: 9765438210, acto: "PS-GJ 1.2.64.21.2055.", password:"********",},
  { name1: "Rahul", numberExpedient:"3.11.019.111", vivero: "Villavicencio", number: 9876543210, acto: "PS-GJ 1.2.64.21.2055.", password:"********",}, 
  { name1: "David", numberExpedient:"3.11.019.111", vivero: "La Macarena", number: 9827654310, acto: "PS-GJ 1.2.64.21.2055.", password:"********",}, 
  { name1: "Dan", numberExpedient:"3.11.019.111", vivero: "La Macarena", number: 9765438210, acto: "PS-GJ 1.2.64.21.2055.", password:"********",},
  { name1: "Rahul", numberExpedient:"3.11.019.111", vivero: "Puerto Rico", number: 9876543210, acto: "PS-GJ 1.2.64.21.2055.", password:"********",}, 
  { name1: "David", numberExpedient:"3.11.019.111", vivero: "San Juan de Arama", number: 9827654310, acto: "PS-GJ 1.2.64.21.2055.", password:"********",}, 

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
  const {control, formState: { errors },} = useForm();

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
        <button type="button" onClick ={() => onExportClick()} className="btn btn-sm btn-primary p-2 mx-auto my-auto d-block"> Ver </button>
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
      <h1 className ="mt-3 mb-0 text-center mb-6">Medidas de resarcimiento</h1>

      <form className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative" data-animation="FadeIn" >
        <div className= "row">
          <div className ="col-12 col-md-4">
            <label htmlFor="exampleFormControlInput1" className="form-label"> Seleccionar Vivero: <span className="text-danger">*</span></label>
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
                      
          <div className="col-6 mt-4">
            <button type="button" onClick={handleSearch} className="btn btn-primary">Buscar</button>
          </div>

        
      

          <div className ="d-flex justify-content-end mb-2">
            <label> Total: </label>
            <input className="w-10 mb-1 mx-2" ></input>
          </div>
        </div>
                    
                    
        <div className="ag-theme-alpine" style={ {height: '350px',} }>    
            
            <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
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
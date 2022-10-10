import React from 'react'
import { useState } from 'react';
import Select from "react-select";
import { Controller, useForm } from 'react-hook-form';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';




const rowDataInicial=[
    { name:"Carlos", documento: "Cédula de Ciudadanía", number:1, time: "9:00", numberFrecuency: 2,  password:"********", dniNumber: 111111111, dependency:"Gestión Ambiental", groups: "Suelos"}, 
    { name: "Argenis", documento: "Cédula de Ciudadanía", number:2, time: "9:00", numberFrecuency: 1,  password:"********", dniNumber: 111111111, dependency:"Archivo", groups: "Aguas"}, 
    { name: "Ivan", documento: "Cédula de extranjería", number:2, time: "9:00", numberFrecuency: 2,  password:"********", dniNumber: 111111111, dependency: "Administración Financiera", groups: "Aire y Urbano"},
    { name: "Carlos", documento: "Pasaporte", number:3, time: "9:00", numberFrecuency: 1,  password:"********", dniNumber: 111111111, dependency:"Gestión Ambiental", groups: "Bióticos"}, 
    { name: "Luis", documento: "Pasaporte", number:4, time: "9:00", numberFrecuency: 2,  password:"********", dniNumber: 111111111, dependency:"Gestión Ambiental", groups: "Aguas"}, 
    { name: "Fernando", documento: "Cédula de Ciudadanía", number:4, time: "9:00", numberFrecuency: 2,  password:"********", dniNumber: 111111111, dependency:"Archivo", groups: "Bióticos"},
    { name: "Antonio", documento: "Cédula de Ciudadanía", number:2, time: "9:00", numberFrecuency: 1,  password:"********", dniNumber: 111111111, dependency: "Administración Financiera", groups: "Bióticos" }, 
    { name: "Ivan", documento: "Cédula de Ciudadanía", number:1, time: "9:00", numberFrecuency: 1,  password:"********", dniNumber: 111111111, dependency: "Administración Financiera", groups: "Aire y Urbano"}, 
]

const optionsDniDocuments = [
    { label: "Cédula de ciudadanía"},
    { label: "Cédula de extranjería"},
    { label: "Pasaporte"},
    { label: "NIT"},

]

const optionsDependencies =[
    {label: "Gestión Ambiental"},
    {label: "Administración Financiera"},
    {label: "Dirección"},
]

 const optionsGroups=[
    {label: "Suelos"},
    {label: "Bióticos"},
    {label: "Aguas"},

]

const BusquedaPersonalScreen = () => {

    const [selectedDniDocuments, setSelectedDniDocuments,] = useState(null);
    const [selectedDependencies, setSelectedDependencies,] = useState(null);
    const [selectedGroups, setSelectedGroups,] = useState(null);
    const [rowData, setRowData] = useState(rowDataInicial)
    const { register, handleSubmit, control } = useForm();

    const columnDefs= [
        
        { headerName: "Nombre", 
        field: "name",
        },

        { headerName: "Tipo de documento", 
        field: "documento",
        
    
        },
    
        { headerName: "Número de documento", 
        field: "dniNumber", 
    
        },
    
        {headerName: "Dependencia",
        field: "dependency",
    
        },
    
        { headerName: "Grupos", 
          field: "groups",
    
        },
    

    ]

    const submit = (data) => {

    }


    const defaultColDef={
        sortable:true,
        flex:1,
        wrapHeaderText:true,
        autoHeaderHeight: true,
        floatingFilter: false,
        resizable: true,
        width: 100,

      }
    
      
    let gridApi;
    const onGridReady=(params)=>{
        gridApi = params.api
    }
      


  return (
    <div className='row min-vh-100'>
        <div className="col-lg-12 col-md-10 col-12 mx-auto">
            <h3 className="mt-3 mb-0 text-center mb-6"> Búsqueda de Personal</h3>
                    
                <form className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative" data-animation="FadeIn" onSubmit={handleSubmit(submit)} id="configForm">

                    <div className= "row">
                        <div className="col-12 col-md-4 mt-3">
                            <div className="input-group input-group-dynamic">
                                <label htmlFor="exampleFormControlInput1" className="form-label"> Nombre: <span className="text-danger">*</span></label>
                                 <input className="multisteps-form__input form-control mt-4" type="text"{...register("name")}/>
                            </div>
                        </div>
                                                        
                        <div className="col-12 col-md-4 mt-0">
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-4"> Tipo de documento: <span className="text-danger">*</span></label>
                            <Controller
                            name="tipoDocumento"
                            control={control}
                            rules={{
                            required: true,
                            }}
                            render={({ field }) => (
                            <Select
                            {...field}
                            className="col-11 mx-1"
                            defaultValue={selectedDniDocuments}
                            onChange={setSelectedDniDocuments}
                            options={optionsDniDocuments}
                            placeholder="Seleccionar" 
                            />
                             )}
                            />
                        </div>

                        <div className="col-12 col-md-4 mt-3">
                            <div className="input-group input-group-dynamic">
                                <label htmlFor="exampleFormControlInput1" className="form-label"> Número de documento: <span className="text-danger">*</span></label>
                                <input className="multisteps-form__input form-control mt-4" type="number" {...register("numberDocument")}/>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 mt-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-4">Dependencia: <span className="text-danger">*</span></label>
                            <Controller
                            name="dependencies"
                            control={control}
                            rules={{
                            required: true,
                            }}
                            render={({ field }) => (
                            <Select
                            {...field}
                            className="col-11 mx-1"
                            defaultValue={selectedGroups}
                            onChange={setSelectedGroups}
                            options={optionsGroups}
                            placeholder="Seleccionar"
                            />
                             )}
                            />
                        </div>

                        <div className="col-12 col-md-4 mt-3">
                            
                            <label htmlFor="exampleFormControlInput1" className="form-label mt-4">Grupos: <span className="text-danger">*</span></label>
                            <Controller
                            name="dependencies"
                            control={control}
                            rules={{
                            required: true,
                            }}
                            render={({ field }) => (
                            <Select
                            {...field}
                            className="col-11 mx-1"
                            defaultValue={selectedDependencies}
                            onChange={setSelectedDependencies}
                            options={optionsDependencies}
                            placeholder ="Seleccionar"
                            />
                             )}
                            />
                        </div>

                        <div className="col-12 col-md-4 mt-3 d-flex justify-content-start my-2 p-5">
                            <button type="button" className="btn btn-primary mx-2">Buscar</button>
                        </div>

                    </div>


                    <div className="ag-theme-alpine mt-5" style={ {height: '400px',} }>    
                        <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        debounceVerticalScrollbar={true}
                        defaultColDef={defaultColDef}
                        pagination={true}
                        paginationPageSize={8} 
                        onGridReady={onGridReady}>
                        </AgGridReact>
                    </div>


                    <div className="d-flex justify-content-end mt-5">
                        <button type="button" className="btn btn-primary mx-2">Limpiar</button>
                        <button type="button" className="btn btn-secondary mx-2 p-2">Aceptar</button>
                        <button type="button" className="btn btn-danger mx-2">Salir</button>
                    </div>
     
                </form>
        </div>
    </div>

  
  )
}

export default BusquedaPersonalScreen
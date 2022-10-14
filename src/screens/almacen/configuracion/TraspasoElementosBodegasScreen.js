import React from 'react'
import { useState } from 'react';
import Select from "react-select";
import DatePicker from "react-datepicker";
import { Controller, useForm } from 'react-hook-form';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';



const rowDataInicial=[
    { name:"Carlos", documento: "Cédula de Ciudadanía", number:111111, time: "9:00", numberFrecuency: 2,  password:"********", dniNumber: 111111111, dependency:"Gestión Ambiental", groups: "Suelos", item:"Esfero", item2:"Bic", precio:"1000000"}, 
    { name: "Argenis", documento: "Cédula de Ciudadanía", number:222222, time: "9:00", numberFrecuency: 1,  password:"********", dniNumber: 111111111, dependency:"Archivo", groups: "Aguas", item:"Computador", item2:"Asus", precio:"1000000"}, 
    { name: "Ivan", documento: "Cédula de extranjería", number:333333, time: "9:00", numberFrecuency: 2,  password:"********", dniNumber: 111111111, dependency: "Administración Financiera", groups: "Aire y Urbano", item:"Mesas", item2:"Patito", precio:"1000000"},
    { name: "Carlos", documento: "Pasaporte", number:444444, time: "9:00", numberFrecuency: 1,  password:"********", dniNumber: 111111111, dependency:"Gestión Ambiental", groups: "Bióticos", item:"Esfero", item2:"Bic", precio:"1000000"}, 
    { name: "Luis", documento: "Pasaporte", number:555555, time: "9:00", numberFrecuency: 2,  password:"********", dniNumber: 111111111, dependency:"Gestión Ambiental", groups: "Aguas", item:"Esfero", item2:"Bic", precio:"1000000"}, 
    { name: "Fernando", documento: "Cédula de Ciudadanía", number:666666, time: "9:00", numberFrecuency: 2,  password:"********", dniNumber: 111111111, dependency:"Archivo", groups: "Bióticos", item:"Computador", item2:"Asus", precio:"1000000"},
    { name: "Antonio", documento: "Cédula de Ciudadanía", number:777777, time: "9:00", numberFrecuency: 1,  password:"********", dniNumber: 111111111, dependency: "Administración Financiera", groups: "Bióticos", item:"Computador", item2:"Asus", precio:"1000000" }, 
    { name: "Ivan", documento: "Cédula de Ciudadanía", number:888888, time: "9:00", numberFrecuency: 1,  password:"********", dniNumber: 111111111, dependency: "Administración Financiera", groups: "Aire y Urbano", item:"Mesas", item2:"Rimax", precio:"1000000" }, 
]

const optionsDocumentSelection = [
    { label: "Seleccione opción"},
    { label: "Cédula de ciudadanía"},
    { label: "Cédula de extranjería"},
    { label: "Pasaporte"},
    { label: "NIT"}
]

const optionsDniNumbers = [
    { label: "Seleccione opción"},
    { label: "1111111111"},
    { label: "1212121212"},
    { label: "1010101011"},
]


const optionsProfessional= [
    { label: "Cesar Camacho"},
    { label: "Argenis Alarcón"},
    { label: "Mónica Ospina"}
]

const optionsCellar= [
    { label: "Villavicencio/Principal"},
    { label: "Villavicencio/San Antonio"},
    { label: "Macarena"}
]

const TraspasoElementosBodegasScreen = () => {

    const [selectedIdDocument, setSelectedIdDocument] = useState(null);
    const [selectProfessional, setSelectedProfessional ] = useState(null);
    const [selectNumberId, setSelectedNumberId] = useState(null);
    const [selectCellar, setSelectedCellar] = useState(null);
    const [rowData, setRowData] = useState(rowDataInicial)
    const { register, handleSubmit, control } = useForm();
    

    const columnDefs= [
        
        { headerName: "Codigo", 
        field: "number",
        },

        { headerName: "Nombre", 
        field: "item",
        },
    
        { headerName: "Marca", 
        field: "item2", 
        },
    
        {headerName: "Serial",
        field: "number",
        },
    
        { headerName: "Id único", 
          field: "number",
        },

        { headerName: "Cantidad", 
          field: "numberFrecuency",
        },

        {headerName: "Bodega", field:"acción",
        cellRendererFramework:(params)=>
        <div>
            <Controller
            name="bodega"
            control={control}
            //rules={{
            //required: true,
            //}}
            render={({ field }) => (
            <Select 
            {...field}
            {...register("bodega")}
            className=" p-2 d-block"
            defaultValue={selectCellar}
            onChange={setSelectedCellar}
            options={optionsCellar}
            placeholder="Seleccionar"
            />
            )}
            />
        </div>,
        minWidth: 180
    },

        { headerName: "Valor unitario", 
          field: "precio",
    
        }, 

        { headerName: "Valor total", 
          field: "precio",
        }, 
    ]

    const defaultColDef={
        sortable:true,
        flex:1,
        editable: true,
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
    
    const [formValues, setFormValues] = useState({
        fechaTraspaso: "",
      
    });
    
    const [page, setPage] = useState(1);

    const submit = (data) => {
        if (page === 1) setPage(2);
        if (page === 2) console.log(data);
    };
    
    const handlePreviousPage = () => {
        setPage(1);
      };
  
  
    return (
    <div className='row min-vh-100'>
          <div className="col-lg-12 col-md-10 col-12 mx-auto">
            <h3 className="mt-3 mb-0 text-center mb-6"> Traspaso de elementos en bodegas</h3>
        
            <form className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative" data-animation="FadeIn" onSubmit={handleSubmit(submit)} id="configForm">
                  
                <div className= "row" hidden={page === 2}>
                    <div className="col-12 col-md-4 mt-2">
                        <div className="input-group input-group-dynamic">
                            <label className="form-floating input-group input-group-dynamic ms-2"> Código: <span className="text-danger"{...register("code")}>*</span> </label>
                            <input className="multisteps-form__input form-control" type="number"/>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 mt-2 mb-4">
                        <div className="input-group input-group-dynamic">
                            <label className="form-floating input-group input-group-dynamic ms-2"> Fecha: <span className="text-danger">*</span> </label>
                                
                            <Controller
                            name="fechaTraspaso"
                            control={control}
                            render={({ field }) => (
                            <DatePicker
                            {...field}
                            {...register("fecha")}
                            locale="es"
                            //required
                            selected={formValues.fechaTraspaso}
                            onSelect={(e) =>
                            setFormValues({ ...formValues, fechaTraspaso: e })
                            }
                            className="multisteps-form__input form-control  p-2"
                            placeholderText="dd/mm/aaaa"
                            />
                            )}
                            />
                        </div>
                    </div>

                    <div className ="col-12 d-flex justify-content-center mt-6 mb-5">  
                        <label className="form-floating input-group input-group-dynamic ms-4 my-2"> Quien traslada: </label> 
                        <Controller
                        name="tipoDocumento"
                        control={control}
                            //rules={{ 
                            //required: true,
                            //}}
                        render={({ field }) => (
                        <Select
                        {...field}
                        {...register("documentType")}
                        className="col-3 mx-1"
                        defaultValue={selectedIdDocument}
                        onChange={setSelectedIdDocument}
                        options={optionsDocumentSelection}
                        placeholder="Seleccionar"
                        />
                        )}
                        />
            
                        <Controller
                        name="numberDni"
                        control={control}
                            //rules={{
                            //required: true,
                            //}}
                        render={({ field }) => (
                        <Select
                        {...field}
                        {...register("numberId")}
                        className="col-3 mx-1"
                        defaultValue={selectNumberId}
                        onChange={setSelectedNumberId}
                        options={optionsDniNumbers}
                        placeholder="Seleccionar" 
                        />
                        )}
                        />
                            
                        <Controller
                        name="professional"
                        control={control}
                            //rules={{
                            //required: true,
                            //}}
                        render={({ field }) => (
                        <Select
                        {...field}
                        {...register("professional")}
                        className="col-3 mx-1"
                        defaultValue={selectProfessional}
                        onChange={setSelectedProfessional}
                        options={optionsProfessional}
                        placeholder="Seleccionar"
                        />
                        )}
                        />
                        
                        <div>
                            <button type="button" className="btn btn-primary mx-2 text-capitalize">Buscar</button>
                        </div>
                    </div>


                    <div className="col-12 col-md-4 mt-2">
                        <div className=" input-group input-group-dynamic">
                            <label className="form-floating input-group input-group-dynamic ms-2"> Bodegas de salida <span className="text-danger">*</span> </label>
                            <Controller
                            name="bodega"
                            control={control}
                            //rules={{
                            //required: true,
                            //}}
                            render={({ field }) => (
                            <Select 
                            {...field}
                            {...register("cellar")}
                            className="col-12 mt-3"
                            defaultValue={selectCellar}
                            onChange={setSelectedCellar}
                            options={optionsCellar}
                            placeholder="Seleccionar"/>
                            )}
                            />

                        </div>
                    </div>

                    <div className="row mt-5">            
                        <div className=" input-group input-group-dynamic">
                            <label className="form-floating input-group input-group-dynamic ms-2"> Concepto de: </label>            
                        </div>

                        <div className="d-flex justify-content-center mt-2">
                        <textarea  style={{height:"100px", width:"80%"}} type="text" placeholder="Por favor agregue concepto"/>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-4 mt-6">
                        <button className={`btn bg-gradient-danger mb-0 text-capitalize ${page === 1 && "d-none"}`} type="button" title="Send" onClick={handlePreviousPage}> {"<< Atrás"} </button>
                        <button className="btn bg-gradient-primary mb-0 text-capitalize" type="submit" title="Send" form="configForm">{page === 1 ? "Siguiente >>" : "Actualizar"} </button>
                    </div>
                </div>

                
                <div className="row col-12" hidden={page === 1}>
                    <div className ="d-flex justify-content-end mt-5">
                        <label> Valor total del traspaso: </label>
                        <input className="w-10 mb-1 mx-2" ></input>
                    </div>
                    
                    <div className="ag-theme-alpine mt-3" style={ {height: '400px',} }>    
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


                    <div className="d-flex justify-content-end gap-4 mt-5">
                        <button className={`btn bg-gradient-secondary text-capitalize ${page === 1 && "d-none"}`} type="button" title="Send" onClick={handlePreviousPage}> {"<< Atrás"} </button>
                        <button className="btn bg-gradient-primary text-capitalize" type="submit" title="Send" form="configForm">{page === 1 ? "Siguiente >>" : "Guardar"} </button>
                        <button type="button" className="btn btn-danger text-capitalize" >Salir </button>
                    </div>
                </div>
            </form>
        </div> 
    </div>
  )
}

export default TraspasoElementosBodegasScreen
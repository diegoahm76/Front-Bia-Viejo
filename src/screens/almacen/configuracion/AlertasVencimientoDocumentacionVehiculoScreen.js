import React from 'react'
import { useState } from 'react';
import Select from "react-select";
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import {activeModalAction, desactiveModalAction } from '../../../actions/modalActions';
import CalendarModal from "../../../components/CalendarModal";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import DatePicker from "react-datepicker";


const rowDataInicial=[
    { documento: "Póliza de Seguro", number:1, time: "9:00", numberFrecuency: 2,  password:"********",}, 
    { documento: "Certificado ATM", number:2, time: "9:00", numberFrecuency: 1,  password:"********",}, 
    { documento: "Seguro Obligatorio", number:2, time: "9:00", numberFrecuency: 2,  password:"********",},
    { documento: "Seguro Obligatorio", number:3, time: "9:00", numberFrecuency: 1,  password:"********",}, 
    { documento: "Certificado ATM", number:4, time: "9:00", numberFrecuency: 2,  password:"********",}, 
    { documento: "Póliza de Seguro", number:4, time: "9:00", numberFrecuency: 2,  password:"********",},
    { documento: "Certificado ATM", number:2, time: "9:00", numberFrecuency: 1,  password:"********",}, 
    { documento: "Certificado ATM", number:1, time: "9:00", numberFrecuency: 1,  password:"********",}, 
]

const optionsDocumentSelection = [
    { label: "Seguro obligatorio"},
    { label: "Certificado ATM"},
    { label: "Póliza de seguro"},
]


const AlertasVencimientoDocumentacionVehiculoScreen = () => {

    const [selectedIdDocument, setSelectedIdDocument] = useState(null);
    const [rowData, setRowData] = useState(rowDataInicial)
    const { register, handleSubmit, control } = useForm();
    const [formValues, setFormValues] = useState({
        fechaRecordatorio: "",});

    const submit = (data) => {

    }

    const dispatch = useDispatch();

    const handleOpenModal = () => {
    dispatch(activeModalAction());
    };

    const handleCloseModal = () => {
    dispatch(desactiveModalAction());
    };
    
    const columnDefs= [
        { headerName: "Tipo de documento", field: "documento"},
        { headerName: "Días de anticipación", field: "number"},
        { headerName: "Hora de recordatorio", field: "time"},
        { headerName: "Frecuencia", field: "numberFrecuency"},
        {headerName: "Información", field:"acción", cellRendererFramework:(params)=>
        <div>
          <button type="button" className="btn btn-sm btn-primary p-2 mx-auto my-auto d-block text-capitalize">Editar</button>
        </div>
        }
    ]

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
                <h3 className="mt-3 mb-0 text-center mb-6"> Configuración de alertas para vencimiento de documentación de vehículos </h3>        
            
            <form className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative" data-animation="FadeIn" onSubmit={handleSubmit(submit)} id="configForm">          
                <div className="row">
                    <div className="col-12 col-md-4 mt-4">
                        <label className="form-floating input-group input-group-dynamic mb-3" > Tipo de documento</label>        
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
                        defaultValue={selectedIdDocument}
                        onChange={setSelectedIdDocument}
                        options={optionsDocumentSelection}
                        placeholder="Seleccionar"
                        />
                        )}
                        />
                    </div>    
                                
                    <div className="col-12 col-md-4 mt-4">
                        <div className="input-group input-group-dynamic">
                            <label className="form-floating input-group input-group-dynamic ms-2"> Días de anticipación (Días): <span className="text-danger">*</span> </label>
                            <input className="multisteps-form__input form-control" type="number" {...register("numeroDias")}/>
                        </div>
                    </div>
    
                    <div className="col-12 col-md-4 mt-4">
                        <div className=" input-group input-group-dynamic">
                            <label className="form-floating input-group input-group-dynamic ms-2"> Recordatorio: <span className="text-danger">*</span> </label>
                            <Controller
                            name="fechaRecordatorio"
                            control={control}
                            render={({ field }) => (
                            <DatePicker
                            {...field}
                            {...register("fecha")}
                            locale="es"
                            //required
                            selected={formValues.fechaRecordatorio}
                            onSelect={(e) =>
                            setFormValues({ ...formValues, fechaRecordatorio: e })
                            }
                            className="multisteps-form__input form-control p-2"
                            placeholderText="dd/mm/aaaa"
                            />
                            )}
                            />
                        </div>
                        
                        <div className="form-check mx-auto">
                            <label className="form-check-label mx-2" htmlFor="flexCheckDefault"> a.m.</label>
                            <input className="form-check-input mx-2" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label mx-2" htmlFor="flexCheckDefault"> p.m.</label>
                            <input className="form-check-input mx-2" type="checkbox" value="" id="flexCheckDefault" />
                        </div>
                    </div>
                        
                        <div className="col-12 col-md-4 mt-4">
                            <div className="input-group input-group-dynamic">
                                <label className="form-floating input-group input-group-dynamic ms-2"> Frecuencia (Hora/as): <span className="text-danger">*</span> </label>
                                <input className="multisteps-form__input form-control" type="number" {...register("numeroFrecuencia")}/>
                            </div>
                        </div>
            
                    <div className="ag-theme-alpine mt-8" style={ {height: '300px',} }>    

                        <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        debounceVerticalScrollbar={true}
                        defaultColDef={defaultColDef}
                        pagination={true}
                        paginationPageSize={6} 
                        onGridReady={onGridReady}>
                        </AgGridReact>
                    </div>

                    <div className="d-flex justify-content-end mt-5">
                    <button type="button" onClick={handleOpenModal} className="btn btn-secondary text-capitalize mx-2 p-2"> Guardar </button>
                        <button type="button" className="btn btn-danger text-capitalize mx-2"> Salir </button>
                    </div>
                    
                </div>
   
            </form>
            <CalendarModal>
                    <div className="d-flex justify-content-center mt-10" >
                        <p >Los documentos: "seguro de póliza", vencerán el día 05/05/2022 </p> 
                    </div>
                    
                    <div className="d-flex justify-content-center mt-5">
                        <button className=" btn bg-gradient-danger" onClick={handleCloseModal} type="submit" title="Send" form="configForm"> Salir </button>
                    </div>
                
            </CalendarModal>
        </div>
    </div>


  )
}

export default AlertasVencimientoDocumentacionVehiculoScreen
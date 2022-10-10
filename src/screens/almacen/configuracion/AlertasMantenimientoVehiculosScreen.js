import React from 'react'
import { useState } from 'react';
import Select from "react-select";
import {activeModalAction, desactiveModalAction } from '../../../actions/modalActions';
import CalendarModal from "../../../components/CalendarModal";
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';



const optionsDocumentSelection = [
    { label: "Seleccione opción"},
    { label: "Cédula de ciudadanía"},
    { label: "Cédula de extranjería"},
    { label: "Pasaporte"},
    { label: "NIT"}

]

const optionsItemSelection = [
    { label: "Seleccione opción"},
    { label: "1111111111"}
]

const optionsProfessionalSelection= [
    { label: "Cesar Camacho"},
    { label: "Argenis Alarcón"},
    { label: "Andrés Mesa"}
]

const AlertasMantenimientoVehiculosScreen = () => {
    
    const { register, handleSubmit, control } = useForm();
    const [selectItem, setSelectedItem] = useState(null);
    const [selectedIdDocument, setSelectedIdDocument] = useState(null);
    const [selectProfessional, setSelectedProfessional ] = useState(null);
    

    const submit = (data) => {

    }

    const dispatch = useDispatch();

    const handleOpenModal = () => {
    dispatch(activeModalAction());
    };

    const handleCloseModal = () => {
    dispatch(desactiveModalAction());
    };
  
    return (
        <div className='row min-vh-100'>
            <div className="col-lg-12 col-md-10 col-12 mx-auto">
                <h3 className ="text-center"> Configuración de alertas para el Mantenimiento de Vehículos </h3>
            
            <form className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative" data-animation="FadeIn" onSubmit={handleSubmit(submit)} id="configForm"> 
                <div className= "row">
                    <div className="col-12 col-md-4 mt-5">   
                        <div className="input-group input-group-dynamic">
                            <label htmlFor="exampleFormControlInput1" className="form-label"> Días de anticipación (Días): <span className="text-danger">*</span> </label>
                            <input className="multisteps-form__input form-control mt-" type="text" {...register("numeroDias")}/>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 mt-5">
                        <div className=" input-group input-group-dynamic">
                            <label htmlFor="exampleFormControlInput1" className="form-label"> Recordatorio: <span className="text-danger">*</span> </label>
                            <input className="multisteps-form__input form-control mt-4" type="time" {...register("numeroRecordatorio")}/>
                        </div>
                    </div>
                  
                    <div className="col-12 col-md-4 mt-5">
                        <div className="col-6 input-group input-group-dynamic">
                            <label htmlFor="exampleFormControlInput1" className="form-label"> Frecuencia: <span className="text-danger">*</span> (Hora/as) </label>
                            <input className="multisteps-form__input form-control mt-4" type="number" {...register("numeroFrecuencia")}/>
                        </div>

                        <div class="form-check">
                            <label class="form-check-label mx-2" for="flexCheckDefault"> a.m.</label>
                            <input class="form-check-input mx-2" type="checkbox" value="" id="flexCheckDefault"/>
                            <label class="form-check-label mx-2" for="flexCheckDefault"> p.m.</label>
                            <input class="form-check-input mx-2" type="checkbox" value="" id="flexCheckDefault" />
                        </div>
                    </div>
                    

                    <div className ="col-12 d-flex justify-content-center mt-7 mb-5"> 
                        <label htmlFor="exampleFormControlInput1" className="form-label mt-2"> Notificar a: <span className="text-danger">*</span> </label>
                          
                        <Controller
                        name="tipoDocumento"
                        control={control}
                        rules={{
                        required: true,
                        }}
                        render={({ field }) => (
                        <Select
                        {...field}
                        className="col-3 mx-1"
                        defaultValue={selectedIdDocument}
                        onChange={setSelectedIdDocument}
                        options={optionsDocumentSelection} 
                        />
                        )}
                        />

                        <Controller
                        name="tipoDocumento2"
                        control={control}
                        rules={{
                        required: true,
                        }}
                        render={({ field}) => (

                        <Select
                        {...field}
                        className="col-3 mx-1"
                        defaultValue={selectItem}
                        onChange={setSelectedItem}
                        options={optionsItemSelection}
                        placeholder="Seleccionar" 
                        />
                        )}
                        />

                        <Controller
                        name="tipoDocumento"
                        control={control}
                        rules={{
                        required: true,
                        }}
                        render={({ field }) => (
                            
                        <Select
                        {...field}
                        className="col-3 mx-1"
                        defaultValue={selectProfessional}
                        onChange={setSelectedProfessional}
                        options={optionsProfessionalSelection}
                        />
                        )}
                        />

                        <div>
                            <button type="button" className="btn btn-primary mx-2">Buscar</button>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end mt-5">
                        <button type="button" className="btn btn-primary text-capitalize mx-2">Editar</button>
                        <button type="button" onClick={handleOpenModal} className="btn btn-secondary text-capitalize mx-2 p-2"> Guardar </button>
                        <button type="button" className="btn btn-danger text-capitalize mx-2">Salir </button>
                    </div>
                </div>
            </form>
            <CalendarModal>
                <div> 
                    <p>El activo identificado con el código 1212121, tiene programado un mantenimiento el día 05/05/2022 </p>
                    <button className="btn bg-gradient-danger mb-0" onClick={handleCloseModal} type="submit" title="Send" form="configForm"> Salir </button>
                </div>
                
            </CalendarModal>                   

        </div>
  </div>
  )
}

export default AlertasMantenimientoVehiculosScreen
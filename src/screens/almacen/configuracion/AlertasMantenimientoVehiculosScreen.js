import React from 'react'
import { useState } from 'react';
import Select from "react-select";
import {activeModalAction, desactiveModalAction } from '../../../actions/modalActions';
import CalendarModal from "../../../components/CalendarModal";
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";


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
  
    return (
        <div className='row min-vh-100'>
            <div className="col-lg-12 col-md-10 col-12 mx-auto">
                <h3 className ="mt-3 mb-0 text-center mb-6"> Configuración de alertas para el Mantenimiento de Vehículos </h3>
            
            <form className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative" data-animation="FadeIn" 
                onSubmit={handleSubmit(submit)} 
                id="configForm"> 
                <div className= "row">
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
                                    className="multisteps-form__input form-control  p-2"
                                    placeholderText="dd/mm/aaaa"
                                    />
                                    )}
                                    />
                        </div>
                    </div>
                  
                    <div className="col-12 col-md-4 mt-4">
                        <div className="col-6 input-group input-group-dynamic">
                            <label className="form-floating input-group input-group-dynamic ms-2"> Frecuencia: <span className="text-danger">*</span> (Hora/as) </label>
                            <input className="multisteps-form__input form-control" type="number" {...register("numeroFrecuencia")}/>
                        </div>

                        <div className="form-check">
                            <label className="form-check-label mx-2" htmlFor="flexCheckDefault"> a.m.</label>
                            <input className="form-check-input mx-2" type="checkbox" value="" id="flexCheckDefault"/>
                            <label className="form-check-label mx-2" htmlFor="flexCheckDefault"> p.m.</label>
                            <input className="form-check-input mx-2" type="checkbox" value="" id="flexCheckDefault" />
                        </div>
                    </div>
                    

                    <div className ="col-12 d-flex justify-content-center mt-7 mb-4"> 
                        <label className="form-floating input-group input-group-dynamic ms-5 my-2"> Notificar a: <span className="text-danger">*</span> </label>
                          
                        <Controller
                        name="tipoDocumento"
                        control={control}
                        //rules={{
                        //required: true,
                        //}}
                        render={({ field }) => (
                        <Select
                        {...field}
                        className="col-3 mx-1"
                        defaultValue={selectedIdDocument}
                        onChange={setSelectedIdDocument}
                        options={optionsDocumentSelection}
                        placeholder="Seleccionar"
                        />
                        )}
                        />

                        <Controller
                        name="tipoDocumento2"
                        control={control}
                        //rules={{
                        //required: true,
                        //}}
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
                        //rules={{
                        //required: true,
                        //}}
                        render={({ field }) => (
                            
                        <Select
                        {...field}
                        className="col-3 mx-1"
                        defaultValue={selectProfessional}
                        onChange={setSelectedProfessional}
                        options={optionsProfessionalSelection}
                        placeholder="Seleccionar"
                        />
                        )}
                        />

                        <div>
                            <button type="button" className="btn btn-primary mx-2 text-capitalize">Buscar</button>
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
                    <div className="d-flex justify-content-center mt-10" >
                        <p > El vehículo  VGH897, vencerán el día 05/05/2022 </p> 
                    </div>
                    
                    <div className="d-flex justify-content-center mt-5">
                        <button className=" btn bg-gradient-danger" onClick={handleCloseModal} type="submit" title="Send" form="configForm"> Salir </button>
                    </div>
            </CalendarModal>                   

        </div>
  </div>
  )
}

export default AlertasMantenimientoVehiculosScreen
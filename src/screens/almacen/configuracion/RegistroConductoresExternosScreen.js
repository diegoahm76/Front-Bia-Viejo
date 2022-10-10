import React from 'react'
import { useState,} from 'react';
import {Controller, useForm} from "react-hook-form"
import Select from "react-select";



const optionsDocumentSelection = [
    { label: "Seleccione opción"},
    { label: "C.C."},
    { label: "C.E."},
    { label: "Pasaporte"},
    { label: "NIT"}
]

const RegistroConductoresExternosScreen = () => {

    const [selectedIdDocument, setSelectedIdDocument] = useState(null);
    const {register, handleSubmit, control} = useForm();

    const submit = (data) => {
      };


  return (
    <div>
        <div className='row min-vh-100'>
          <div className="col-lg-12 col-md-10 col-12 mx-auto">
          <h3 className="mt-3 mb-0 text-center mb-6"> Registro de Conductores Externos</h3>
        
                <form className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative" data-animation="FadeIn" onSubmit={handleSubmit(submit)}
                id="configForm">
              
                  
                    <div className= "row">
                        <div className="col-12 col-md-4 mb-2">
                            <div className="input-group input-group-dynamic">
                                <label htmlFor="exampleFormControlInput1" className="form-label"> Primer Nombre: <span className="text-danger">*</span> </label>
                                <input className="multisteps-form__input form-control mt-4" type="text" {...register("primerNombre")}/>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="input-group input-group-dynamic">
                                <label htmlFor="exampleFormControlInput1" className="form-label"> Segundo Nombre: <span className="text-danger">*</span> </label>
                                <input className="multisteps-form__input form-control mt-4" type="text" {...register("segundoNombre")}/>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="input-group input-group-dynamic">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Primer Apellido: <span className="text-danger">*</span> </label>
                                <input className="multisteps-form__input form-control mt-4" type="text" {...register("primerApellido")}/>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="input-group input-group-dynamic">
                                <label htmlFor="exampleFormControlInput1" className="form-label"> Segundo Apellido: <span className="text-danger">*</span> </label>
                                <input className="multisteps-form__input form-control mt-4" type="text" {...register("segundoNombre")}/>
                            </div>
                        </div>
                    
                        <div className="col-12 col-md-4 mb-3">
                            <div className="input-group input-group-dynamic">
                                <label htmlFor="exampleFormControlInput1" className="form-label"> Tipo de documento: <span className="text-danger">*</span> </label>
                                
                                <Controller
                                name="tipoDocumento"
                                control={control}
                                rules={{
                                required: true,
                                }}
                                render={({ field }) => (
                                <Select 
                                {...field}
                                {...register("documento")}
                                className="col-8 mt-5"
                                defaultValue={selectedIdDocument}
                                onChange={setSelectedIdDocument}
                                options={optionsDocumentSelection}
                                placeholder="Seleccionar"
                                />
                                )}
                                />

                            </div>
                        </div>

                        <div className="col-12 col-md-4 mb-2">
                            <div className="input-group input-group-dynamic">
                                <label htmlFor="exampleFormControlInput1" className="form-label"> Número de documento: <span className="text-danger">*</span> </label>
                                <input className="multisteps-form__input form-control mt-4" type="number" {...register("numeroDocumento")}/>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 mb-2">
                            <div className="input-group input-group-dynamic">
                                <label htmlFor="exampleFormControlInput1" className="form-label"> Celular: <span className="text-danger">*</span> </label>
                                <input className="multisteps-form__input form-control mt-4" type="number" {...register("numeroCelular")}/>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 mb-2">
                            <div className="input-group input-group-dynamic">
                                <label htmlFor="exampleFormControlInput1" className="form-label"> Teléfono: <span className="text-danger">*</span> </label>
                                <input className="multisteps-form__input form-control mt-4" {...register("numeroTelefono")} type="number"/>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 mb-2">
                            <div className="input-group input-group-dynamic">
                                <label htmlFor="exampleFormControlInput1" className="form-label"> Dirección: <span className="text-danger" >*</span> </label>
                                <input className="multisteps-form__input form-control mt-4" {...register("direccion")} type="text"/>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 mb-2">
                            <div className="input-group input-group-dynamic">
                                <label htmlFor="exampleFormControlInput1" className="form-label"> Barrio: <span className="text-danger">*</span> </label>
                                <input className="multisteps-form__input form-control mt-4" {...register("direccion")} type="text"/>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 mb-2">
                            <div className="input-group input-group-dynamic">
                                <label htmlFor="exampleFormControlInput1" className="form-label"> Correo electrónico: <span className="text-danger">*</span> </label>
                                <input className="multisteps-form__input form-control mt-4" {...register("email")} type="email"/>
                            </div>
                        </div>


                        <div className="d-flex justify-content-end mt-6">
                            <button type="submit" value="Enviar" onClick={handleSubmit(submit)} className="btn btn-secondary mx-2 p-2 text-capitalize"> Guardar </button>
                            <button type="button" className="btn btn-danger mx-2 text-capitalize">Salir </button>
                        </div>

                    </div>
                </form>
            
            </div>
        </div>
    </div>
  )
}

export default RegistroConductoresExternosScreen
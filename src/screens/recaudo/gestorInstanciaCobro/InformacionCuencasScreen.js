import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import Subtitle from "../../../components/Subtitle";
import Select from "react-select";
import clienteAxios from "../../../config/clienteAxios";
import { textChoiseAdapter } from "../../../adapters/textChoices.adapter";

export const InformacionCuencasScreen = () => {
  const [tabla, setTabla] = useState(false);
  const [municipiosOptions, setMunicipiosOptions] = useState([]);
  const [departamentosOptions, setDepartamentosOptions] = useState([]);

  useEffect(() => {
    const getSelectsOptions = async () => {
      try {
        const { data: departamentosNoFormat } = await clienteAxios.get(
          "choices/departamentos/"
        );
        const { data: municipiosNoFormat } = await clienteAxios.get(
          "choices/municipios/"
        );

        const departamentosFormat = textChoiseAdapter(departamentosNoFormat);
        const municipiosFormat = textChoiseAdapter(municipiosNoFormat);

        setDepartamentosOptions(departamentosFormat);
        setMunicipiosOptions(municipiosFormat);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);

  const {
    reset,
    register,
    handleSubmit,
    control: controlBuscar,
    formState: { errors: errorsBuscar },
  } = useForm();

  const onSubmit = () => {};
  let gridApi;
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form
            className="row"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="text-rigth  fw-light mt-4">
              Informcaión de cuencas hidricas
            </h3>
            <Subtitle title={"Parametros de busqueda"} mt={3} />

            <div className="row">

              <div className="col-12 col-lg-3  mt-2">

                <label className="form-floating input-group input-group-dynamic ms-2"> 
                  Periodo: 
                </label>

                <Controller
                  name="periodo"
                  control={controlBuscar}
                  rules={{
                    required: true,
                  }}

                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "2022" },
                        { label: "2021" },
                        { label: "2020" },
                        { label: "2019" },
                        { label: "2018" },
                        { label: "2017" },
                        { label: "2016" },
                        { label: "2015" },
                        { label: "2014" },
                        { label: "2013" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>

              <div className="col-12 col-md-3 mt-2">
              
              <label className="form-floating input-group input-group-dynamic ms-2"> 
                  Departamaneto: 
                </label>
                
                <Controller
                  name="departamento"
                  control={controlBuscar}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={departamentosOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            
              <div className="col-12 col-md-3 mt-2">
              
              <label className="form-floating input-group input-group-dynamic ms-2"> 
                  Municipio: 
                </label>

                <Controller
                  name="cod_municipio"
                  control={controlBuscar}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={municipiosOptions}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>

              <div className="col-12 col-lg-3  mt-2">

                <label className="form-floating input-group input-group-dynamic ms-2"> 
                  Periodo: 
                </label>

                <Controller
                  name="periodo"
                  control={controlBuscar}
                  rules={{
                    required: true,
                  }}

                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "2022" },
                        { label: "2021" },
                        { label: "2020" },
                        { label: "2019" },
                        { label: "2018" },
                        { label: "2017" },
                        { label: "2016" },
                        { label: "2015" },
                        { label: "2014" },
                        { label: "2013" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>
            
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default InformacionCuencasScreen;

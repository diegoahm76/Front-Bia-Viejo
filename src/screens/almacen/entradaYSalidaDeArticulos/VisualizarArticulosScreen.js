import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Collapse from "react-bootstrap";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";
import Subtitle from "../../../components/Subtitle";

export const VisualizarArticulosScreen = () => {
  const [marca, setMarca] = useState({});
  const opcMarca = [
    { label: "Lenovo", value: "LE" },
    { label: "ASUS", value: "AS" },
    { label: "Acer", value: "AC" },
    { label: "TOSHIBA", value: "TO" },
    { label: "HP/Hewlett Packard", value: "HP" },
  ];

  const {
    register,
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    setMarca({ options: data.options });
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <h3 className="mt-3 ms-3 mb-0 text-start fw-light mb-4 ">
            Visualizar articulos
          </h3>
          <MarcaDeAgua1>
            <div className="row">
              <Subtitle title={"Informacion del Articulo"} />
            </div>
            <div className="row ms-1 align-items-end">
              <div className="col-6 col-sm-3 mt-4">
                <label className="text-terciary">Codigo:</label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="Codigo"
                  {...register("id")}
                />
              </div>
              <div className="col-6 col-sm-3 mt-4">
                <label className="text-terciary">Nombre: </label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="Nombre"
                  {...register("nombre")}
                />
              </div>
              <div className=" col-6 col-sm-3 ">
                <button
                  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill px-3"
                >
                  Ver H/V
                </button>
                <button
                  type="button"
                  className="btn btn-secondary text-capitalize border rounded-pill px-3"
                >
                  Crear H/V
                </button>
              </div>
              <div className=" col-6 col-sm-3 ">
                <button
                  type="button"
                  className="btn btn-danger text-capitalize border rounded-pill px-3"
                >
                  Borrar
                </button>
              </div>
            </div>
            <div className="row ms-1 align-items-end">
              <div className="col-6 col-sm-3 mt-4">
                <label className="text-terciary">Codigo de barras / QR: </label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="float"
                  placeholder="Codigo de barras / QR"
                  {...register("codigoDeBarra")}
                />
              </div>
              <div className="col-6 col-sm-3 mt-4">
                <label className="text-terciary">Serial / Placa: </label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="num"
                  placeholder="Serial/Placa"
                  {...register("serial")}
                />
              </div>
              <div className="col-6 col-sm-3">
                <label className="form-control ms-0 text-terciary">Marca: </label>
                <Controller
                  name="options"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={opcMarca}
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
            </div>
            <div className="row mt-3 ms-1">
              <div className="col">
                <label className="text-terciary">Observaciones: </label>
                <textarea
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="Observaciones"
                  {...register("observaciones")}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="d-flex justify-content-end gap-4">
                <button
                  type="button"
                  className="btn btn-primary text-capitalize border rounded-pill px-3"
                >
                  Guardar
                </button>
              </div>
            </div>

            <div className="row">
              <Subtitle title={"Articulos"} />
            </div>
          </MarcaDeAgua1>
        </form>
      </div>
    </div>
  );
};

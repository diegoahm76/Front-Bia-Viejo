import React, { useState } from "react";
import Modal from "react-modal";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Select from "react-select"
import { changeSesionAction, closeModalSesionAction } from "../actions/userActions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
    width: '400px',
    height: "400px"
  },
};
Modal.setAppElement("#root");

const SelectSesionModal = () => {
  const userInfo = useSelector((state) => state.user.user);
  const userSesion = useSelector((state) => state.user);
  const [sesions, setSesions] = useState([])

  const dispatch = useDispatch()

  const { handleSubmit, control, formState: {errors} } = useForm();

  const getSesions = () => {
    const sesionsFromRepresentante = userInfo.representante_legal?.map(
      (representante) => ({
        label: `Representante ${representante["razon social"]}`,
        value: {
          userName: `Representante ${representante["razon social"]}`,
          type: "representante"
        },
      })
    );

    const userSesion = {
      label: `Usuario ${userInfo?.nombre_de_usuario}`,
      value: {
        userName: userInfo?.nombre_de_usuario,
        type: "usuario"
      }
    }

    console.log(userSesion)

    if(!userInfo.representante_legal) return setSesions([userSesion])

    setSesions([...sesionsFromRepresentante, userSesion])
  };

  const onSubmit = (data) => {
    console.log(data)
    dispatch(changeSesionAction(data.selectSesion?.value))
  };

  const handleCloseModal = () => {
    dispatch(closeModalSesionAction())
  };

  useEffect(() => {
    getSesions()
  }, [])

  return (
    <Modal
      isOpen={userSesion.modalSesion}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="row">
        <div className="col-lg-12 mx-auto">
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="mt-3 mb-4 mb-2 fw-light text-terciary text-center">
              Entornos disponibles
            </h3>
            <div className="col-12 mt-2 mx-auto">
              <label className="form-label">
                Selecciona un entorno:{" "}
                <span className="text-danger">*</span>
              </label>
              <Controller
                name="selectSesion"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={sesions}
                    placeholder="Seleccionar"
                  />
                )}
              />
              {errors.selectSesion && (
                <div className="col-12">
                  <small className="text-center text-danger">
                    Este campo es obligatorio
                  </small>
                </div>
              )}
            </div>
            <div className="d-flex justify-content-end gap-2 mt-6">
              <button
                className="btn bg-gradient-light mb-0 d-block text-capitalize"
                type="button"
                onClick={handleCloseModal}
              >
                cancelar
              </button>
              <button
                className="btn bg-gradient-primary mb-0 d-block text-capitalize"
                type="submit"
              >
                Seleccionar
              </button>
            </div>
          </form>
          <p
            className="text-danger cursor-click text-capitalize position-absolute top-0 end-2 fs-4"
            onClick={handleCloseModal}
          >
            <b>
              X
            </b>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default SelectSesionModal;

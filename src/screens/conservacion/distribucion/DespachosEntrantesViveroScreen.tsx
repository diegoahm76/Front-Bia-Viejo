import { SubTitle } from "chart.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import Subtitle from "../../../components/Subtitle";

export const DespachosEntrantesViveroScreen = () => {

  const navigate = useNavigate();
  const IrDespachar = () => {
    navigate("/dashboard/conservacion/distribucion/despacho-entrante");
  };
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form
            className="row"
            //</div>onSubmit={handleSubmit(submitVivero)}
          >
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Despacho entrantes a viveros
            </h3>
            <Subtitle title={"Detalles del despacho"} mt={3} mb={2}/>

            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">Número de despacho:</label>
                <input
                  type="number"
                  disabled
                  className="form-control border border-terciary rounded-pill px-3"
                  placeholder="Número de despacho"
                />
              </div>
            </div>

            <div className="row"> 
            <div className="row ms-3"style={{  display:"flex",
                      justifyContent: "center",}}>
                  <div
                    className="card col-5 col-md-auto"
                    style={{
                      backgroundColor: "#fff3cd",
                      flexBasis: "content",
                      height: "60px",
                      display:"flex",
                      justifyContent: "center",
                    }}
                  >
                    <div className="mt-3 ms-3">
                      <label style={{ color: "#84454a" }}>
                        {" "}
                        <i
                          className="fa-solid fa-triangle-exclamation me-3"
                          style={{ color: "#9b8015" }}
                        ></i>
                        Los Items de este despacho aún no se han distribuido
                      </label>
                    </div>
                    
                  </div>
                </div>
                <div className="row ms-3" style={{  display:"flex",
                      justifyContent: "center",}}>
                  <div
                    className="card col-5 col-md-auto"
                    style={{
                      backgroundColor: "#d1e7dd",
                      flexBasis: "content",
                      height: "60px",
                    blockSize:"auto"
                    }}
                  >
                    <div className="mt-3 ms-3">
                      <label style={{ color: "#26852a" }}>
                        {" "}
                        <i className="fa-solid fa-circle-check fs-5 me-3"></i>
                        Los Items fueron distribuidos el día: (Espacio para la fecha)
                      </label>
                    {/* </div>
                    <div> */}
                        {/* </div>
                         <div className="col-4"> */}
                        <button
                          type="button"
                          className="btn btn-primary text-capitalize border rounded-pill ms-3 mt-1 btn-min-width"
                        >
                          Ver detalles
                        </button>
                      </div>
                    
                  </div>
                </div>
            </div>

            <div className="input-group input-group-dynamic flex-column mt-4">
              <label htmlFor="exampleFormControlInput1" className="text-terciary">
                Observaciones de la distribución: <span className="text-danger">*</span>
              </label>
              <textarea className=" form-control w-auto border-rounded-pill px-3" />
            </div>
            <div className="row mt-5" style={{display:"flex", justifyContent:"center"}}>
                <div className="col-12 col-md-3 mb-3">
                <label className=" text-terciary"> Distribución realizada por: </label>
                </div>
                <div className="col-12 col-md-3 mb-3">
                <input type="Nombre de usuario de Cormacarena" placeholder="Usuario de Cormacarena" disabled   className="form-control border border-terciary rounded-pill px-3" />
            </div>
            </div>
            <div className="row">
            <div style={{ textAlign: "end" }}>
            <button
             className="btn border rounded-pill mt-2 px-3 ms-2"
             title="Realizar distribución"
             onClick={()=>IrDespachar()}
           >
              <i className="fa-solid fa-circle-check fs-3"></i>
              </button>
              <button
                  className="btn border rounded-pill mt-2 px-3 ms-2"
                  title="Consultar"
                >
                  <i className="fa-brands fa-readme fs-3"></i>
                </button>
            
                <button
                  className="btn border rounded-pill mt-2 px-3 ms-2"
                  title="Salir"
                >
                  <i className="fa-solid fa-x fs-3"></i>
                </button>

              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

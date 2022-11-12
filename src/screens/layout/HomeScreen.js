import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Aside from "../../components/Aside";
import Navbar from "../../components/Navbar";
import clienteAxios from "../../config/clienteAxios";
import { getConfigAuthBearer } from "../../helpers/configAxios";
import { getTokenAccessLocalStorage } from "../../helpers/localStorage";

function HomeScreen() {
  const [showAside, setShowAside] = useState(true);

  useEffect(() => {
    const getRepresentante = async () => {
      try {
        const access = getTokenAccessLocalStorage();
        const config = getConfigAuthBearer(access);
        const { data: dataRepresentante } = await clienteAxios.get(
          "personas/get-persona-juridica/representante-legal/",
          config
        );
        console.log("representante", dataRepresentante.detail);
      } catch (error) {
        console.log(error);
      }
    };
    getRepresentante();
  }, []);

  return (
    <div className="g-sidenav-show  bg-gray-200">
      <Aside showAside={showAside} />
      <main
        className={`main-content position-relative h-100 border-radius-lg pb-5 ${
          !showAside && "ms-0"
        }`}
      >
        <Navbar setShowAside={setShowAside} showAside={showAside} />
        <div className="container-fluid ">
          {/* aqui debe ir lo que se renderiza condicional */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default HomeScreen;

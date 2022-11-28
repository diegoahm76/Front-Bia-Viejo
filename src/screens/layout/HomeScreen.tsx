import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Aside from "../../components/Aside";
import Navbar from "../../components/Navbar";
import SelectSesionModal from "../../components/SelectSesionModal";
import { useAppSelector } from "../../store/store";

function HomeScreen() {
  const  user_info  = useAppSelector((state) => state.login.initialState.user_info);

  const [showAside, setShowAside] = useState(true);

  return (
    <div className="g-sidenav-show bg-terciary">
      <Aside showAside={showAside} />
      <main
        className={`main-content position-relative h-100 border-radius-lg pb-5 ${
          !showAside && "ms-0"
        }`}
      >
        <Navbar setShowAside={setShowAside} showAside={showAside} />
        <div className="container-fluid">
          {/* aqui debe ir lo que se renderiza condicional */}
          <Outlet />
        </div>
      </main>
      {
        !user_info?.is_superuser && (
          <SelectSesionModal />
        )
      }
    </div>
  );
}

export default HomeScreen;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Aside from "../../components/Aside";
import Navbar from "../../components/Navbar";
import SelectSesionModal from "../../components/SelectSesionModal";

function HomeScreen() {
  const { userinfo } = useSelector((state) => state.user.user);
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
        !userinfo?.is_superuser && (
          <SelectSesionModal />
        )
      }
    </div>
  );
}

export default HomeScreen;

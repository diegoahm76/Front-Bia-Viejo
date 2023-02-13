import React from "react";
import { Popup } from "react-leaflet";

const MarkerPopup = (props) => {
console.log("props.data: ", props.data)
  return (
    <Popup>
      <div>Dirección viento: {props.data.Dirección_Viento}</div>
      <div>Estado: {props.data.Estado}</div>
      <div>Humedad: {props.data.Humedad}</div>
      <div>Luminosidad: {props.data.Luminosidad}</div>
      <div>Nivel agua: {props.data.Nivel_Agua}</div>
      <div>Precipitación: {props.data.Precipitación}</div>
      <div>Presión: {props.data.Presión}</div>
      <div>Temperatura: {props.data.Temperatura}</div>
      <div>Velocidad agua: {props.data.Velocidad_Agua}</div>
      <div>Velocidad viento: {props.data.Velocidad_Viento}</div>
      <div>Fecha: {props.data.fecha}</div>
    </Popup>
  );
};

export default MarkerPopup;
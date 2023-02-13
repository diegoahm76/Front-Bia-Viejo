import React from "react";
import L from 'leaflet';
import { Marker } from "react-leaflet";
import MarkerPopup from "./MarkerPopup";
import icono from '../../../../assets/iconosGeolocalizacion/Localizacion.svg';
const iconLocalizacion = new L.Icon({
    iconUrl: icono,
    iconSize:[45,45]
});

const Markers = (props) => {
  const { marks } = props;
  const markers = marks.map((mark) => (
    <Marker key={mark.id} position={[mark.geometry.coordinates[1],mark.geometry.coordinates[0]]} icon={iconLocalizacion}>
      <MarkerPopup data={mark.properties} />
    </Marker>
  ));
  return <>{markers}</>;
};

export default Markers;
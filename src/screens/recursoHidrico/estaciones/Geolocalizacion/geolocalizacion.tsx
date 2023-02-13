import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import clienteEstaciones from "../../../../config/clienteAxiosEstaciones";
import Markers from "./Markers";

const ubicacion: [number, number] = [4.258179477894017, -73.60700306515551];

interface IGeoJson {
    type: string;
    features: any[];
}

    const Geolocalizacion = () => {
    const [info, setInfo] = useState < IGeoJson | null > (null);
    useEffect(() => {
        obtenerGeojson();
    }, []);

    const obtenerGeojson = async () => {
        let { data } = await clienteEstaciones.get<IGeoJson>("GeoJson");
        setInfo(data);
    }
    if (!info) return <div className="Loading"></div>;

    return (
        <div className="Geolocalizacion">
            <MapContainer center={ubicacion} zoom={8} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Markers marks={info.features} />
            </MapContainer>
        </div>
    );
}
export default Geolocalizacion;

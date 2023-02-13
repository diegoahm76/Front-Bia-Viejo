import React, { useEffect, useState } from 'react';

function PqrsdAnalitica() {

    return (
        <div className="row min-vh-100">
            <div
                className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                data-animation="FadeIn"
            >
                <h3 className="mt-2 mb-0 text-center">Analitica de datos PQRSD</h3>
                <div className="col-12 mx-4 aling-items-right ">
                    <iframe title="PQRSD" width="950px" height="500px" src="https://cormacarena.maps.arcgis.com/apps/dashboards/84a97d45c4dc4bee83568494e6295b60"></iframe>
                </div>
            </div>
        </div>

    );

}

export default PqrsdAnalitica;
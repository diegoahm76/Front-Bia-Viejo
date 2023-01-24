import React from "react";

import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

//Hooks
import { useAppSelector } from "../store/hooks/hooks";

function GroupButtonsOrganigramzz() {

    // Redux State Extraction
    const { moldOrganigram } = useAppSelector((state) => state.organigram);

    return (
        <div className="row multisteps-form__panel border-radius-xl bg-white js-active position-relative">
            <a
                className="sidenav-normal border rounded-pill px-4 mt-2 mb-2 text-white fs-5 p-1 ms-1"
                style={{
                    backgroundImage: "linear-gradient(45deg, #6db227, #36a9e0)",
                }}
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="Unidades_Staff"
                href="#Unidades_Staff"
            >
                Unidades Staff
            </a>
            <div className="row mt-1 ms-2 collapse" id="Unidades_Staff">
                <div className="col-12  col-md-6">
                    <ListGroup as="ol" numbered>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                            variant="primary"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Asesor</div>
                                {moldOrganigram[0].unidades_staff.map((item) => {
                                    if (item.cod_tipo_unidad !== "AP") {
                                        return (
                                            <span className="text-muted">
                                                {item.nombre}
                                            </span>
                                        );
                                    }
                                })}
                            </div>
                            <Badge bg="primary" pill>
                                {moldOrganigram[0].unidades_staff.filter(item => item.cod_tipo_unidad !== "AP").length}
                            </Badge>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                <div className="col-12  col-md-6">
                    <ListGroup as="ol" numbered>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                            variant="warning"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Apoyo</div>
                                {moldOrganigram[0].unidades_staff.map((item) => {
                                    if (item.cod_tipo_unidad === "AP") {
                                        return (
                                            <span className="text-muted">
                                                {item.nombre}
                                            </span>
                                        );
                                    }
                                })}
                            </div>
                            <Badge bg="primary" pill>
                                {moldOrganigram[0].unidades_staff.filter(item => item.cod_tipo_unidad === "AP").length}
                            </Badge>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        </div>
    );
}

export default GroupButtonsOrganigramzz;
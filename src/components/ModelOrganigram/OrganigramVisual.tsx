import React, { useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { getMoldOrganigramsService } from '../../services/organigram/OrganigramServices';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';


export default function OrganigramVisual() {

    // Redux State Extraction
    const { organigramCurrent, moldOrganigram } = useAppSelector((state) => state.organigram);

    // Dispatch instance
    const dispatch = useAppDispatch();

    const stylesTree = { padding: '5px', border: '1px solid black', borderRadius: '8px', display: 'inline-block' };
    const stylesTreeNode = { padding: '5px', border: '1px solid black', borderRadius: '8px', display: 'inline-block' };

     // const response = [
    //     {
    //         "id_unidad_organizacional": 71,
    //         "id_organigrama_id": 12,
    //         "id_nivel_organigrama_id": 35,
    //         "orden_nivel": 1,
    //         "nombre": "Unidad de odin ",
    //         "codigo": "01",
    //         "cod_tipo_unidad": "LI",
    //         "cod_agrupacion_documental": "SEC",
    //         "unidad_raiz": true,
    //         "id_unidad_org_padre_id": null,
    //         "hijos": [
    //             {
    //                 "id_unidad_organizacional": 72,
    //                 "id_organigrama_id": 12,
    //                 "id_nivel_organigrama_id": 36,
    //                 "nombre": "señor del trueno",
    //                 "codigo": "05",
    //                 "cod_tipo_unidad": "LI",
    //                 "cod_agrupacion_documental": "SUB",
    //                 "unidad_raiz": false,
    //                 "id_unidad_org_padre_id": 71,
    //                 "hijos": [
    //                     {
    //                         "id_unidad_organizacional": 35,
    //                         "id_organigrama_id": 7,
    //                         "id_nivel_organigrama_id": 16,
    //                         "nombre": "hijo 1 del señor del trueno",
    //                         "codigo": "002",
    //                         "cod_tipo_unidad": "AP",
    //                         "cod_agrupacion_documental": null,
    //                         "unidad_raiz": false,
    //                         "id_unidad_org_padre_id": null,
    //                         "hijos": []
    //                     },
    //                     {
    //                         "id_unidad_organizacional": 35,
    //                         "id_organigrama_id": 7,
    //                         "id_nivel_organigrama_id": 16,
    //                         "nombre": "hijo 2 del señor del trueno",
    //                         "codigo": "002",
    //                         "cod_tipo_unidad": "AP",
    //                         "cod_agrupacion_documental": null,
    //                         "unidad_raiz": false,
    //                         "id_unidad_org_padre_id": null,
    //                         "hijos": []
    //                     },
    //                     {
    //                         "id_unidad_organizacional": 35,
    //                         "id_organigrama_id": 7,
    //                         "id_nivel_organigrama_id": 16,
    //                         "nombre": "hijo 3 del señor del trueno",
    //                         "codigo": "002",
    //                         "cod_tipo_unidad": "AP",
    //                         "cod_agrupacion_documental": null,
    //                         "unidad_raiz": false,
    //                         "id_unidad_org_padre_id": null,
    //                         "hijos": [
    //                             {
    //                                 "id_unidad_organizacional": 35,
    //                                 "id_organigrama_id": 7,
    //                                 "id_nivel_organigrama_id": 16,
    //                                 "nombre": "nieto 1 del señor del trueno",
    //                                 "codigo": "002",
    //                                 "cod_tipo_unidad": "AP",
    //                                 "cod_agrupacion_documental": null,
    //                                 "unidad_raiz": false,
    //                                 "id_unidad_org_padre_id": null,
    //                                 "hijos": [
    //                                     {
    //                                         "id_unidad_organizacional": 35,
    //                                         "id_organigrama_id": 7,
    //                                         "id_nivel_organigrama_id": 16,
    //                                         "nombre": "TataraNieto 1 del señor del trueno",
    //                                         "codigo": "002",
    //                                         "cod_tipo_unidad": "AP",
    //                                         "cod_agrupacion_documental": null,
    //                                         "unidad_raiz": false,
    //                                         "id_unidad_org_padre_id": null,
    //                                         "hijos": [
    //                                             {
    //                                                 "id_unidad_organizacional": 35,
    //                                                 "id_organigrama_id": 7,
    //                                                 "id_nivel_organigrama_id": 16,
    //                                                 "nombre": "TataraTataraNieto 1 del señor del trueno",
    //                                                 "codigo": "002",
    //                                                 "cod_tipo_unidad": "AP",
    //                                                 "cod_agrupacion_documental": null,
    //                                                 "unidad_raiz": false,
    //                                                 "id_unidad_org_padre_id": null,
    //                                                 "hijos": []
    //                                             },
    //                                         ]
    //                                     },
    //                                 ]
    //                             },
    //                         ]
    //                     },
    //                 ]
    //             },
    //             {
    //                 "id_unidad_organizacional": 74,
    //                 "id_organigrama_id": 12,
    //                 "id_nivel_organigrama_id": 37,
    //                 "nombre": "Poseidon",
    //                 "codigo": "03",
    //                 "cod_tipo_unidad": "LI",
    //                 "cod_agrupacion_documental": "SUB",
    //                 "unidad_raiz": false,
    //                 "id_unidad_org_padre_id": 71,
    //                 "hijos": [
    //                     {
    //                         "id_unidad_organizacional": 35,
    //                         "id_organigrama_id": 7,
    //                         "id_nivel_organigrama_id": 16,
    //                         "nombre": "hijo 1 de Poseidon",
    //                         "codigo": "002",
    //                         "cod_tipo_unidad": "AP",
    //                         "cod_agrupacion_documental": null,
    //                         "unidad_raiz": false,
    //                         "id_unidad_org_padre_id": null,
    //                         "hijos": []
    //                     },
    //                     {
    //                         "id_unidad_organizacional": 35,
    //                         "id_organigrama_id": 7,
    //                         "id_nivel_organigrama_id": 16,
    //                         "nombre": "hijo 2 de Poseidon",
    //                         "codigo": "002",
    //                         "cod_tipo_unidad": "AP",
    //                         "cod_agrupacion_documental": null,
    //                         "unidad_raiz": false,
    //                         "id_unidad_org_padre_id": null,
    //                         "hijos": []
    //                     },
    //                 ]
    //             },
    //         ],
    //         "unidades_staff": [
    //             {
    //                 "id_unidad_organizacional": 73,
    //                 "id_organigrama_id": 12,
    //                 "id_nivel_organigrama_id": 36,
    //                 "nombre": "Unidad de nivel 2",
    //                 "codigo": "02",
    //                 "cod_tipo_unidad": "AP",
    //                 "cod_agrupacion_documental": null,
    //                 "unidad_raiz": false,
    //                 "id_unidad_org_padre_id": null
    //             },
    //             {
    //                 "id_unidad_organizacional": 73,
    //                 "id_organigrama_id": 12,
    //                 "id_nivel_organigrama_id": 36,
    //                 "nombre": "Unidad de nivel 2",
    //                 "codigo": "02",
    //                 "cod_tipo_unidad": "AP",
    //                 "cod_agrupacion_documental": null,
    //                 "unidad_raiz": false,
    //                 "id_unidad_org_padre_id": null
    //             },
    //         ]
    //     }
    // ]

    const response = [
        {
            "id_unidad_organizacional": 1,
            "id_organigrama": 1,
            "id_nivel_organigrama": 1,
            "nombre": "Unidad 1 Prueba Raiz",
            "codigo": "255",
            "cod_tipo_unidad": "LI",
            "cod_agrupacion_documental": "SEC",
            "unidad_raiz": true,
            "id_unidad_org_padre": null,
            "orden_nivel": 1,
            "hijos": [
                {
                    "id_unidad_organizacional": 2,
                    "id_organigrama": 1,
                    "id_nivel_organigrama": 2,
                    "nombre": "Unidad 1 Prueba Nivel 2",
                    "codigo": "366",
                    "cod_tipo_unidad": "LI",
                    "cod_agrupacion_documental": "SUB",
                    "unidad_raiz": false,
                    "id_unidad_org_padre": 1,
                    "orden_nivel": 2,
                    "hijos": [
                        {
                            "id_unidad_organizacional": 5,
                            "id_organigrama": 1,
                            "id_nivel_organigrama": 3,
                            "nombre": "Unidad 2 Prueba Nivel 3",
                            "codigo": "756",
                            "cod_tipo_unidad": "LI",
                            "cod_agrupacion_documental": "SUB",
                            "unidad_raiz": false,
                            "id_unidad_org_padre": 2,
                            "orden_nivel": 3,
                            "hijos": []
                        },
                        {
                            "id_unidad_organizacional": 4,
                            "id_organigrama": 1,
                            "id_nivel_organigrama": 3,
                            "nombre": "Unidad 1 Prueba Nivel 3",
                            "codigo": "755",
                            "cod_tipo_unidad": "LI",
                            "cod_agrupacion_documental": null,
                            "unidad_raiz": false,
                            "id_unidad_org_padre": 2,
                            "orden_nivel": 3,
                            "hijos": []
                        }
                    ]
                }
            ],
            "unidades_staff": [
                {
                    "id_unidad_organizacional": 3,
                    "id_organigrama": 1,
                    "id_nivel_organigrama": 2,
                    "nombre": "Unidad 2 Prueba Nivel 2",
                    "codigo": "160",
                    "cod_tipo_unidad": "AP",
                    "cod_agrupacion_documental": null,
                    "unidad_raiz": false,
                    "id_unidad_org_padre": null,
                    "orden_nivel": 2
                }
            ]
        }
    ]

    function arbol(data: any) {
        return data.map((item: any) => {
            return (
                <TreeNode label={<div style={{ ...stylesTree, background: `${item.cod_agrupacion_documental ? '#47ACA6' : item.cod_agrupacion_documental === 'SUB' ? '#3aaad4' : '#3aaad4'}`, color: '#fff' }}>{item.nombre} </div>}>
                    {item.hijos.length > 0 ? arbol(item.hijos) : null}
                </TreeNode>
            )
        })
    }

    return (
        <>
            <Tree
                lineWidth={'2px'}
                lineColor={'black'}
                lineBorderRadius={'10px'}
                label={<div style={{ ...stylesTree, background: '#6bb22b', color: '#fff' }}>{moldOrganigram[0].nombre} </div>}
            >
                {arbol(moldOrganigram[0].hijos)}
                {/* <TreeNode label={<div style={{ ...stylesTreeNode, background: '#3aaad4 ', color: '#fff' }}>{unityOrganigram[0].nombre}</div>}>
                    {levelsOrganigram.map((level, idx) =>
                        idx === 0 ? null :
                            <TreeNode label={<div style={{ ...stylesTree, background: '#5aaf63', color: '#fff' }}>{level.nombre}</div>}>
                                {unityOrganigram.map((unity) =>
                                    unity.id_nivel_organigrama === level.id_nivel_organigrama ?
                                        <TreeNode label={<div style={{ ...stylesTreeNode, background: '#3aaad4  ', color: '#fff' }}>{unity.nombre}</div>} />
                                        : null
                                )}
                            </TreeNode>
                    )}
                </TreeNode> */}
            </Tree>
        </>
    )
}

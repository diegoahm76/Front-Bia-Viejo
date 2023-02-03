/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import OrganizationChart from '@dabeng/react-orgchart';
// import { ISon } from '../../Interfaces/Organigrama';
import { useAppSelector } from '../../store/hooks/hooks';

export default function OrganigramVisual() {
  // Redux State Extraction
  const { moldOrganigram } = useAppSelector((state) => state.organigram);
  const ds = {
    id: 464,
    id_organigrama: 20,
    id_nivel_organigrama: 66,
    codigo: '1',
    cod_tipo_unidad: 'LI',
    cod_agrupacion_documental: 'SEC',
    unidad_raiz: true,
    id_unidad_org_padre: null,
    orden_nivel: 1,
    title: 'consejo directivo ',
    children: [
      {
        id: 465,
        id_organigrama: 20,
        id_nivel_organigrama: 67,
        codigo: '2',
        cod_tipo_unidad: 'LI',
        cod_agrupacion_documental: 'SUB',
        unidad_raiz: false,
        id_unidad_org_padre: 464,
        orden_nivel: 2,
        title: 'jefatura',
        children: [
          {
            id: 466,
            id_organigrama: 20,
            id_nivel_organigrama: 68,
            codigo: '5',
            cod_tipo_unidad: 'AP',
            cod_agrupacion_documental: null,
            unidad_raiz: false,
            id_unidad_org_padre: 465,
            orden_nivel: 3,
            title: 'Gerencia general',
            children: []
          },
          {
            id: 467,
            id_organigrama: 20,
            id_nivel_organigrama: 68,
            codigo: '3',
            cod_tipo_unidad: 'AS',
            cod_agrupacion_documental: null,
            unidad_raiz: false,
            id_unidad_org_padre: 465,
            orden_nivel: 3,
            title: 'organo de control institucional ',
            children: []
          },
          {
            id: 468,
            id_organigrama: 20,
            id_nivel_organigrama: 68,
            codigo: '4',
            cod_tipo_unidad: 'AS',
            cod_agrupacion_documental: null,
            unidad_raiz: false,
            id_unidad_org_padre: 465,
            orden_nivel: 3,
            title: 'tribunal nacional de resolución ',
            children: []
          },
          {
            id: 469,
            id_organigrama: 20,
            id_nivel_organigrama: 69,
            codigo: '8 ',
            cod_tipo_unidad: 'LI',
            cod_agrupacion_documental: 'SUB',
            unidad_raiz: false,
            id_unidad_org_padre: 465,
            orden_nivel: 4,
            title: 'oficina de asesoría jurídica ',
            children: [
              {
                id: 473,
                id_organigrama: 20,
                id_nivel_organigrama: 70,
                codigo: '18',
                cod_tipo_unidad: 'AS',
                cod_agrupacion_documental: null,
                unidad_raiz: false,
                id_unidad_org_padre: 469,
                orden_nivel: 5,
                title: 'administración local del agua ',
                children: []
              },
              {
                id: 475,
                id_organigrama: 20,
                id_nivel_organigrama: 70,
                codigo: '17',
                cod_tipo_unidad: 'AS',
                cod_agrupacion_documental: null,
                unidad_raiz: false,
                id_unidad_org_padre: 469,
                orden_nivel: 5,
                title: 'autoridad administrativa',
                children: []
              }
            ]
          },
          {
            id: 470,
            id_organigrama: 20,
            id_nivel_organigrama: 69,
            codigo: '7',
            cod_tipo_unidad: 'LI',
            cod_agrupacion_documental: 'SUB',
            unidad_raiz: false,
            id_unidad_org_padre: 465,
            orden_nivel: 4,
            title: 'oficina de planeamiento y presupuesto ',
            children: [
              {
                id: 476,
                id_organigrama: 20,
                id_nivel_organigrama: 70,
                codigo: '16',
                cod_tipo_unidad: 'AP',
                cod_agrupacion_documental: null,
                unidad_raiz: false,
                id_unidad_org_padre: 470,
                orden_nivel: 5,
                title: 'unidad de cooperación ',
                children: []
              },
              {
                id: 477,
                id_organigrama: 20,
                id_nivel_organigrama: 70,
                codigo: '15',
                cod_tipo_unidad: 'AS',
                cod_agrupacion_documental: null,
                unidad_raiz: false,
                id_unidad_org_padre: 470,
                orden_nivel: 5,
                title: 'unidad de presupuesto ',
                children: []
              }
            ]
          },
          {
            id: 471,
            id_organigrama: 20,
            id_nivel_organigrama: 69,
            codigo: '6',
            cod_tipo_unidad: 'LI',
            cod_agrupacion_documental: 'SUB',
            unidad_raiz: false,
            id_unidad_org_padre: 465,
            orden_nivel: 4,
            title: 'oficina de administración ',
            children: [
              {
                id: 472,
                id_organigrama: 20,
                id_nivel_organigrama: 70,
                codigo: '10',
                cod_tipo_unidad: 'AS',
                cod_agrupacion_documental: null,
                unidad_raiz: false,
                id_unidad_org_padre: 471,
                orden_nivel: 5,
                title: 'unidad de contabilidad y tesorería  ',
                children: []
              },
              {
                id: 474,
                id_organigrama: 20,
                id_nivel_organigrama: 70,
                codigo: '9',
                cod_tipo_unidad: 'AS',
                cod_agrupacion_documental: null,
                unidad_raiz: false,
                id_unidad_org_padre: 471,
                orden_nivel: 5,
                title: 'unidad de abastecimiento y patrimonio ',
                children: []
              },
              {
                id: 478,
                id_organigrama: 20,
                id_nivel_organigrama: 70,
                codigo: '14',
                cod_tipo_unidad: 'AS',
                cod_agrupacion_documental: null,
                unidad_raiz: false,
                id_unidad_org_padre: 471,
                orden_nivel: 5,
                title: 'unidad planeamiento y modernización ',
                children: []
              },
              {
                id: 479,
                id_organigrama: 20,
                id_nivel_organigrama: 70,
                codigo: '13',
                cod_tipo_unidad: 'AP',
                cod_agrupacion_documental: null,
                unidad_raiz: false,
                id_unidad_org_padre: 471,
                orden_nivel: 5,
                title: 'unidad de recursos humanos ',
                children: []
              },
              {
                id: 480,
                id_organigrama: 20,
                id_nivel_organigrama: 70,
                codigo: '12',
                cod_tipo_unidad: 'AP',
                cod_agrupacion_documental: null,
                unidad_raiz: false,
                id_unidad_org_padre: 471,
                orden_nivel: 5,
                title: 'unidad de ejecución coactiva',
                children: []
              },
              {
                id: 481,
                id_organigrama: 20,
                id_nivel_organigrama: 70,
                codigo: '11',
                cod_tipo_unidad: 'AP',
                cod_agrupacion_documental: null,
                unidad_raiz: false,
                id_unidad_org_padre: 471,
                orden_nivel: 5,
                title: 'unidad archivo y tramite documentario  ',
                children: []
              },
              {
                id: 482,
                id_organigrama: 20,
                id_nivel_organigrama: 70,
                codigo: '19',
                cod_tipo_unidad: 'AP',
                cod_agrupacion_documental: null,
                unidad_raiz: false,
                id_unidad_org_padre: 471,
                orden_nivel: 5,
                title: 'consejos de recursos hídricos de cuenca ',
                children: []
              }
            ]
          }
        ]
      }
    ]
  };

  //   function StyleColor(type: string) {
  //     switch (type) {
  //       case 'LI':
  //         return '#36A9E1';
  //       case 'AS':
  //         return '#91C02C';
  //       case 'AP':
  //         return '#4CAF50';
  //       default:
  //         return '#6bb22b';
  //     }
  //   }
  return (
    <>
      <Button style={{ color: '#fff' }} disabled variant='primary'>
        Unidad de Linea
      </Button>{' '}
      <Button style={{ color: '#fff' }} disabled variant='secondary'>
        Unidad de Asesoria
      </Button>{' '}
      <Button style={{ color: '#fff' }} disabled variant='success'>
        Unidad de Apoyo
      </Button>{' '}
      <OrganizationChart datasource={ds} direction='b2t' />
    </>
  );
}

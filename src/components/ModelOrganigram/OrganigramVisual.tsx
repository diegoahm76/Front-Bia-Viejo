/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import OrganizationChart from '@dabeng/react-orgchart';
// import { ISon } from '../../Interfaces/Organigrama';
import { useAppSelector } from '../../store/hooks/hooks';
import clienteAxios from '../../config/clienteAxios';

// Styles
import '../../css/organigrama_styles.css';
import MyNode from './CustomNode';

let dataView = {};
export default function OrganigramVisual() {
  // Redux State Extraction
  const { organigramCurrent } = useAppSelector((state) => state.organigram);
  const [isLoading, setIsLoading] = useState(true);

  const getJerarquia = async () => {
    setIsLoading(true);
    try {
      const { data } = await clienteAxios.get(
        `almacen/organigrama/unidades/get-jerarquia/${organigramCurrent.id_organigrama}/`
      );
      dataView = {
        id_organigrama: 20,
        id_nivel_organigrama: 66,
        codigo: '1',
        cod_tipo_unidad: 'LI',
        cod_agrupacion_documental: 'SEC',
        unidad_raiz: true,
        id_unidad_org_padre: null,
        orden_nivel: 1,
        title: 'consejo directivo ',
        id: 464,
        className: 'top-level',
        children: [
          {
            id_organigrama: 20,
            id_nivel_organigrama: 67,
            codigo: '2',
            cod_tipo_unidad: 'LI',
            cod_agrupacion_documental: 'SUB',
            unidad_raiz: false,
            id_unidad_org_padre: 464,
            orden_nivel: 2,
            title: 'jefatura',
            id: 465,
            className: 'middle-level',
            children: [
              {
                id_organigrama: 20,
                id_nivel_organigrama: 68,
                codigo: '5',
                cod_tipo_unidad: 'AP',
                cod_agrupacion_documental: null,
                unidad_raiz: false,
                id_unidad_org_padre: 465,
                orden_nivel: 3,
                title: 'Gerencia general',
                id: 466,
                children: [],
                relationship: '110',
                className: 'bottom-level'
              },
              {
                id_organigrama: 20,
                id_nivel_organigrama: 68,
                codigo: '3',
                cod_tipo_unidad: 'AS',
                cod_agrupacion_documental: null,
                unidad_raiz: false,
                id_unidad_org_padre: 465,
                orden_nivel: 3,
                title: 'organo de control institucional ',
                id: 467,
                children: [],
                relationship: '110',
                className: 'bottom-level'
              },
              {
                id_organigrama: 20,
                id_nivel_organigrama: 68,
                codigo: '4',
                cod_tipo_unidad: 'AS',
                cod_agrupacion_documental: null,
                unidad_raiz: false,
                id_unidad_org_padre: 465,
                orden_nivel: 3,
                title: 'tribunal nacional de resolución ',
                id: 468,
                children: [],
                relationship: '110',
                className: 'bottom-level'
              },
              {
                id_organigrama: 20,
                id_nivel_organigrama: 69,
                codigo: '8 ',
                cod_tipo_unidad: 'LI',
                cod_agrupacion_documental: 'SUB',
                unidad_raiz: false,
                id_unidad_org_padre: 465,
                orden_nivel: 4,
                title: 'oficina de asesoría jurídica ',
                id: 469,
                children: [
                  {
                    id_organigrama: 20,
                    id_nivel_organigrama: 70,
                    codigo: '18',
                    cod_tipo_unidad: 'AS',
                    cod_agrupacion_documental: null,
                    unidad_raiz: false,
                    id_unidad_org_padre: 469,
                    orden_nivel: 5,
                    title: 'administración local del agua ',
                    id: 473,
                    children: [],
                    relationship: '110'
                  },
                  {
                    id_organigrama: 20,
                    id_nivel_organigrama: 70,
                    codigo: '17',
                    cod_tipo_unidad: 'AS',
                    cod_agrupacion_documental: null,
                    unidad_raiz: false,
                    id_unidad_org_padre: 469,
                    orden_nivel: 5,
                    title: 'autoridad administrativa',
                    id: 475,
                    children: [],
                    relationship: '110'
                  }
                ],
                relationship: '111',
                className: 'bottom-level'
              },
              {
                id_organigrama: 20,
                id_nivel_organigrama: 69,
                codigo: '7',
                cod_tipo_unidad: 'LI',
                cod_agrupacion_documental: 'SUB',
                unidad_raiz: false,
                id_unidad_org_padre: 465,
                orden_nivel: 4,
                title: 'oficina de planeamiento y presupuesto ',
                id: 470,
                children: [
                  {
                    id_organigrama: 20,
                    id_nivel_organigrama: 70,
                    codigo: '16',
                    cod_tipo_unidad: 'AP',
                    cod_agrupacion_documental: null,
                    unidad_raiz: false,
                    id_unidad_org_padre: 470,
                    orden_nivel: 5,
                    title: 'unidad de cooperación ',
                    id: 476,
                    children: [],
                    relationship: '110'
                  },
                  {
                    id_organigrama: 20,
                    id_nivel_organigrama: 70,
                    codigo: '15',
                    cod_tipo_unidad: 'AS',
                    cod_agrupacion_documental: null,
                    unidad_raiz: false,
                    id_unidad_org_padre: 470,
                    orden_nivel: 5,
                    title: 'unidad de presupuesto ',
                    id: 477,
                    children: [],
                    relationship: '110'
                  }
                ],
                relationship: '111',
                className: 'bottom-level'
              },
              {
                id_organigrama: 20,
                id_nivel_organigrama: 69,
                codigo: '6',
                cod_tipo_unidad: 'LI',
                cod_agrupacion_documental: 'SUB',
                unidad_raiz: false,
                id_unidad_org_padre: 465,
                orden_nivel: 4,
                title: 'oficina de administración ',
                id: 471,
                children: [
                  {
                    id_organigrama: 20,
                    id_nivel_organigrama: 70,
                    codigo: '10',
                    cod_tipo_unidad: 'AS',
                    cod_agrupacion_documental: null,
                    unidad_raiz: false,
                    id_unidad_org_padre: 471,
                    orden_nivel: 5,
                    title: 'unidad de contabilidad y tesorería  ',
                    id: 472,
                    children: [],
                    relationship: '110'
                  },
                  {
                    id_organigrama: 20,
                    id_nivel_organigrama: 70,
                    codigo: '9',
                    cod_tipo_unidad: 'AS',
                    cod_agrupacion_documental: null,
                    unidad_raiz: false,
                    id_unidad_org_padre: 471,
                    orden_nivel: 5,
                    title: 'unidad de abastecimiento y patrimonio ',
                    id: 474,
                    children: [],
                    relationship: '110'
                  },
                  {
                    id_organigrama: 20,
                    id_nivel_organigrama: 70,
                    codigo: '14',
                    cod_tipo_unidad: 'AS',
                    cod_agrupacion_documental: null,
                    unidad_raiz: false,
                    id_unidad_org_padre: 471,
                    orden_nivel: 5,
                    title: 'unidad planeamiento y modernización ',
                    id: 478,
                    children: [],
                    relationship: '110'
                  },
                  {
                    id_organigrama: 20,
                    id_nivel_organigrama: 70,
                    codigo: '13',
                    cod_tipo_unidad: 'AP',
                    cod_agrupacion_documental: null,
                    unidad_raiz: false,
                    id_unidad_org_padre: 471,
                    orden_nivel: 5,
                    title: 'unidad de recursos humanos ',
                    id: 479,
                    children: [],
                    relationship: '110'
                  },
                  {
                    id_organigrama: 20,
                    id_nivel_organigrama: 70,
                    codigo: '12',
                    cod_tipo_unidad: 'AP',
                    cod_agrupacion_documental: null,
                    unidad_raiz: false,
                    id_unidad_org_padre: 471,
                    orden_nivel: 5,
                    title: 'unidad de ejecución coactiva',
                    id: 480,
                    children: [],
                    relationship: '110'
                  },
                  {
                    id_organigrama: 20,
                    id_nivel_organigrama: 70,
                    codigo: '11',
                    cod_tipo_unidad: 'AP',
                    cod_agrupacion_documental: null,
                    unidad_raiz: false,
                    id_unidad_org_padre: 471,
                    orden_nivel: 5,
                    title: 'unidad archivo y tramite documentario  ',
                    id: 481,
                    children: [],
                    relationship: '110'
                  },
                  {
                    id_organigrama: 20,
                    id_nivel_organigrama: 70,
                    codigo: '19',
                    cod_tipo_unidad: 'AP',
                    cod_agrupacion_documental: null,
                    unidad_raiz: false,
                    id_unidad_org_padre: 471,
                    orden_nivel: 5,
                    title: 'consejos de recursos hídricos de cuenca ',
                    id: 482,
                    children: [],
                    relationship: '110'
                  }
                ],
                relationship: '111',
                className: 'bottom-level'
              }
            ],
            relationship: '101'
          }
        ],
        relationship: '001'
      };
      // console.log(dataView);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJerarquia();
  }, []);

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
      {/* <Button style={{ color: '#fff' }} disabled variant='primary'>
        Unidad de Linea
      </Button>{' '}
      <Button style={{ color: '#fff' }} disabled variant='secondary'>
        Unidad de Asesoria
      </Button>{' '}
      <Button style={{ color: '#fff' }} disabled variant='success'>
        Unidad de Apoyo
      </Button>{' '} */}
      {isLoading ? (
        'Cargango'
      ) : (
        <OrganizationChart
          datasource={dataView}
          zoom={true}
          chartClass='myChart'
          NodeTemplate={MyNode}
        />
      )}
    </>
  );
}

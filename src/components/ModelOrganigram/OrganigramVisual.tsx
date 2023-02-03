/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import OrganizationChart from '@dabeng/react-orgchart';
import { ISon } from '../../Interfaces/Organigrama';
import { useAppSelector } from '../../store/hooks/hooks';

export default function OrganigramVisual() {
  // Redux State Extraction
  const { moldOrganigram } = useAppSelector((state) => state.organigram);
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const ds = {
    id: 'n1',
    name: 'Asamblea corporativa',
    title: 'general manager',
    children: [
      {
        id: 'n2',
        name: 'Direccion general',
        title: 'department manager'
      },
      {
        id: 'n3',
        name: 'Su Miao',
        title: 'department manager',
        children: [
          { id: 'n4', name: 'Tie Hua', title: 'senior engineer' },
          {
            id: 'n5',
            name: 'Hei Hei',
            title: 'senior engineer',
            children: [
              { id: 'n6', name: 'Dan Dan', title: 'engineer' },
              { id: 'n7', name: 'Xiang Xiang', title: 'engineer' }
            ]
          },
          { id: 'n8', name: 'Pang Pang', title: 'senior engineer' }
        ]
      },
      { id: 'n9', name: 'Hong Miao', title: 'department manager' }
    ]
  };

  useEffect(() => {
    setIsLoading(false);
    const [data] = moldOrganigram.map((e, i) => {
      console.log(e);
      return {
        id: i,
        name: e.nombre,
        title: e.nombre
        // children: e.hijos
      };
    });
    setData(data);
    setIsLoading(true);
    console.log(data);
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
  function CreateMoldOrganigram(data: ISon[]) {
    return data.map((item: any) => {
      return <label />;
    });
  }

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
      {isLoading ? (
        <OrganizationChart datasource={ds} direction='b2t' verticalLevel={5} />
      ) : (
        'Cargando'
      )}
    </>
  );
}

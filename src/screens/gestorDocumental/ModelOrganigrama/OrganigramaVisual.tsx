/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
// import { ISon } from '../../Interfaces/Organigrama';
import { useAppSelector } from '../../../store/hooks/hooks';
import clienteAxios from '../../../config/clienteAxios';

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
      dataView = { ...data.data[0] };
      console.log(data.data[0]);
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
      <Button style={{ color: '#fff' }} disabled variant='primary'>
        Unidad de Linea
      </Button>{' '}
      <Button style={{ color: '#fff' }} disabled variant='secondary'>
        Unidad de Asesoria
      </Button>{' '}
      <Button style={{ color: '#fff' }} disabled variant='success'>
        Unidad de Apoyo
      </Button>{' '}
      
    </>
  );
}
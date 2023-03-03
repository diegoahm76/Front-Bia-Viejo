import React, { useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import BussinessIcon from '@mui/icons-material/Business';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { DialogRepresentantes } from './DialogRepresentantes';
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  DialogTitle,
  Typography
} from '@mui/material';
import {
  changeEntorno,
  closeDialogEntorno,
  getPersmisionsUser,
  openDialogEntorno,
  openDialogRepresentante,
  setIslogged
} from '../../../store/slices/Login';

export const DialogEntorno = () => {
  const dispatch = useDispatch();
  const { userinfo, openDialog } = useSelector((state: any) => state.login);

  const setEntorno = (value: string): void => {
    dispatch(changeEntorno(value));
    dispatch(getPersmisionsUser(userinfo.id_usuario, value));
    // TODO => Mostrar empresas y persona que representa
    if (userinfo.tipo_persona === 'N' && value === 'C') {
      // TODO => Dispatch para consultar empresas, personas etc, que represente
      dispatch(openDialogRepresentante());
    } else {
      dispatch(setIslogged());
    }
  };

  // Se ejecuta luego de dar click al boton de login
  useEffect(() => {
    if (userinfo.id_persona !== 0) {
      if (
        userinfo.tipo_persona === 'J' ||
        (userinfo.tipo_persona === 'N' && userinfo.tipo_usuario === 'E')
      ) {
        // No mostramos dialog
        dispatch(changeEntorno('C'));
        dispatch(getPersmisionsUser(userinfo.id_usuario, 'C'));
        dispatch(setIslogged());
      } else if (
        userinfo.tipo_persona === 'N' &&
        userinfo.tipo_usuario === 'I'
      ) {
        // para este caso mostramos el dialog
        dispatch(openDialogEntorno());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userinfo]);

  return (
    <>
      {/* Dialog para selección de entorno */}
      <Dialog
        open={openDialog}
        onClose={() => dispatch(closeDialogEntorno())}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle
          textAlign='center'
          fontSize={14}
          bgcolor={'#042F4A'}
          color='#FFFF'
          variant='subtitle1'
          sx={{ padding: '10px' }}
        >
          <Typography>Seleccione el entorno a usar</Typography>
        </DialogTitle>
        <List sx={{ padding: 2 }}>
          <ListItem disableGutters>
            <ListItemButton
              autoFocus
              onClick={() => {
                setEntorno('C');
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Ciudadano' />
            </ListItemButton>
            <ListItemButton
              autoFocus
              onClick={() => {
                setEntorno('L');
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  <BussinessIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Laboral' />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>

      {/* Dialog para seleccionar las personas o empresas a representar */}
      <DialogRepresentantes />
    </>
  );
};

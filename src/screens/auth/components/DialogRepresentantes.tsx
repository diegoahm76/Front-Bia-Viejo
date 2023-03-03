import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  DialogTitle,
  Typography,
  ListItemIcon
} from '@mui/material';
import {
  closeDialogRepresentante,
  setIslogged,
  setRepresentado
} from '../../../store/slices/Login';
import FolderIcon from '@mui/icons-material/Folder';

export const DialogRepresentantes = () => {
  const dispatch = useDispatch();
  const { dialogRepresentante } = useSelector((state: any) => state.login);

  const selectRepresentado = (value: string): void => {
    dispatch(setRepresentado(value));
    dispatch(closeDialogRepresentante());
    dispatch(setIslogged());
  };

  return (
    <>
      {/* Dialog para selección de entorno */}
      <Dialog
        open={dialogRepresentante}
        onClose={() => dispatch(closeDialogRepresentante())}
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
          <Typography>Seleccione a quien representará</Typography>
        </DialogTitle>
        <List>
          <ListItem disableGutters alignItems='center'>
            <ListItemButton
              autoFocus
              onClick={() => {
                selectRepresentado('Nombre propio');
              }}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary='Nombre propio' />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{ width: 300 }}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText
              primary='Elemento de prueba'
              secondary='Asi se vera el resto de opciones diponibles'
              sx={{ textOverflow: 'ellipsis', wordWrap: 'break-word' }}
            />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};

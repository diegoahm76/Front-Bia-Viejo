import { useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../../config/clienteAxios';
import { IUserInfo } from '../../../Interfaces/auth';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import { loginUser, setDataUser } from '../../../store/slices/Login';

export const useRol = () => {
  const dispatch = useAppDispatch();
  const reintentos = useAppSelector((state) => state.login.reintentos);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Obtiene los permisos del rol seleccionado
  const getPermissionsByRol = async (idRol: number) => {
    setIsLoading(true);
    try {
      const { data } = await clienteAxios.get(
        `/permisos/permisos-rol/get-by-rol/${idRol}/`
      );
      // console.log(data.data);

      const userData = JSON.parse(
        `${localStorage.getItem('tempDataUser')}`
      ) as IUserInfo;
      userData.permisos = data.data;
      setDataUser(dispatch, userData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler = async (dataForm: any) => {
    setIsLoading(true);
    try {
      if (!isCaptchaValid) {
        Swal.fire({
          position: 'center',
          icon: 'info',
          text: 'Es necesario validar el Captcha, para poder ingresar'
          //     //ButtonText: "Aceptar",
          //     //ButtonColor: "#3085d6",
          //     //  is_active: true,
        });
        setIsLoading(false);
        return;
      }

      // enviar solo las credenciales de inicio de sesión al servidor
      // si la validación es exitosa, iniciar sesión
      // de lo contrario, mostrar un mensaje de error

      await loginUser(dispatch, dataForm.email, dataForm.password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getPermissionsByRol,
    submitHandler,
    setIsCaptchaValid,
    isCaptchaValid,
    isLoading,
    reintentos
  };
};

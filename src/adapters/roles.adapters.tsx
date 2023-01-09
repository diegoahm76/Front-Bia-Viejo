export const getPermisosAdapterSelect = (permisos) => {
  const permisosAdapted = permisos.map((permiso) => ({
    label: `${permiso.id_modulo.nombre_modulo} / ${permiso.cod_permiso.nombre_permiso}`,
    value: permiso.id_permisos_modulo,
  }));
  return permisosAdapted;
};

export const getPermisosAdapterByRolForSelect = (permisos) => {
  const permisosAdapted = permisos.map((permiso) => ({
    label: `${permiso.id_permiso_modulo.id_modulo.nombre_modulo} / ${permiso.id_permiso_modulo.cod_permiso.nombre_permiso}`,
    value: permiso.id_permiso_modulo.id_permisos_modulo,
  }));
  return permisosAdapted;
}

export const getPermisosRolPost = (idRol, permisos) => {
  const permisosPorRolAdapted = permisos.map((permiso) => ({
    id_permiso_modulo: permiso.value,
    id_rol: idRol,
  }));
  return permisosPorRolAdapted;
};

export const dataUpdateEmpresaAdapter = (data) => {
  const updateEmpresa = {
    numero_documento: data.numeroDocumento2,
    digito_verificacion: data.codVerificacion,
    nombre_comercial: data.nombreComercial,
    razon_social: data.razonSocial,
    representante_legal: data.representanteLegal,
    email: data.eMail,
    email_empresarial: data.emailNotificacion,
    telefono_celular_empresa: data.celular,
    telefono_empresa: data.telefonoEmpresa,
    telefono_empresa_2: data.telefonoAlterno,
    direccion_notificaciones: data.direccionDeNotificacion,
  };
  return updateEmpresa;
};

export const dataOverriteEmpresaAdapter = (dataEmpresa) => {
  const overriteData = {
    numeroDocumento2: dataEmpresa.numero_documento,
    codVerificacion: dataEmpresa.digito_verificacion,
    nombreComercial: dataEmpresa.nombre_comercial,
    razonSocial: dataEmpresa.razon_social,
    representanteLegal: dataEmpresa.representante_legal,
    eMail: dataEmpresa.email,
    emailNotificacion: dataEmpresa.email_empresarial,
    celular: dataEmpresa.telefono_celular_empresa,
    telefonoEmpresa: dataEmpresa.telefono_empresa,
    telefonoAlterno: dataEmpresa.telefono_empresa_2,
    direccionDeNotificacion: dataEmpresa.direccion_notificaciones,
  };
  return overriteData;
};
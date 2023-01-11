export const adapterSubsistemasChoices = (subsistemasData) => {
  const subsistemasOptionsAdapted = subsistemasData.map((subsistema) => ({
    label: subsistema[1],
    value: subsistema[0],
  }));
  return subsistemasOptionsAdapted;
};

export const adapterModulesChoices = (modulesData) => {
  const modulesOptionsAdapted = modulesData.map((module) => ({
    label: module.nombre_modulo,
    value: module.id_modulo,
  }));
  return modulesOptionsAdapted;
};

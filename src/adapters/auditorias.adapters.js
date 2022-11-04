export const adapterSubsistemasChoices = (subsistemasData) => {
  const subsistemasOptionsAdapted = subsistemasData.map((subsistema) => ({
    label: subsistema[1],
    value: subsistema[0],
  }));
  return subsistemasOptionsAdapted;
};

interface ISelectOptions {
  label: string;
  value: string;
}

const initialOptions: ISelectOptions[] = [{
  label: "",
  value: ""
}]

export const textChoiseAdapter = (dataArray) => {
  const formatGeneric = initialOptions;
  const dataNewFormat = dataArray.map((dataOld) => ({
    label: dataOld[1],
    value: dataOld[0],
  }));
  formatGeneric.push({
    label: dataNewFormat[0].label,
    value: dataNewFormat[0].value
  });
  return dataNewFormat;
};

export const textChoiseAdapterIndicativo = (dataArray) => {
  const dataNewFormat = dataArray.map((dataOld) => ({
    label: dataOld[0],
    value: dataOld[0],
  }));
  return dataNewFormat;
};



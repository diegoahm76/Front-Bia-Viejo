export const textChoiseAdapter = (dataArray: string[]) => {
  const dataNewFormat = dataArray.map((dataOld) => ({
    label: dataOld[1],
    value: dataOld[0],
  }));
  return dataNewFormat;
};

export const textChoiseAdapter2=(dataArray:string[])=>{
  const dataNewFormat = dataArray.map((dataOld)=>({
  value:dataOld[0]
  }));
return dataNewFormat;
};

export const textChoiseAdapterIndicativo = (dataArray) => {
  const dataNewFormat = dataArray.map((dataOld) => ({
    label: dataOld[0],
    value: dataOld[0],
  }));
  return dataNewFormat;
};



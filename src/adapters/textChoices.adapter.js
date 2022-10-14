export const textChoiseAdapter = (dataArray) => {
    const dataNewFormat = dataArray.map(dataOld => ({label: dataOld[1], value: dataOld[0]}))
    return dataNewFormat
}
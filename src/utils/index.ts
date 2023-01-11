// Formatea Fecha remplaza (/) por (-)
export function setDatesFormat(date: string) {
    let getDate = date ? date.split(',')[0] : '';
    let newDate = '';
    newDate = getDate ? getDate.replaceAll('/', '-') : '';
    return newDate;
}
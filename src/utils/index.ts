// Formatea Fecha remplaza (/) por (-)
export function setDatesFormat(date: string) {
    let getDate = date ? date.split(',')[0] : '';
    let newDate = '';
    newDate = getDate ? getDate.replaceAll('/', '-') : '';
    return newDate;
}
export function setDatesFormatRevere(date: string) {
    if (date && date !== '') {
        let getDate = date ? date.split(',')[0] : '';
        let dateParts = getDate.split("/");
        dateParts.reverse();
        let newDateFormat = dateParts.join("-");
        console.log(newDateFormat);
        // Output: "2006-2-6"
        return newDateFormat ? newDateFormat : '';
    } else {
        return '';
    }
}
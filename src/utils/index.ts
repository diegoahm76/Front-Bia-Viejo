import { format } from "date-fns";

// Valida si la fecha es válida
function dateIsValid(date: string) {
    return !Number.isNaN(new Date(date).getTime());
}

// Formatea Fecha remplaza (/) por (-)
export function setDatesFormat(date: string) {
    let newDate = '';
    if (dateIsValid(date)) {
        newDate = format(new Date(date), "dd-MM-yyyy")
    } else {
        // 👇️ this runs
        console.log('not a valid date');
    }
    return newDate;
}
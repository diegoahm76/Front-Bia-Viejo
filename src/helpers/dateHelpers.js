export const getArrayFromStringDateAAAAMMDD = (date) => {
  const arrayDates = date.split("-");
  return arrayDates;
};

export const getDateFromAAAAMMDDToDDMMAAAA = (date) => {
  const arrayDate = getArrayFromStringDateAAAAMMDD(date);
  const stringFormatDate = arrayDate.reverse().join("-");
  return stringFormatDate;
};

export const getIndexBySelectOptions = (valueSelect, selectOptions) => {
  let indexValue: number = 0;
  selectOptions.filter((selectOption, index) => {
    if (selectOption.value === valueSelect) {
      indexValue = index;
      return true;
    }
    return false;
  });
  return indexValue;
};

export const getIndexBySelectOptions = (valueSelect, selectOptions) => {
  let indexValue = null;
  selectOptions.filter((selectOption, index) => {
    if (selectOption.value === valueSelect) {
      indexValue = index;
      return true;
    }
    return false;
  });
  return indexValue;
};

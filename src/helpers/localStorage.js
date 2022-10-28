export const getTokenAccessLocalStorage = () => {
  const {
    tokens: { access },
  } = JSON.parse(localStorage.getItem("userInfo"));
  return access;
};

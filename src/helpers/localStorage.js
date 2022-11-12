export const getTokenAccessLocalStorage = () => {
  const {
    userinfo: { tokens },
  } = JSON.parse(localStorage.getItem("userInfo"));
  return tokens.access;
};

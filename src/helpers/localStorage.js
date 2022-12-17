export const getTokenAccessLocalStorage = () => {
  const {
    userinfo: { userinfo: {tokens} }
  } = JSON.parse(localStorage.getItem("userInfo"));
  return tokens.access;
};

export const getTokenAccessLocalStorage = () => {
  const {
    userinfo: { userinfo: {tokens} }
  } = JSON.parse(localStorage.getItem("userInfo"));
  console.log("tokens", tokens)
  return tokens.access;
};

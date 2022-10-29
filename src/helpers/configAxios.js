export const getConfigAuthBearer = (access) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  };
  return config;
};

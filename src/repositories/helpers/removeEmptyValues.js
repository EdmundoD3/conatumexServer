const removeEmptyValues = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => {
      return value !== null && value !== undefined && value !== "";
    })
  );
};

export { removeEmptyValues };

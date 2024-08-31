const shorten = (str, size) => {
  return str.length > size ? `${str.slice(0, size)}...` : str;
};

export { shorten };

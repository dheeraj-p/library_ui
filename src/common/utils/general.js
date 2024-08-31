const shorten = (str, size, suffix = '') => {
  return str.length > size ? `${str.slice(0, size)}${suffix}` : str;
};

export { shorten };

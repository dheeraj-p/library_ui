const isNotEmpty = (str) =>
  str !== null && str !== undefined && str.trim().length > 0;
const isEmpty = (str) => !isNotEmpty(str);

const validateBookTitle = (title) => {
  if (isNotEmpty(title)) return;

  return "Title can't be empty";
};

const isValidISBN10 = (isbn) => isNotEmpty(isbn) && isbn.trim().length === 10;
const isValidISBN13 = (isbn) => isNotEmpty(isbn) && isbn.trim().length === 13;

const validateISBN10 = (isbn) => {
  if (isValidISBN10(isbn)) return;

  return 'ISBN10 length has to be exact 10';
};

const validateISBN13 = (isbn) => {
  if (isValidISBN13(isbn)) return;

  return 'ISBN13 length has to be exact 13';
};

export {
  validateBookTitle,
  validateISBN10,
  validateISBN13,
  isEmpty,
  isNotEmpty,
  isValidISBN10,
  isValidISBN13,
};

import {
  APIFailedError,
  BookNotFoundError,
  CopyAlreadyBorrowed,
  CopyNotFound,
  UnknownDomainError,
} from './errors';

import { useGlobalContext } from './global_context';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const fetchWithAuth = (url, token, options = {}) => {
  return fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, ...options.headers },
  });
};

const getUserRole = async (token) => {
  const response = await fetchWithAuth('/role', token);
  const { role } = await response.json();

  return role;
};

const getBooksByQuery = async (token, queryParams) => {
  const params = new URLSearchParams(queryParams);
  const response = await fetchWithAuth(`/books?${params.toString()}`, token);

  if (!response.ok) throw new APIFailedError('Oops! Something went wrong.');

  const books = await response.json();

  return books.map((book) => {
    //Converting authors separated by '|' to array in place (to save memory and time);
    book.authors = book.authors.split('|');
    return book;
  });
};

const getAllBooks = async (token, after = 0, limit = 10) => {
  return getBooksByQuery(token, { after, limit });
};

const searchBooks = async (token, query) => {
  return getBooksByQuery(token, { q: query });
};

const registerBook = async (token, data) => {
  const response = await fetchWithAuth('/books', token, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new APIFailedError("Couldn't add a new book");
  }

  return response.json();
};

const fetchBookInfo = async (isbn) => {
  const response = await fetch(`${API_BASE_URL}/isbn/${isbn}`);

  if (response.status === 404) {
    throw new BookNotFoundError();
  }

  if (!response.ok) {
    throw new APIFailedError("Couldn't get book information");
  }

  const { book } = await response.json();
  return book;
};

const borrowBook = async (token, copyId) => {
  const response = await fetchWithAuth('/transactions', token, {
    method: 'POST',
    body: JSON.stringify({ copyId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  switch (response.status) {
    case 409:
      throw new CopyAlreadyBorrowed();
    case 404:
      throw new CopyNotFound();
  }

  return response.json();
};

const fetchCurrentlyReadingBooks = async (token) => {
  const response = await fetchWithAuth('/my-books', token);
  const books = await response.json();

  return books.map((book) => {
    //Converting authors separated by '|' to array in place (to save memory and time);
    book.authors = book.authors.split('|');
    return book;
  });
};

const registerUser = async (token) => {
  const response = await fetchWithAuth('/users', token, {
    method: 'POST',
  });

  if (response.status === 403) throw new UnknownDomainError();
  if (!response.ok) APIFailedError('Could not register the user');
};

const verifyAuth = async (token) => {
  const response = await fetchWithAuth('/verify', token);
  if (response.status === 403) throw new UnknownDomainError();
  if (!response.ok) throw new APIFailedError('Could not verify authentication');
};

const returnBook = async (token, copyId) => {
  const response = await fetchWithAuth('/transactions', token, {
    method: 'PATCH',
    body: JSON.stringify({ copyId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new APIFailedError("Couldn't return book!");

  return response.json();
};

const fetchCopies = async (token, from, to) => {
  const params = new URLSearchParams({ from, to });
  const response = await fetchWithAuth(`/copies?${params.toString()}`, token);

  if (!response.ok) throw new APIFailedError("Couldn't fetch copies!");
  return response.json();
};

const fetchAllBorrowedBooks = async (token) => {
  const response = await fetchWithAuth('/admin/borrowed-books', token);
  const books = await response.json();

  return books.map((book) => {
    //Converting authors separated by '|' to array in place (to save memory and time);
    book.authors = book.authors.split('|');
    return book;
  });
};

const createApiClient = (auth) => {
  const withAuth = (apiCaller) => {
    return async (...args) => {
      const token = await auth.getToken();
      return apiCaller(token, ...args);
    };
  };

  return {
    getUserRole: withAuth(getUserRole),
    getAllBooks: withAuth(getAllBooks),
    registerBook: withAuth(registerBook),
    borrowBook: withAuth(borrowBook),
    fetchCurrentlyReadingBooks: withAuth(fetchCurrentlyReadingBooks),
    returnBook: withAuth(returnBook),
    fetchCopies: withAuth(fetchCopies),
    registerUser: withAuth(registerUser),
    fetchAllBorrowedBooks: withAuth(fetchAllBorrowedBooks),
    searchBooks: withAuth(searchBooks),
    fetchBookInfo,
  };
};

const useAPI = () => {
  const { api } = useGlobalContext();
  return api;
};

export default useAPI;
export { createApiClient };
export const authHelperAPIs = { verifyAuth, getUserRole };

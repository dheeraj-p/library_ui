import { useAuth } from '../providers/auth';
import {
  APIFailedError,
  BookNotFoundError,
  CopyAlreadyBorrowed,
  CopyNotFound,
} from './errors';

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

const getAllBooks = async (token) => {
  const response = await fetchWithAuth('/books', token);

  const books = await response.json();

  return books.map((book) => {
    //Converting authors separated by '|' to array in place (to save memory and time);
    book.authors = book.authors.split('|');
    return book;
  });
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

const useAPI = () => {
  const { user } = useAuth();

  const withAuth = (apiCaller) => {
    return async (...args) => {
      const token = await user.getIdToken();
      return apiCaller(token, ...args);
    };
  };

  return {
    getUserRole: withAuth(getUserRole),
    getAllBooks: withAuth(getAllBooks),
    registerBook: withAuth(registerBook),
    borrowBook: withAuth(borrowBook),
    fetchCurrentlyReadingBooks: withAuth(fetchCurrentlyReadingBooks),
    fetchBookInfo,
  };
};

export default useAPI;

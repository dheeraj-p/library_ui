import { useAuth } from '../providers/auth';

const getBaseUrl = () => import.meta.env.VITE_API_URL;

const fetchWithAuth = (url, token, options = {}) => {
  const baseUrl = getBaseUrl();
  return fetch(`${baseUrl}${url}`, {
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

const registerBooks = async (token, isbnData) => {
  const response = await fetchWithAuth('/books', token, {
    method: 'POST',
    body: JSON.stringify(isbnData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
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
    registerBooks: withAuth(registerBooks),
  };
};

export default useAPI;

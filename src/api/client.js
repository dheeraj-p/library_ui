import { useAuth } from '../providers/auth';

const getBaseUrl = () => 'http://localhost:8787';

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
  return response.json();
};

const useAPI = () => {
  const { user } = useAuth();

  const withAuth = (apiCaller) => {
    return async () => {
      const token = await user.getIdToken();
      return apiCaller(token);
    };
  };

  return {
    getUserRole: withAuth(getUserRole),
    getAllBooks: withAuth(getAllBooks),
  };
};

export default useAPI;

import { useRouteContext } from '@tanstack/react-router';

export const useGlobalContext = () => {
  return useRouteContext({});
};

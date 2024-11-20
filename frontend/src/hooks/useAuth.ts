import { LoginCredentials, LoginPayload } from '#src/types/types';
import { isLoginPayload } from '#src/utils/typeNarrowers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import authorizationService from '#src/services/authorization';

const useAuth = () => {
  const queryClient = useQueryClient();

  // Read data from localStorage
  const readUserFromLocalStorage = (): LoginPayload | null => {
    const userInStorage = localStorage.getItem('loggedOnUser');
    if (!userInStorage) {
      return null;
    }

    const userObject: unknown = JSON.parse(userInStorage);

    if (isLoginPayload(userObject)) {
      return userObject;
    } else {
      throw new Error('Malformed user object found in localStorage');
    }
  };

  // Save logged on user data to Tanstack Query cache
  // Destructured 'data' variable is renamed inline
  const { data: loggedOnUser } = useQuery({
    queryKey: ['loggedOnUser'],
    queryFn: readUserFromLocalStorage
  });

  // Login using Tanstack Query and save user data to query cache and localStorage
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => {
      return authorizationService.login(credentials);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData(['loggedOnUser'], data);
        localStorage.setItem('loggedOnUser', JSON.stringify(data));
      }
    }
  });

  return { loggedOnUser, loginMutation };
};

export default useAuth;

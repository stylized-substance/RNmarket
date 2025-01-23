import { LoginCredentials, LoginPayload, CartItemForBackend } from '#src/types/types';
import { isLoginPayload } from '#src/utils/typeNarrowers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import authorizationService from '#src/services/authorization';
import { useToast } from '#src/context/ToastContext';

const useAuth = () => {
  const queryClient = useQueryClient();

  const { changeToast } = useToast();

  // Read logged on user data from localStorage
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
  const { data: loggedOnUser } = useQuery({
    queryKey: ['loggedOnUser'],
    queryFn: readUserFromLocalStorage
  });

  // Read temporary access token from Tanstack Query cache
  const temporaryAccessToken = queryClient.getQueryData(['temporaryAccessToken'])

  // Get temporary access token from backend and save to Tanstack Query cache. Used for making orders without logging in.
  const getTemporaryAccessToken = useMutation({
    mutationFn: async (products: CartItemForBackend[]) => {
      return await authorizationService.getTemporaryToken(products);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['temporaryAccessToken'], data)
    }
  })

  // Login using Tanstack Query and save user data to query cache and localStorage
  const login = useMutation({
    mutationFn: (credentials: LoginCredentials) => {
      return authorizationService.login(credentials);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData(['loggedOnUser'], data);
        localStorage.setItem('loggedOnUser', JSON.stringify(data));
        changeToast({
          message: 'Logged in succesfully',
          show: true
        });
      }
    },
    onError: (error) => {
      changeToast({
        message: error.message,
        show: true
      });
    }
  });

  // Use logged on user's refresh token to get new access token and save it to query cache and localStorage
  const refreshAccessToken = useMutation({
    mutationFn: async (loggedOnUser: LoginPayload) => {
      const newAccessToken: string =
        await authorizationService.refreshAccessToken(loggedOnUser);
      return { newAccessToken, loggedOnUser };
    },
    onSuccess: ({ newAccessToken, loggedOnUser }) => {
      loggedOnUser.accessToken = newAccessToken;
      localStorage.setItem('loggedOnUser', JSON.stringify(loggedOnUser));
      queryClient.setQueryData(['loggedOnUser'], loggedOnUser);
    },
    onError: (error) => {
      if (error.message === 'Refresh token has expired, login again') {
        logout();
      }
    }
  });

  // Log out user
  const logout = () => {
    localStorage.removeItem('loggedOnUser');
    queryClient.setQueryData(['loggedOnUser'], null);
  };

  return { loggedOnUser, login, refreshAccessToken, logout, temporaryAccessToken, getTemporaryAccessToken };
};

export default useAuth;

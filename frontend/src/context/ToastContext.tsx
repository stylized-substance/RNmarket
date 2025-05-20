import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer
} from 'react';

import { ToastStateType, ToastActionType, ToastContextType } from '#src/types';

export const ToastContext = createContext<ToastContextType | null>(null);

const initialState: ToastStateType = {
  message: '',
  show: false
};

export const toastReducer = (
  _state: ToastStateType,
  action: ToastActionType
) => {
  switch (action.type) {
    case 'changed': {
      return action.payload;
    }
    default: {
      throw new Error('Unknown action type for toastReducer');
    }
  }
};

const ToastContextProvider = ({ children }: PropsWithChildren) => {
  const [toastState, toastDispatch] = useReducer(toastReducer, initialState);

  // Show toast notification for 5 seconds
  const changeToast = (payload: ToastActionType['payload']) => {
    toastDispatch({
      type: 'changed',
      payload
    });

    setTimeout(() => {
      toastDispatch({
        type: 'changed',
        payload: initialState
      });
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ toastState, changeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      'useToast must be used within a ToastContextProvider component'
    );
  }

  return context;
};

export default ToastContextProvider;

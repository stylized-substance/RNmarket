export interface ToastStateType {
  message: string;
  show: boolean;
}

export interface ToastActionType {
  type: 'changed';
  payload: {
    message: string;
    show: boolean;
  };
}

export interface ToastContextType {
  toastState: ToastStateType;
  changeToast: (payload: ToastActionType['payload']) => void;
}

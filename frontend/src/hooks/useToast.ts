import { useMutation, useQueryClient } from '@tanstack/react-query';

const useToast = () => {
  const queryClient = useQueryClient();

  interface ToastState {
    message: string;
    show: boolean;
  }

  // Show toast notification for 5 seconds
  const toastMutation = useMutation({
    mutationFn: async (toastData: ToastState) => {
      await queryClient.setQueryData(['toastState'], toastData);
      setTimeout(() => {
        queryClient.setQueryData(['toastState'], {
          message: '',
          show: false
        });
      }, 5000);
    }
  });

  return { toastMutation };
};

export default useToast;

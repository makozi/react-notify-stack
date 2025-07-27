export type Position = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface ToastProps {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  position?: Position;
}
